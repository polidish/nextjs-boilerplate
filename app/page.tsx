export default function Page() {
return (
<main style={{ background: "#c56b2c", minHeight: "100vh" }}>
{/* TOP STRAP */}
<div
style={{
background: "#ffffff",
color: "#c56b2c",
textAlign: "center",
fontSize: "22px",
fontStyle: "italic",
padding: "12px 0",
}}
>
Politely dish politics. May the best mind win.
</div>

{/* HEADER */}
<div
style={{
display: "flex",
justifyContent: "space-between",
padding: "24px",
color: "#111",
fontWeight: 600,
fontSize: "20px",
}}
>
<div>YOU ARE CORDIALLY INVITED TO THE POLIDISH VENUE</div>
<div>FREEDOM IS DELIBERATE</div>
</div>

{/* MAIN GRID */}
<section
style={{
display: "grid",
gridTemplateColumns: "360px 1fr",
gap: "24px",
padding: "24px",
}}
>
{/* LEFT COLUMN – OUTPOST */}
<div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
{/* PIER */}
<div style={{ position: "relative" }}>
<img
src="/pier.jpg"
style={{ width: "100%", display: "block" }}
/>
<div
style={{
position: "absolute",
bottom: "12px",
left: "12px",
right: "12px",
color: "#f2c14e",
fontStyle: "italic",
fontSize: "16px",
}}
>
Visualize your ad right here, to the left, or in the center.
</div>
</div>

{/* DECANTER */}
<div style={{ position: "relative" }}>
<img
src="/decanter.jpg"
style={{ width: "100%", display: "block" }}
/>
<div
style={{
position: "absolute",
bottom: "12px",
left: "12px",
right: "12px",
color: "#f2c14e",
fontStyle: "italic",
fontSize: "16px",
}}
>
Advertisements are absolutely uncurated for your privacy.
</div>
</div>

{/* PEACOCK */}
<div style={{ position: "relative" }}>
<img
src="/peacock.jpg"
style={{ width: "100%", display: "block" }}
/>
<div
style={{
position: "absolute",
bottom: "12px",
left: "12px",
right: "12px",
color: "#f2c14e",
fontStyle: "italic",
fontSize: "16px",
}}
>
Polidish: the Outpost where luxury partners meet High Worthwhile
Individuals (HWWI).
</div>
</div>

{/* BLACK CALLOUTS */}
<div
style={{
background: "#000",
color: "#f2c14e",
padding: "14px",
textAlign: "center",
fontWeight: 600,
}}
>
POLIDISH.STORE COMING SOON FOR
<br />
ORIGINAL POLIDISH BRAND MERCH
</div>

<div
style={{
background: "#000",
color: "#f2c14e",
padding: "14px",
textAlign: "center",
fontWeight: 600,
}}
>
POLIDISH.BLOG COMING SOON IN
<br />
2026 – MEMBERS EXTENDED DISH
</div>
</div>

{/* RIGHT COLUMN */}
<div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
{/* MEMBERS SIGN UP */}
<div
style={{
background: "#000",
padding: "24px",
color: "#fff",
}}
>
<h2 style={{ marginBottom: "8px" }}>Polidish</h2>
<div style={{ fontSize: "14px", marginBottom: "12px" }}>
Transparent. Public view. Members-only posting.
<br />
18+ · Freedom of speech · No censorship
</div>
<div style={{ display: "flex", gap: "8px" }}>
<input
placeholder="your@email.com"
style={{
flex: 1,
padding: "10px",
borderRadius: "4px",
border: "1px solid #555",
}}
/>
<button
style={{
padding: "10px 18px",
background: "#f2c14e",
border: "none",
fontWeight: 600,
}}
>
Join
</button>
</div>
</div>

{/* JUNGLE THREAD */}
<div
style={{
background: "#ffffff",
border: "1px solid #aaa",
padding: "24px",
minHeight: "360px",
color: "#111",
}}
>
<div style={{ fontStyle: "italic", color: "#777" }}>
Jungle loading…
</div>
</div>
</div>
</section>

{/* FOOTER */}
<footer
style={{
padding: "24px",
fontSize: "12px",
color: "#111",
}}
>
<div>© 2025 Polidish LLC · Day 1 · 127 Minds</div>
<div style={{ marginTop: "8px" }}>
Polidish LLC is not legally responsible for your poor judgment. If you
endanger children, threaten terrorism, or break the law, you reveal
yourself. *Two-factor authentication. It’s a troll-free freedom fest.
</div>
</footer>
</main>
);
}
