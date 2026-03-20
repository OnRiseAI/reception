import "./globals.css";
import { Outfit } from "next/font/google";
import SharedLayout from "./components/SharedLayout";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Voice AI Receptionists — AI That Answers Your Calls",
  description:
    "AI receptionists that sound human, work 24/7, and never put a caller on hold. Try a live demo — no signup required.",
  metadataBase: new URL("https://www.voiceaireceptionists.com"),
  openGraph: {
    title: "Voice AI Receptionists — AI That Answers Your Calls",
    description:
      "Every call answered. Every customer impressed. Try our AI receptionist live.",
    url: "https://www.voiceaireceptionists.com",
    siteName: "Voice AI Receptionists",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Voice AI Receptionists" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voice AI Receptionists — AI That Answers Your Calls",
    description: "Every call answered. Every customer impressed. Try our AI receptionist live.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">
        <SharedLayout>{children}</SharedLayout>
      </body>
    </html>
  );
}
