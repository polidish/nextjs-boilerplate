import Image from "next/image";

export default function Page() {
return (
<main style={{ background: "#c65a1e", minHeight: "100vh" }}>

{/* TOP BANNER */}
<div
style={{
background: "#c65a1e",
color: "#000",
textAlign: "center",
fontStyle: "italic",
padding: "12px 0",
borderBottom: "4px solid #000",
}}
>
Politely dishing politics. May the best mind win.
</div>

{/* HERO */}
<section
style={{
display: "grid",
gridTemplateColumns: "1fr 2fr",
gap: "24px",
padding: "32px",
}}
>
{/* LEFT COLUMN */}
<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
<Image
src="/pier.jpg"
alt="Pier"
width={600}
height={800}
style={{ width: "100%", height: "auto", border: "4px solid #000" }}
/>

<Image
src="/peacock.jpg"
alt="Peacock"
width={600}
height={800}
style={{ width: "100%", height: "auto", border: "4px solid #000" }}
/>

<div
style={{
border: "2px solid #000",
padding: "12px",
background: "#c65a1e",
}}
>
Portrait / Ads / Pier / Peacock
<br />
Blog
<br />
Store
</div>
</div>

{/* RIGHT COLUMN */}
<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
{/* MEMBERS SIGN-UP */}
<div
style={{
background: "#000",
color: "#fff",
padding: "20px",
border: "3px solid #000",
}}
>
<h2 style={{ marginTop: 0 }}>Polidish</h2>
<p>Transparent. Public view. Members-only posting.</p>

<div style={{ display: "flex", gap: "8px" }}>
<input
placeholder="your@email.com"
style={{
flex: 1,
padding: "10px",
border: "none",
}}
/>
<button
style={{
background: "#f2c94c",
border: "none",
padding: "10px 16px",
fontWeight: "bold",
}}
>
Join
</button>
</div>
</div>

{/* JUNGLE THREAD */}
<div
style={{
background: "#fff",
color: "#000",
padding: "24px",
border: "3px solid #000",
flexGrow: 1,
}}
>
<h3>Welcome to the Jungle Thread — Members Only</h3>
<p style={{ fontStyle: "italic" }}>
No posts yet — the first verified voice starts the fire.
</p>
</div>
</div>
</section>

{/* FOOTER */}
<footer
style={{
padding: "24px",
fontSize: "14px",
color: "#000",
}}
>
Polidish LLC is not legally responsible for your poor judgment.
If you endanger children, threaten terrorism, or break the law, you reveal yourself.
<br />
© 2025 Polidish LLC · Day I · 127 Minds
</footer>
</main>
);
}
