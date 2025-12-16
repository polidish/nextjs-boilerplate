"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Page() {
const [email, setEmail] = useState("");
const [sent, setSent] = useState(false);

const sendMagicLink = async () => {
if (!email) return;
await supabase.auth.signInWithOtp({ email });
setSent(true);
};

return (
<main style={{ minHeight: "100vh", background: "#fff" }}>
{/* HEADER */}
<header
style={{
background: "#000",
padding: "14px 24px",
display: "flex",
justifyContent: "space-between",
alignItems: "center",
}}
>
<img
src="/_logo polidish.png"
alt="Polidish"
style={{ height: "42px" }}
/>

<div
style={{
color: "#C15A2E",
fontWeight: 700,
fontSize: "18px",
whiteSpace: "nowrap",
}}
>
The venue for uncensored political discourse.
</div>
</header>

{/* BODY */}
<section
style={{
display: "grid",
gridTemplateColumns: "320px 1fr",
gap: "28px",
padding: "28px",
}}
>
{/* OUTPOST */}
<div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
{[
{
img: "/ad1.jpg",
text:
"Visualize your ad right here, to the left, or in the center.",
},
{
img: "/ad2.jpg",
text:
"Advertisements are absolutely uncurated for your privacy.",
},
{
img: "/ad3.jpg",
text:
"Polidish: the Outpost where luxury partners meet High Worth While Individuals (HWWI).",
},
].map((ad, i) => (
<div
key={i}
style={{
position: "relative",
border: "3px solid #000",
}}
>
<img src={ad.img} style={{ width: "100%" }} />
<div
style={{
position: "absolute",
bottom: "12px",
left: "12px",
right: "12px",
color: "#E3B341",
fontStyle: "italic",
fontSize: "14px",
}}
>
{ad.text}
</div>
</div>
))}

{/* BUTTONS */}
<div style={{ display: "flex", gap: "12px" }}>
<a
href="https://polidish.blog"
style={{
background: "#E3B341",
color: "#000",
padding: "10px 14px",
fontWeight: 600,
textDecoration: "none",
}}
>
Polidish.blog
</a>
<a
href="https://polidish.store"
style={{
background: "#E3B341",
color: "#000",
padding: "10px 14px",
fontWeight: 600,
textDecoration: "none",
}}
>
Polidish.store
</a>
</div>
</div>

{/* JUNGLE THREAD */}
<div
style={{
border: "1px solid #ddd",
padding: "20px",
minHeight: "100%",
}}
>
<h2>Welcome to the Jungle Thread.</h2>

<p>
Members join via magic link. Posting reveals your name. Reading does
not.
</p>

<input
type="email"
placeholder="Enter email"
value={email}
onChange={(e) => setEmail(e.target.value)}
style={{
padding: "10px",
width: "100%",
marginBottom: "10px",
}}
/>

<button
onClick={sendMagicLink}
style={{
padding: "10px 16px",
fontWeight: 600,
}}
>
{sent ? "Check your email" : "Join"}
</button>
</div>
</section>

{/* FOOTER */}
<footer
style={{
borderTop: "1px solid #ddd",
padding: "12px 24px",
fontSize: "11px",
display: "flex",
justifyContent: "space-between",
}}
>
<div>
Polidish LLC is not legally responsible for your poor judgment. If you
endanger children, threaten terrorism, or break the law, you reveal
yourself. Two factor authentication. It’s a troll-free freedom fest.
</div>
<div>
© 2025 Polidish LLC. All rights reserved. — 127 Minds · Day 1
</div>
</footer>
</main>
);
}
