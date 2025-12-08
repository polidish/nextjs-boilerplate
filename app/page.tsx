"use client";

export default function Page() {
return (
<div style={{ background: "#BF5700", minHeight: "100vh", paddingBottom: "100px" }}>

{/* HEADER */}
<div style={{ textAlign: "center", padding: "30px 10px", color: "#000" }}>
<img
src="/logo.png"
alt="Polidish"
style={{ width: "120px", marginBottom: "10px" }}
/>
<h1 style={{ fontSize: "2.4em", fontWeight: "bold", margin: "0" }}>
Polidish — Politely Dishing Politics
</h1>
<p style={{ fontStyle: "italic", marginTop: "10px" }}>May the best mind win</p>
</div>

{/* SIGN UP BAR */}
<div
style={{
background: "#111",
borderTop: "4px solid #d4af37",
borderBottom: "4px solid #d4af37",
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

{/* JUNGLE THREAD SECTION */}
<div
style={{
width: "80%",
margin: "0 auto",
background: "#fff",
border: "8px solid #000",
borderRadius: "6px",
padding: "20px",
height: "72vh",
overflowY: "auto"
}}
>
<h2 style={{ textAlign: "center", marginTop: 0 }}>Welcome to the Jungle Thread — Members Only</h2>
<div style={{ borderTop: "2px solid #000", margin: "10px 0" }} />
<div id="thread-posts" style={{ color: "#222", fontSize: "1.1em" }}>
<p style={{ textAlign: "center", color: "#888", fontStyle: "italic" }}>
No posts yet — the first verified voice starts the fire.
</p>
</div>
</div>

{/* FOOTER */}
<div
style={{
width: "100%",
textAlign: "center",
color: "#000",
fontSize: "0.85em",
marginTop: "25px"
}}
>
© Polidish LLC — Transparent public view. Members only — 18+ voting age. Zero censorship.
</div>

{/* SCRIPT: MAGIC LINK */}
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
