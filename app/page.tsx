export default function Home() {
return (
<>
<main
style={{
display: 'flex',
flexDirection: 'column',
minHeight: '100vh',
}}
>
<header style={{ height: 60 }}>
{/* logo here */}
</header>

<section style={{ display: 'flex', flex: 1 }}>
{/* Outpost */}
<aside
style={{
width: '25%',
padding: 16,
display: 'flex',
flexDirection: 'column',
gap: 12,
}}
>
<div style={{ border: '2px solid black', padding: 12 }}>
Ad Box 1
</div>
<div style={{ border: '2px solid black', padding: 12 }}>
Ad Box 2
</div>
<div style={{ border: '2px solid black', padding: 12 }}>
Ad Box 3
</div>

<button>Sign Up</button>
<button>Log In</button>
</aside>

{/* Jungle */}
<section style={{ width: '75%', padding: 16 }}>
<div
style={{
background: 'white',
minHeight: '100%',
padding: 16,
}}
>
Jungle Thread Content
</div>
</section>
</section>

<footer
style={{
width: '100%',
padding: '8px 16px',
fontSize: 12,
}}
>
Footer content runs full width
</footer>
</main>
</>
);
}
