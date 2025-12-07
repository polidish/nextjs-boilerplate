export default function Page() {
return (
<div
style={{
minHeight: "100vh",
backgroundColor: "#BF5700", // UT Longhorn burnt orange
display: "flex",
flexDirection: "column",
color: "#fff",
fontFamily: "'Georgia', 'Times New Roman', serif",
}}
>
{/* HEADER */}
<header
style={{
textAlign: "center",
padding: "20px 10px 10px",
}}
>
<h1 style={{ margin: 0, fontSize: "2.7rem" }}>Polidish.com</h1>
<p
style={{
margin: "8px 0 0",
fontStyle: "italic",
fontSize: "1.05rem",
}}
>
Polidish — Politely dishing politics — may the best mind win.
</p>

{/* TEXT-ONLY / VOTERS LINE */}
<p
style={{
margin: "10px 0 0",
fontSize: "0.95rem",
}}
>
Polidish is text-only because voters can read a ballot and imagine
their future. Literacy equals independence.
</p>
</header>

{/* SMALL SIGNUP BAR */}
<section
style={{
maxWidth: "700px",
margin: "10px auto 0",
backgroundColor: "#111",
borderRadius: "8px",
padding: "10px 16px 14px",
border: "2px solid #000",
textAlign: "center",
}}
>
<h2 style={{ margin: "0 0 6px", fontSize: "1.3rem" }}>Polidish</h2>
<p
style={{
margin: "0 0 10px",
fontSize: "0.9rem",
fontWeight: "bold",
}}
>
Transparent public view. Members only, 18+ (voting age). Zero
censorship. Freedom rocks.
</p>
<form
onSubmit={(e) => {
e.preventDefault();
alert("Magic link flow coming soon.");
}}
style={{
display: "flex",
gap: "6px",
justifyContent: "center",
alignItems: "center",
}}
>
<input
type="email"
required
placeholder="Email for magic link (coming soon)"
style={{
padding: "8px",
fontSize: "0.9rem",
width: "65%",
borderRadius: "4px",
border: "1px solid #444",
}}
/>
<button
type="submit"
style={{
padding: "8px 12px",
fontSize: "0.9rem",
borderRadius: "4px",
border: "none",
cursor: "pointer",
backgroundColor: "#f7f2d0",
color: "#000",
fontWeight: "bold",
}}
>
Join
</button>
</form>
</section>

{/* MAIN TWO-COLUMN LAYOUT */}
<main
style={{
flex: 1,
display: "flex",
gap: "16px",
maxWidth: "1200px",
width: "100%",
margin: "16px auto 0",
padding: "0 12px 20px",
boxSizing: "border-box",
}}
>
{/* LEFT COLUMN: ADS / IMAGES PLACEHOLDERS */}
<aside
style={{
flex: "0 0 32%",
display: "flex",
flexDirection: "column",
gap: "10px",
}}
>
{/* Big “hero” slot – you can replace these placeholders with your bridge images later */}
<div
style={{
backgroundColor: "#000",
borderRadius: "6px",
padding: "10px",
minHeight: "120px",
border: "2px solid #000",
}}
>
<p style={{ margin: 0, fontSize: "0.8rem" }}>
[Pennybacker Bridge – Austin]
<br />
(image placeholder)
</p>
</div>
<div
style={{
backgroundColor: "#000",
borderRadius: "6px",
padding: "10px",
minHeight: "120px",
border: "2px solid #000",
}}
>
<p style={{ margin: 0, fontSize: "0.8rem" }}>
[NYC Bridge – “bridging minds”]
<br />
(image placeholder)
</p>
</div>
<div
style={{
backgroundColor: "#000",
borderRadius: "6px",
padding: "10px",
minHeight: "80px",
border: "2px solid #000",
}}
>
<p style={{ margin: 0, fontSize: "0.8rem" }}>
[Ace of diamonds / “holding the cards”]
<br />
(image placeholder)
</p>
</div>

{/* BLOG / STORE BOXES */}
<div
style={{
display: "flex",
flexDirection: "column",
gap: "6px",
marginTop: "4px",
}}
>
<div
style={{
backgroundColor: "#000",
borderRadius: "4px",
padding: "8px",
border: "2px solid #000",
textAlign: "center",
fontSize: "0.85rem",
}}
>
POLIDISH.BLOG
</div>
<div
style={{
backgroundColor: "#000",
borderRadius: "4px",
padding: "8px",
border: "2px solid #000",
textAlign: "center",
fontSize: "0.85rem",
}}
>
POLIDISH.STORE
</div>
</div>

{/* AD PHILOSOPHY LINE */}
<p
style={{
marginTop: "8px",
fontSize: "0.75rem",
lineHeight: 1.3,
}}
>
Live in the now — advertisements absolutely uncurated for your
continued privacy.
</p>
</aside>

{/* RIGHT COLUMN: JUNGLE THREAD */}
<section
style={{
flex: "1 1 0",
backgroundColor: "#fdfdfd",
color: "#000",
borderRadius: "8px",
border: "3px solid #000",
padding: "14px 14px 10px",
display: "flex",
flexDirection: "column",
minHeight: "300px",
}}
>
<h2
style={{
margin: "0 0 6px",
fontSize: "1.2rem",
textAlign: "center",
}}
>
Welcome to the Jungle Thread — members only.
</h2>

<p
style={{
margin: "0 0 10px",
fontSize: "0.85rem",
textAlign: "center",
}}
>
Opinions here are text-only. Voters can read, imagine, and decide.
</p>

{/* SCROLLABLE THREAD AREA */}
<div
style={{
flex: 1,
borderRadius: "4px",
border: "1px solid #ccc",
padding: "10px",
overflowY: "auto",
backgroundColor: "#fff",
}}
>
<p
style={{
margin: 0,
fontSize: "0.9rem",
fontStyle: "italic",
color: "#555",
textAlign: "center",
}}
>
Jungle loading… first verified voter, light the match.
</p>
</div>
</section>
</main>

{/* FOOTER */}
<footer
style={{
borderTop: "1px solid rgba(255,255,255,0.4)",
padding: "6px 10px 10px",
fontSize: "0.7rem",
display: "flex",
alignItems: "flex-start",
justifyContent: "space-between",
gap: "10px",
maxWidth: "1200px",
width: "100%",
margin: "0 auto 6px",
color: "#fdfdfd",
}}
>
{/* LEFT – tiny LLC */}
<div style={{ flex: "0 0 auto", textAlign: "left" }}>
<div>Copyright © 2025</div>
<div>Polidish LLC</div>
<div>All rights reserved.</div>
</div>

{/* CENTER – disclaimer */}
<div
style={{
flex: "1 1 auto",
textAlign: "center",
lineHeight: 1.3,
}}
>
<div>
Polidish does not verify content. Responsibility for speech lies
with the speaker.
</div>
<div>
You endanger children, threaten terrorism, or break the law — you
reveal yourself.
</div>
<div>Two-factor authentication. Troll-free freedom fest.</div>
</div>

{/* RIGHT – minds / day count */}
<div
style={{
flex: "0 0 auto",
textAlign: "right",
whiteSpace: "nowrap",
}}
>
<div>…127 minds</div>
<div>Day 1</div>
</div>
</footer>
</div>
);
}
