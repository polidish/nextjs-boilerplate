"use client";

export default function Page() {
return (
<div style={{ background: "#000", color: "#fff", minHeight: "100vh" }}>
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
<p
style={{
fontSize: "1.3em",
fontWeight: "bold",
margin: "15px 0",
}}
>
Welcome to the jungle thread — uncensored viewpoints of verified
member accounts posted here.
</p>
<p style={{ margin: "10px 0" }}>
<strong>
By signing up you confirm you are at least 18 years old (voting
age).
</strong>
</p>

<p
style={{
marginTop: "15px",
fontSize: "0.95em",
color: "#d4af37",
}}
>
Magic-link signup will be enabled soon. For now, Polidish is in
read-only jungle preview.
</p>
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
<h3
style={{
color: "#d4af37",
textAlign: "center",
marginTop: 0,
}}
>
Ads
</h3>
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
<h2
style={{
color: "#d4af37",
textAlign: "center",
marginTop: 0,
}}
>
The Jungle Thread
</h2>
<hr
style={{
borderColor: "#d4af37",
margin: "20px 0",
}}
/>
<div id="thread-posts">
<p
style={{
textAlign: "center",
color: "#888",
fontStyle: "italic",
}}
>
No posts yet — the first verified voice starts the fire.
</p>
</div>
</div>
</div>
</div>
);
}
