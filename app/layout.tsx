import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  metadataBase: new URL("https://www.polidish.com"),
  title: "Polidish® | Political Discussion & Discourse",
  description:
    "Polidish® is a free, text-only venue for political discourse. Politely dishing politics. May the best mind win.",
  alternates: {
    canonical: "https://www.polidish.com/",
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
