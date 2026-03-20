import "./globals.css";
import { Outfit } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import SharedLayout from "./components/SharedLayout";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "We Pick Up The Phone — AI Voice Receptionist",
  description:
    "AI receptionists that sound human, work 24/7, and never put a caller on hold. Try a live demo — no signup required.",
  metadataBase: new URL("https://wepickupthephone.com"),
  openGraph: {
    title: "We Pick Up The Phone — AI Voice Receptionist",
    description:
      "Every call answered. Every customer impressed. Try our AI receptionist live.",
    url: "https://wepickupthephone.com",
    siteName: "We Pick Up The Phone",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "We Pick Up The Phone — AI Voice Receptionist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "We Pick Up The Phone — AI Voice Receptionist",
    description:
      "Every call answered. Every customer impressed. Try our AI receptionist live.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${instrumentSerif.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased noise-overlay">
        <SharedLayout>{children}</SharedLayout>
      </body>
    </html>
  );
}
