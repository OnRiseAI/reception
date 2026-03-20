const RETELL_CREATE_WEB_CALL_URL = "https://api.retellai.com/v2/create-web-call";
const RETELL_REQUEST_TIMEOUT_MS = 10000;

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const apiKey = process.env.RETELL_API_KEY?.trim();
    const defaultAgentId = process.env.RETELL_AGENT_ID?.trim();

    if (!apiKey) {
      console.error("RETELL_API_KEY is not defined in environment variables");
      return Response.json({ error: "API configuration missing" }, { status: 500 });
    }

    let body = {};
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const agentId = (typeof body.agent_id === "string" && body.agent_id.trim()) || defaultAgentId;

    if (!agentId) {
      return Response.json({ error: "No agent_id provided" }, { status: 400 });
    }

    const businessName = typeof body.business_name === "string" ? body.business_name.trim() : "";
    const vertical = typeof body.vertical === "string" ? body.vertical.trim() : "";
    const extraVars = typeof body.extra_variables === "object" && body.extra_variables ? body.extra_variables : {};

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), RETELL_REQUEST_TIMEOUT_MS);

    const response = await fetch(RETELL_CREATE_WEB_CALL_URL, {
      method: "POST",
      cache: "no-store",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        agent_id: agentId,
        metadata: {
          source: "web_demo",
          vertical: vertical || "general",
        },
        retell_llm_dynamic_variables: {
          business_name: businessName || "Demo Business",
          vertical: vertical || "general",
          caller_source: "web_demo",
          ...extraVars,
        },
      }),
    }).finally(() => clearTimeout(timeout));

    if (!response.ok) {
      const retellError = await response.text();
      console.error("Retell API error response:", response.status, retellError);
      return Response.json({ error: "Retell API error" }, { status: response.status });
    }

    const data = await response.json();
    return Response.json(
      { access_token: data.access_token, call_id: data.call_id },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    if (error?.name === "AbortError") {
      return Response.json({ error: "Upstream timeout while creating call" }, { status: 504 });
    }
    console.error("Create web call unexpected error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
