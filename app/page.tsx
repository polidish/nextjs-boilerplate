"use client";

export default function Page() {
return (
<div
style={{
background: "#000",
color: "#fff",
minHeight: "100vh",
fontFamily:
'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
}}
>
{/* TOP STRAPLINE */}
<div
style={{
textAlign: "center",
padding: "10px 16px",
borderBottom: "2px solid #d4af37",
fontSize: "0.95rem",
}}
>
<span style={{ color: "#d4af37" }}>
Politely dish politics. May the best mind win.
</span>
</div>

<div
style={{
maxWidth: "1200px",
margin: "20px auto 40px auto",
padding: "0 16px",
}}
>
{/* MAIN HEADLINE */}
<h1
style={{
fontSize: "1rem",
letterSpacing: "0.16em",
textTransform: "uppercase",
textAlign: "center",
margin: "8px 0 24px 0",
color: "#d4af37",
}}
>
POLIDISH: THE VENUE FOR UNCENSORED POLITICS — MEMBERSHIP FREE — SIGN
UP COMING SOON
</h1>

<div
style={{
display: "flex",
gap: "24px",
alignItems: "stretch",
}}
>
{/* LEFT COLUMN: ADS */}
<div
style={{
flex: "0 0 30%",
minWidth: "220px",
background: "#111",
border: "1px solid #333",
padding: "16px",
display: "flex",
flexDirection: "column",
justifyContent: "space-between",
}}
>
<div>
<div
style={{
border: "1px solid #d4af37",
padding: "16px",
marginBottom: "16px",
fontSize: "0.9rem",
color: "#d4af37",
}}
>
Picture your ad right here to the left just near the center.
</div>
</div>
<div
style={{
borderTop: "1px solid #333",
paddingTop: "12px",
fontSize: "0.85rem",
color: "#d4af37",
}}
>
Luxury Advertisement Partners to appeal to the High Worth While
Individuals HWWI.
</div>
</div>

{/* RIGHT COLUMN: SIGNUP + JUNGLE */}
<div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
{/* SIGNUP PANEL */}
<div
style={{
border: "1px solid #d4af37",
background: "#000",
padding: "18px 18px 16px 18px",
marginBottom: "20px",
}}
>
<div
style={{
fontSize: "1.2rem",
color: "#d4af37",
marginBottom: "4px",
}}
>
Polidish
</div>
<div
style={{
fontSize: "0.9rem",
marginBottom: "6px",
}}
>
Transparent. Public view. Members-only posting.
</div>
<div
style={{
fontSize: "0.85rem",
marginBottom: "10px",
color: "#d4af37",
}}
>
18+ • Freedom of speech • No censorship
</div>

<div
style={{
fontSize: "0.85rem",
marginBottom: "12px",
}}
>
By signing up you confirm you are at least 18 years old.
</div>

<form
id="signup-form"
style={{
display: "flex",
gap: "6px",
alignItems: "center",
marginBottom: "8px",
}}
>
<input
id="signup-email"
type="email"
placeholder="Your email"
required
style={{
flex: 1,
padding: "10px",
fontSize: "0.9rem",
borderRadius: "0",
border: "1px solid #444",
background: "#050505",
color: "#fff",
}}
/>
<button
type="submit"
style={{
padding: "10px 14px",
fontSize: "0.9rem",
border: "1px solid #d4af37",
background: "#d4af37",
color: "#000",
cursor: "pointer",
whiteSpace: "nowrap",
}}
>
Join → Magic Link
</button>
</form>

<div
id="status"
style={{
minHeight: "1.2em",
fontSize: "0.85rem",
color: "#d4af37",
}}
/>
</div>

{/* JUNGLE PANEL */}
<div
style={{
position: "relative",
border: "1px solid #d4af37",
background: "#000",
padding: "18px 18px 18px 18px",
minHeight: "260px",
display: "flex",
flexDirection: "column",
}}
>
<div
style={{
fontSize: "1rem",
color: "#d4af37",
marginBottom: "10px",
textAlign: "left",
}}
>
Welcome to the Jungle Thread
</div>

{/* inner white scrollable writing area */}
<div
style={{
background: "#fff",
color: "#000",
padding: "12px 14px",
fontSize: "0.9rem",
maxHeight: "260px",
overflowY: "auto",
borderRadius: "0",
border: "1px solid #ccc",
}}
>
<div id="thread-posts">
<p
style={{
margin: 0,
textAlign: "center",
color: "#444",
fontStyle: "italic",
}}
>
No posts yet — the first verified voice starts the fire.
</p>
</div>
</div>

{/* vertical side text, flush right, Sendak vibes */}
<div
style={{
position: "absolute",
right: "-6px",
top: "50%",
transform: "translateY(-50%)",
writingMode: "vertical-rl",
textOrientation: "mixed",
fontSize: "0.75rem",
color: "#ffffff",
letterSpacing: "0.06em",
opacity: 0.85,
textAlign: "center",
padding: "4px 0",
}}
>
This is where the wild things are.
</div>
</div>
</div>
</div>

{/* FOOTER */}
<div
style={{
marginTop: "32px",
paddingTop: "16px",
borderTop: "1px solid #333",
fontSize: "0.8rem",
lineHeight: 1.5,
}}
>
<div style={{ marginBottom: "6px" }}>
© 2025 Polidish LLC. All rights reserved.
</div>
<div style={{ marginBottom: "6px" }}>
Polidish LLC is not legally responsible for your poor judgement.
</div>
<div style={{ fontStyle: "italic", marginBottom: "4px" }}>
You endanger children, threaten terrorism or break the law, you
reveal yourself.
</div>
<div style={{ fontStyle: "italic", marginBottom: "4px" }}>
Two-factor authentication.
</div>
<div style={{ fontStyle: "italic", marginBottom: "10px" }}>
It&apos;s a troll-free freedom fest.
</div>

<div
style={{
display: "flex",
gap: "16px",
alignItems: "center",
marginTop: "4px",
}}
>
<span style={{ fontSize: "0.8rem", color: "#d4af37" }}>
POLIDISH.BLOG
</span>
<span style={{ fontSize: "0.8rem", color: "#d4af37" }}>
POLIDISH.STORE
</span>
</div>
</div>
</div>

{/* CLIENT-SIDE SIGNUP SCRIPT */}
<script
dangerouslySetInnerHTML={{
__html: `
const form = document.getElementById('signup-form');
const status = document.getElementById('status');
const emailField = document.getElementById('signup-email');

if (form && status && emailField) {
form.addEventListener('submit', async (e) => {
e.preventDefault();
const email = emailField.value.trim();
if (!email) {
status.textContent = 'Please enter a valid email.';
return;
}
status.textContent = 'Sending…';
try {
const res = await fetch('https://polidish.tiiny.site/api/collections/users/auth-with-email', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, identity: email })
});
if (res.ok) {
status.innerHTML = 'Magic link sent — check inbox and spam.';
emailField.value = '';
} else {
status.textContent = 'Error — try again.';
}
} catch (err) {
status.textContent = 'Network error — refresh.';
}
});
}
`,
}}
/>
</div>
);
}
