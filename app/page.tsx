export default function Page() {
return (
<>
<header style={{
textAlign: "center",
padding: "20px",
borderBottom: "3px solid #d4af37",
background: "#000",
color: "#eaeaea"
}}>
<h1>Polidish</h1>
<p>Public discourse. Verified contributors.</p>
</header>

<main style={{
display: "flex",
maxWidth: "1400px",
margin: "0 auto",
minHeight: "80vh",
background: "#000",
color: "#eaeaea"
}}>
{/* LEFT COLUMN */}
<div style={{
width: "30%",
padding: "20px",
borderRight: "3px solid #d4af37",
boxSizing: "border-box"
}}>
<div style={{ border: "1px solid #555", height: "140px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
Advertisement
</div>
<div style={{ border: "1px solid #555", height: "140px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
Advertisement
</div>
<div style={{ border: "1px solid #555", height: "140px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
Advertisement
</div>

<button style={{
width: "100%",
padding: "12px",
marginTop: "10px",
background: "#d4af37",
color: "#000",
border: "none",
fontWeight: "bold",
cursor: "pointer"
}}>
Join
</button>

<button style={{
width: "100%",
padding: "12px",
marginTop: "10px",
background: "#d4af37",
color: "#000",
border: "none",
fontWeight: "bold",
cursor: "pointer"
}}>
About
</button>
</div>

{/* RIGHT COLUMN */}
<div style={{
width: "70%",
padding: "20px",
display: "flex",
alignItems: "center",
justifyContent: "center",
boxSizing: "border-box"
}}>
<div style={{
width: "100%",
height: "500px",
border: "4px solid #d4af37",
display: "flex",
alignItems: "center",
justifyContent: "center",
color: "#aaa",
fontStyle: "italic"
}}>
Jungle loading…
</div>
</div>
</main>

<footer style={{
textAlign: "center",
padding: "20px",
borderTop: "3px solid #d4af37",
background: "#000",
color: "#aaa",
fontSize: "0.9em"
}}>
© Polidish — A venue, not a platform
</footer>
</>
);
}
