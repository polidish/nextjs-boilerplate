import './globals.css'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
subsets: ['latin'],
weight: ['400', '500', '600', '700']
})

export const metadata = {
title: 'Polidish',
description: 'Polidish: Site rebuilding underway — returning shortly.'
}

export default function RootLayout({ children }) {
return (
<html lang="en">
<body className={playfair.className}>
{children}
</body>
</html>
)
}
