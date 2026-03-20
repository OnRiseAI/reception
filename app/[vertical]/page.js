import { VERTICALS, VERTICAL_KEYS } from "../lib/verticals";
import VerticalDemo from "../components/VerticalDemo";

export function generateStaticParams() {
  return VERTICAL_KEYS.map((key) => ({ vertical: key }));
}

export async function generateMetadata({ params }) {
  const { vertical } = await params;
  const v = VERTICALS[vertical];

  if (!v) {
    return {
      title: "We Pick Up The Phone — AI Voice Receptionist",
      description: "AI receptionists that sound human, work 24/7, and never put a caller on hold.",
    };
  }

  const title = `${v.label} AI Receptionist Demo — We Pick Up The Phone`;
  const description = `Try a live AI receptionist built for ${v.label.toLowerCase()}s. ${v.description} Call from your browser — no signup required.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://wepickupthephone.com/${vertical}`,
      siteName: "We Pick Up The Phone",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function VerticalPage({ params, searchParams }) {
  const { vertical } = await params;
  const { name } = await searchParams;

  if (!VERTICALS[vertical]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#6B6B76] text-[15px] font-medium">Industry not found.</p>
      </div>
    );
  }

  return <VerticalDemo verticalKey={vertical} nameParam={name || null} />;
}
