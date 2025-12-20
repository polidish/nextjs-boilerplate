'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from './lib/supabaseClient';

/* =========================
AD CONFIG
========================= */

const ADS = [
{
src: '/pier.jpeg',
caption: 'Visualize your ad right here, to the left, or in the center.',
duration: 15000,
},
{
src: '/decanter.jpeg',
caption: 'Luxury brands belong where readers think.',
duration: 30000,
},
{
src: '/peacock.jpeg',
caption: 'Polidish is text-first. Ideas are the asset.',
duration: 60000,
},
];

function AdFrame({ startIndex }: { startIndex: number }) {
const [index, setIndex] = useState(startIndex);
const [visible, setVisible] = useState(true);

useEffect(() => {
const hold = ADS[index].duration;
const fade = 15000;

const t1 = setTimeout(() => setVisible(false), hold);
const t2 = setTimeout(() => {
setIndex((i) => (i + 1) % ADS.length);
setVisible(true);
}, hold + fade);

return () => {
clearTimeout(t1);
clearTimeout(t2);
};
}, [index]);

return (
<div style={{ border: '3px solid black', padding: 8, position: 'relative' }}>
<div style={{ opacity: visible ? 1 : 0, transition: 'opacity 15s linear' }}>
<Image
src={ADS[index].src}
alt="Advertisement"
width={600}
height={900}
style={{ width: '100%', height: 'auto' }}
/>
<div
style={{
position: 'absolute',
bottom: 16,
left: 16,
right: 16,
color: 'gold',
fontStyle: 'italic',
fontSize: 14,
}}
>
{ADS[index].caption}
</div>
</div>
</div>
);
}

/* =========================
TYPES
========================= */

type Vine = {
id: string;
content: string;
created_at: string;
};

/* =========================
PAGE
========================= */

export default function Page() {
const [email, setEmail] = useState('');
const [sent, setSent] = useState(false);
const [verified, setVerified] = useState(false);
const [showVerifiedBanner, setShowVerifiedBanner] = useState(false);
const [vines, setVines] = useState<Vine[]>([]);
const [draft, setDraft] = useState('');

useEffect(() => {
supabase.auth.getSession().then(({ data }) => {
if (data.session) {
setVerified(true);
setShowVerifiedBanner(true);
setTimeout(() => setShowVerifiedBanner(false), 4000);
}
});

loadVines();

const channel = supabase
.channel('vines')
.on(
'postgres_changes',
{ event: 'INSERT', schema: 'public', table: 'vines' },
loadVines
)
.subscribe();

return () => {
supabase.removeChannel(channel);
};
}, []);

async function loadVines() {
const { data } = await supabase
.from('vines')
.select('id, content, created_at')
.order('created_at', { ascending: true });

if (data) setVines(data);
}

async function postVine() {
if (!draft.trim()) return;

await supabase.from('vines').insert({ content: draft.trim() });
setDraft('');
}

async function handleJoin() {
const { error } = await supabase.auth.signInWithOtp({
email,
options: { emailRedirectTo: 'https://polidish.com' },
});

if (!error) setSent(true);
}

return (
<main style={{ fontFamily: 'serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
{/* HEADER */}
<header
style={{
background: 'black',
padding: '12px 24px',
display: 'flex',
alignItems: 'center',
justifyContent: 'space-between',
}}
>
<Image src="/_logo polidish.png" alt="Polidish" width={48} height={48} />
<div
style={{
color: '#d07a3a',
fontSize: 'clamp(14px, 1.6vw, 20px)',
letterSpacing: '0.05em',
textTransform: 'uppercase',
fontWeight: 600,
}}
>
The venue for uncensored political discourse. 18+
</div>
</header>

{/* VERIFIED BANNER */}
{showVerifiedBanner && (
<div
style={{
background: 'gold',
color: 'black',
padding: '12px',
textAlign: 'center',
fontWeight: 700,
}}
>
YOU are a verified author.
</div>
)}

{/* BODY */}
<section className="grid">
<aside className="ads">
<AdFrame startIndex={0} />
<AdFrame startIndex={1} />
<AdFrame startIndex={2} />

<a className="outpost-btn" href="/store">STORE</a>
<a className="outpost-btn" href="/blog">BLOG</a>
</aside>

<section className="jungle">
<h2>
Politely dishing politics.
<span className="rule-line">May the best mind win.</span>
</h2>

<div className="signup">
<input
type="email"
placeholder="Email for member sign-up"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
<button onClick={handleJoin}>Join</button>
</div>

{sent && <div style={{ marginBottom: 12 }}>Magic link sent.</div>}

<p>Freedom is deliberate. Welcome to the Jungle Thread.</p>

<div className="scroll">
{vines.map((v) => (
<div key={v.id} style={{ marginBottom: 12 }}>
{v.content}
</div>
))}

{verified && (
<>
<textarea
value={draft}
onChange={(e) => setDraft(e.target.value)}
rows={4}
style={{ width: '100%', marginTop: 12 }}
/>
<button onClick={postVine} style={{ marginTop: 8 }}>
Post
</button>
</>
)}
</div>

<p className="age">
18+ only. By using Polidish, you affirm that you are at least 18 years of age.
</p>
</section>
</section>

{/* FOOTER */}
<footer className="footer">
<div>
Polidish LLC is not legally responsible for your poor judgment.
</div>
<div>© 2025 Polidish LLC</div>
</footer>

<style jsx>{`
.grid {
display: grid;
grid-template-columns: 320px 1fr;
gap: 24px;
padding: 24px;
flex: 1;
}
.ads {
display: flex;
flex-direction: column;
gap: 16px;
}
.outpost-btn {
display: block;
background: black;
color: gold;
text-align: center;
padding: 10px;
font-weight: 600;
text-decoration: none;
border: 2px solid gold;
}
.jungle {
border: 3px solid black;
padding: 24px;
background: white;
display: flex;
flex-direction: column;
}
.scroll {
flex: 1;
overflow-y: auto;
border: 1px solid #ddd;
padding: 12px;
}
.signup {
display: flex;
gap: 8px;
margin: 12px 0;
}
.signup input {
flex: 1;
padding: 8px;
}
.footer {
border-top: 2px solid black;
padding: 16px 24px;
font-size: 12px;
}
@media (max-width: 768px) {
.grid {
grid-template-columns: 1fr;
}
}
`}</style>
</main>
);
}
