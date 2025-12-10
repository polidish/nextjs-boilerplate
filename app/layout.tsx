import "./globals.css";
import type { ReactNode } from "react";
import { playfair } from "./fonts";

export default function RootLayout({ children }: { children: ReactNode }) {
return (
<html lang="en">
<body className={playfair.className}>{children}</body>
</html>
);
}
