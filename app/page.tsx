"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export default function Page() {
const [email, setEmail] = useState("");
const [status, setStatus] = useState("");

async function handleMagicLink(e: React.FormEvent) {
e.preventDefault();
setStatus("Sending magic link…");

const { error } = await supabase.auth.signInWithOtp({
email,
options: { emailRedirectTo: window.location.origin }
});

setStatus(error ? "Error sending link." : "Check your email for the magic link.");
}

return (
<main className="page">
{/* LOGO — TOP LEFT */}
<div className="logo">
<img src="/_logo polidish.png" alt="Polidish" />
</div>

{/* LAYOUT */}
<section className="layout">
{/* LEFT COLUMN (OUTPOST PLACEHOLDER) */}
<aside className="left">
{/* Keep your ad boxes here if already wired */}
</aside>

{/* RIGHT COLUMN (VENUE) */}
<section className="right">
{/* HEADER (ABOVE DISCUSSION) */}
<header className="header">
<em>Politely dishing politics.</em>{" "}
<strong>May the best mind win.</strong>
</header>

{/* FULL WHITE VENUE */}
<div className="venue">
<div className="hero-line">
Freedom is deliberate. Welcome to the Jungle Thread.
</div>

<div className="jungle-head">
<strong>Jungle Thread</strong>
</div>

{/* MAGIC BUTTON */}
<form className="signup" onSubmit={handleMagicLink}>
<input
type="email"
required
placeholder="Email for member sign-up"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
<button type="submit">Members Sign Up</button>
</form>

<div className="status">{status}</div>

<div className="age-note">
18+ only. By visiting or joining Polidish, you affirm that you are at
least 18 years of age.
</div>
</div>
</section>
</section>

{/* FOOTER */}
<footer className="footer">
<div>© Polidish LLC</div>
<div>
Legal disclaimer: Opinions expressed by users are their own. Polidish
does not endorse or verify user content except as required by law.
</div>
<div>
18+ only. By visiting or joining Polidish, you affirm that you are at
least 18 years of age.
</div>
</footer>

{/* STYLES */}
<style>{`
.page {
background: #d67c1c;
min-height: 100vh;
padding: 18px;
font-family: Georgia, "Times New Roman", Times, serif;
}

.logo {
position: absolute;
top: 18px;
left: 18px;
border: 3px solid #000;
padding: 6px;
}

.logo img {
height: 44px;
display: block;
}

.layout {
display: flex;
gap: 20px;
margin-top: 90px;
align-items: stretch;
}

.left {
width: 380px;
}

.right {
flex: 1;
display: flex;
flex-direction: column;
}

.header {
font-size: 20px;
margin-bottom: 10px;
}

.venue {
flex: 1;
background: #fff;
border: 4px solid #000;
padding: 16px;
}

.hero-line {
font-size: 18px;
margin-bottom: 14px;
}

.jungle-head {
font-size: 18px;
margin-bottom: 12px;
}

.signup {
display: flex;
gap: 8px;
margin-bottom: 10px;
}

.signup input {
flex: 1;
padding: 8px;
border: 2px solid #000;
font-family: inherit;
}

.signup button {
padding: 8px 12px;
border: 2px solid #000;
background: #fff;
font-family: inherit;
font-weight: bold;
cursor: pointer;
}

.status {
margin-bottom: 10px;
font-size: 14px;
}

.age-note {
font-size: 14px;
font-style: italic;
}

.footer {
margin-top: 24px;
padding: 14px 18px;
background: #000;
color: #f5d35b;
font-size: 13px;
line-height: 1.4;
border-top: 4px solid #000;
}

.footer div:first-child {
font-weight: bold;
margin-bottom: 4px;
}

@media (max-width: 900px) {
.layout {
flex-direction: column;
}
.left {
width: 100%;
}
}
`}</style>
</main>
);
}
