export default function Page() {
return (
<main style={{ background: "#111", minHeight: "100vh" }}>

{/* TOP BANNER */}
<div
style={{
background: "#ffffff",
color: "#b45a1b",
padding: "20px",
textAlign: "center",
fontSize: "28px",
fontStyle: "italic",
fontWeight: 500,
letterSpacing: "0.5px",
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

{/* LEFT COLUMN — PHOTOS */}
<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

{[
{ src: "/pier.jpg", text: "Picture your ad here" },
{ src: "/decanter.jpg", text: "Decanter" },
{ src: "/peacock.jpg", text: "Peacock" },
].map((item) => (
<div
key={item.src}
style={{
position: "relative",
border: "4px solid #000",
}}
>
<img
src={item.src}
alt=""
style={{
width: "100%",
height: "220px",
objectFit: "cover",
display: "block",
}}
/>

{/* GOLD OVERLAY TEXT */}
<div
style={{
position: "absolute",
bottom: "12px",
left: "12px",
color: "#f0c27a",
fontSize: "20px",
fontWeight: 600,
textShadow: "0 1px 3px rgba(0,0,0,.8)",
}}
>
{item.text}
</div>
</div>
))}
</div>

{/* RIGHT COLUMN — JUNGLE THREAD */}
<div
style={{
background: "#ffffff",
padding: "32px",
display: "flex",
flexDirection: "column",
justifyContent: "flex-start",
}}
>
{/* MEMBERS BOX */}
<div
style={{
alignSelf: "flex-end",
border: "2px solid #b45a1b",
padding: "12px 20px",
marginBottom: "24px",
fontWeight: 600,
color: "#b45a1b",
}}
>
Members Sign Up · 18+
</div>

{/* JUNGLE THREAD */}
<div
style={{
color: "#000",
fontSize: "18px",
lineHeight: 1.6,
flexGrow: 1,
}}
>
<strong>Jungle Thread</strong>
<p>
This is a public reading space. Members-only posting.
No referees. No moderation. Ideas stand on their own merit.
</p>
<p>
The jungle is open.
</p>
</div>
</div>
</section>

{/* FOOTER */}
<footer
style={{
color: "#999",
fontSize: "14px",
textAlign: "center",
padding: "24px",
}}
>
© Polidish LLC · All rights reserved · Legal disclaimer · Count
</footer>

</main>
)
}
