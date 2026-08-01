import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
title: "Polidish",
description: "Freedom is deliberate.",
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
