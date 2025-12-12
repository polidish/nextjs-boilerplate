export default function Page() {
return (
<main
style={{
minHeight: "100vh",
display: "flex",
flexDirection: "column",
backgroundColor: "#BF5700", // burnt orange field (explicit, locked)
}}
>
{/* HEADER */}
<header
style={{
padding: "16px 24px",
fontSize: "20px",
fontWeight: 600,
}}
>
POLIDISH
</header>

{/* MAIN TWO-COLUMN LAYOUT */}
<section
style={{
display: "flex",
flex: 1,
gap: "24px",
padding: "24px",
}}
>
{/* OUTPOST (LEFT COLUMN) */}
<aside
style={{
width: "28%",
display: "flex",
flexDirection: "column",
gap: "16px",
}}
>
<div style={adBoxStyle}>Outpost Box 1</div>
<div style={adBoxStyle}>Outpost Box 2</div>
<div style={adBoxStyle}>Outpost Box 3</div>

<button style={buttonStyle}>Sign Up</button>
<button style={buttonStyle}>Log In</button>
</aside>

{/* JUNGLE THREAD (RIGHT COLUMN) */}
<section
style={{
width: "72%",
backgroundColor: "#FFFFFF", // jungle canvas only
padding: "24px",
overflowY: "auto",
}}
>
<p>Jungle Thread placeholder content.</p>
<p>Text-first. Content lives here.</p>
</section>
</section>

{/* FOOTER */}
<footer
style={{
padding: "8px 24px",
fontSize: "12px",
textAlign: "center",
}}
>
© Polidish
</footer>
</main>
);
}

/* --- local styles (explicit, no defaults) --- */

const adBoxStyle: React.CSSProperties = {
border: "2px solid #000000",
padding: "12px",
backgroundColor: "transparent",
};

const buttonStyle: React.CSSProperties = {
padding: "10px",
fontSize: "14px",
cursor: "pointer",
};
