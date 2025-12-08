"use client";

export default function Page() {
return (
<div style={{ background: "#BF5700", minHeight: "100vh", paddingBottom: "80px" }}>

{/* HEADER */}
<div style={{ textAlign: "center", padding: "30px 10px" }}>
<img
src="/logo.png"
alt="Polidish"
style={{ width: "120px", marginBottom: "10px" }}
/>
<h1 style={{ fontSize: "3em", fontWeight: "900", margin: "0", fontFamily: "Georgia, serif", color:"#000" }}>
Polidish — Politely Dishing Politics
</h1>
<p style={{ fontSize: "1.5em", fontWeight: "bold", marginTop: "10px", fontFamily: "Georgia, serif", color:"#000" }}>
May the best mind win.
</p>
</div>

{/* SIGN UP BAR */}
<div
style={{
background: "#111",
color: "#d4af37",
padding: "15px 20px",
textAlign: "center",
marginBottom: "20px"
}}
>
<form id="signup-form" style={{ maxWidth: "420px", margin: "0 auto" }}>
<input
id="signup-email"
type="email"
placeholder="email address"
required
style={{
width: "65%",
padding: "12px",
fontSize: "1.1em",
border: "none"
}}
/>
<button
type="submit"
style={{
width: "30%",
padding: "12px",
background: "#d4af37",
color: "#000",
fontWeight: "bold",
cursor: "pointer",
border: "none"
}}
>
Join
</button>
</form>
<div id="status" style={{ marginTop: "8px", fontWeight: "bold" }} />
</div>

{/* MAIN CONTENT WRAPPER */}
<div style={{ display: "flex", width: "90%", margin: "0 auto", gap: "20px" }}>

{/* JUNGLE THREAD */}
<div
style={{
flex: "3",
background: "#fff",
border: "3px solid #000",
borderRadius: "8px",
padding: "20px",
height: "72vh",
overflowY: "auto"
}}
>
<h2 style={{ textAlign: "center", marginTop: 0, fontFamily:"Georgia, serif", fontWeight:"bold" }}>
Welcome to the Jungle Thread — Members Only
</h2>
<div id="thread-posts" style={{ color: "#222", fontSize: "1.1em" }}>
<p style={{ textAlign: "center", color: "#888", fontStyle: "italic" }}>
No posts yet — the first verified voice starts the fire.
</p>
</div>
</div>

{/* ADS — FIXED GOLD TEXT */}
<div style={{ flex:"1", position:"relative" }}>
<div style={{ position:"sticky", top:"20px" }}>
<div style={{ marginBottom:"20px", color:"#d4af37", fontFamily:"Georgia, serif", fontSize:"1.1em" }}>
Stay objective. Stay readable. Stay unpredictable.
</div>
<div style={{ marginBottom:"20px", color:"#d4af37", fontFamily:"Georgia, serif", fontSize:"1.1em" }}>
Think for yourself — we dare you.
</div>
<div style={{ marginBottom:"20px", color:"#d4af37", fontFamily:"Georgia, serif", fontSize:"1.1em" }}>
Uncurated. Unfiltered. Unbothered.
</div>
</div>
</div>
</div>

{/* FOOTER */}
<div
style={{
width: "100%",
textAlign: "center",
color: "#000",
fontSize: "0.9em",
marginTop: "25px",
fontFamily: "Georgia, serif"
}}
>
© Polidish LLC — Transparent public view. Members only — 18+ voting age. Zero censorship.
</div>

{/* MAGIC LINK SCRIPT */}
<script
dangerouslySetInnerHTML={{
__html: `
const form = document.getElementById('signup-form');
const status = document.getElementById('status');
const emailField = document.getElementById('signup-email');

form.addEventListener('submit', async e => {
e.preventDefault();
const email = emailField.value.trim();
status.textContent = 'Sending…';
try {
const res = await fetch('https://polidish.tiiny.site/api/collections/users/auth-with-email', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, identity: email })
});
if (res.ok) {
status.innerHTML = 'Magic link sent — check inbox + spam.';
emailField.value = '';
} else {
status.textContent = 'Error — try again.';
}
} catch (err) {
status.textContent = 'Network error — refresh';
}
});
`,
}}
/>
</div>
);
}
