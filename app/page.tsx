"use client";

export default function Page() {
return (
<div>
{/* IFRAME TO TIINY SITE */}
<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
<iframe
src="https://polidish.tiiny.site"
width="100%"
height="800"
style={{ border: "4px solid #d4af37" }}
allowFullScreen
/>
</div>

{/* TOP SIGNUP BAR */}
<div
style={{
background: "#000",
color: "#d4af37",
padding: "30px 20px",
textAlign: "center",
borderBottom: "4px solid #d4af37",
}}
>
<h1 style={{ margin: 0, fontSize: "2.5em" }}>Polidish</h1>
<p style={{ fontSize: "1.3em", fontWeight: "bold", margin: "15px 0" }}>
Welcome to the jungle thread — uncensored viewpoints of verified member accounts posted here.
</p>
<p style={{ margin: "10px 0" }}>
<strong>By signing up you confirm you are at least 18 years old (voting age).</strong>
</p>

<form id="signup-form" style={{ margin: "25px auto", maxWidth: "500px" }}>
<input
id="signup-email"
type="email"
placeholder="Your email"
required
style={{ width: "70%", padding: "14px", fontSize: "1.1em" }}
/>
<button
type="submit"
style={{
width: "28%",
padding: "14px",
background: "#d4af37",
color: "#000",
border: "none",
fontWeight: "bold",
fontSize: "1.1em",
cursor: "pointer",
}}
>
Join → Magic Link
</button>
</form>

<div id="status" style={{ marginTop: "10px", color: "#d4af37", fontWeight: "bold" }} />
</div>

{/* MAIN LAYOUT */}
<div
style={{
display: "flex",
flexWrap: "wrap",
maxWidth: "1400px",
margin: "0 auto",
}}
>
{/* ADS */}
<div
style={{
flex: 1,
minWidth: "250px",
background: "#111",
padding: "20px",
borderRight: "3px solid #d4af37",
}}
>
<h3 style={{ color: "#d4af37", textAlign: "center", marginTop: 0 }}>Ads</h3>
<div
style={{
background: "#222",
height: "90vh",
color: "#888",
textAlign: "center",
paddingTop: "40vh",
}}
>
Your ad here
<br />
→ contact@polidish.com
</div>
</div>

{/* THREAD */}
<div
style={{
flex: 3,
minWidth: "300px",
background: "#000",
color: "#fff",
padding: "30px",
height: "80vh",
overflowY: "auto",
}}
>
<h2 style={{ color: "#d4af37", textAlign: "center", marginTop: 0 }}>
The Jungle Thread
</h2>
<hr style={{ borderColor: "#d4af37", margin: "20px 0" }} />
<div id="thread-posts">
<p style={{ textAlign: "center", color: "#888", fontStyle: "italic" }}>
No posts yet — the first verified voice starts the fire.
</p>
</div>
</div>
</div>

{/* CLIENT SIDE SCRIPT */}
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

