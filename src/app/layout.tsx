import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ringdesk.co"),
  title: "RingDesk — AI receptionist for trades",
  description:
    "Stop missing service calls. RingDesk is an AI receptionist installed and tuned by a real person. Answers every call, qualifies leads, texts you urgent ones.",
  alternates: {
    canonical: "https://ringdesk.co",
  },
  openGraph: {
    type: "website",
    url: "https://ringdesk.co",
    title: "RingDesk — AI receptionist for trades",
    description:
      "Stop missing service calls. RingDesk is an AI receptionist installed and tuned by a real person. Answers every call, qualifies leads, texts you urgent ones.",
    siteName: "RingDesk",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RingDesk — AI receptionist for trades",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RingDesk — AI receptionist for trades",
    description:
      "Stop missing service calls. RingDesk is an AI receptionist installed and tuned by a real person. Answers every call, qualifies leads, texts you urgent ones.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
