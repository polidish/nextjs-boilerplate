
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.polidish.com"),

  title: "Polidish® | Political Discussion & Discourse",

  description:
    "Polidish® is a free, text-only venue for political discourse. Politely dishing politics. May the best mind win.",

  alternates: {
    canonical: "https://www.polidish.com/",
  },

  keywords: [
    "political discourse",
    "political discussion",
    "politics forum",
    "Polidish",
    "thoughtful debate",
    "free political salon",
  ],

  openGraph: {
    title: "Polidish® | Political Discussion & Discourse",
    description:
      "Polidish® is a free, text-only venue for political discourse. Politely dishing politics. May the best mind win.",
    url: "https://www.polidish.com/",
    siteName: "Polidish",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Polidish® | Political Discussion & Discourse",
    description:
      "Polidish® is a free, text-only venue for political discourse. Politely dishing politics. May the best mind win.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#E5A55A] text-black antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
