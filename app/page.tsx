'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from './lib/supabaseClient';

const ADS = [
{ src: '/pier.jpeg', caption: 'Visualize your ad right here, to the left, or in the center.', duration: 15000 },
{ src: '/decanter.jpeg', caption: 'Advertisements are absolutely uncurated for your privacy.', duration: 30000 },
{ src: '/peacock.jpeg', caption: 'Polidish: the Outpost where luxury partners meet High Worth While Individuals (HWWI).', duration: 60000 },
];

function AdFrame({ startIndex }: { startIndex: number }) {
const [index, setIndex] = useState(startIndex);
const [visible, setVisible] = useState(true);

useEffect(() => {
const hold = ADS[index].duration;
const transition = 15000;

const t1 = setTimeout(() => setVisible(false), hold);
const t2 = setTimeout(() => {
setIndex(i => (i + 1) % ADS.length);
setVisible(true);
}, hold + transition);

return () => {
clearTimeout(t1);
clearTimeout(t2);
};
}, [index]);

return (
<div style={{ border: '3px solid black', padding: 8, position: 'relative' }}>
<div style={{ opacity: visible ? 1 : 0, transition: 'opacity 15s linear' }}>
<Image src={ADS[index].src} alt="Advertisement" width={600} height={900} style={{ width: '100%', height: 'auto' }} />
<div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, color: 'gold', fontStyle: 'italic', fontSize: 14 }}>
{ADS[index].caption}
</div>
</div>
</div>
);
}

type Vine = {
id: string;
content: string;
created_at: string;
};

export default function Page() {
const [email, setEmail] = useState('');
const [sent, setSent] = useState(false);
const [verified, setVerified] = useState(false);
const [vines, setVines] = useState<Vine[]>([]);
const [draft, setDraft] = useState('');

useEffect(() => {
supabase.auth.getSession().then(({ data }) => {
setVerified(!!data.session);
});

loadVines();

const channel = supabase
.channel('vines')
.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'vines' }, loadVines)
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

const handleJoin = async () => {
const { error } = await supabase.auth.signInWithOtp({
email,
options: { emailRedirectTo: 'https://polidish.com' },
});

if (!error) setSent(true);
};

return (
<main style={{ fontFamily: 'serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
{/* HEADER */}
<header style={{ background: 'black', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
<Image src="/_logo polidish.png" alt="Polidish" width={96} height={96} style={{ width: 48, height: 48 }} priority />
<div style={{ color: '#d07a3a', fontSize: 'clamp(14px, 1.6vw, 20px)', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>
THE VENUE FOR UNCENSORED POLITICAL DISCOURSE. 18+
</div>
</header>

{/* BODY */}
<section className="grid">
<aside className="ads">
<AdFrame startIndex={0} />
<AdFrame startIndex={1} />
<AdFrame startIndex={2} />
</aside>

<section className="jungle">
<h2>
Politely dishing politics.
<span className="rule-line">May the best mind win.</span>
</h2>

{/* SIGN-UP */}
<div className="signup">
<input type="email" placeholder="Email for member sign-up" value={email} onChange={e => setEmail(e.target.value)} />
<button onClick={handleJoin} style={{ background: sent ? 'gold' : 'black', color: sent ? 'black' : 'white', border: '2px solid black', padding: '8px 12px', fontWeight: 600 }}>
Join
</button>
</div>

{sent && <div style={{ marginTop: 6 }}>An email has been sent with a magic link.</div>}

<p>Freedom is deliberate. Welcome to the Jungle Thread.</p>

<div className="divider">Jungle posting for verified members.</div>

{/* JUNGLE THREAD */}
<div className="scroll">
{verified && (
<>
<div style={{ marginBottom: 8 }}>
<strong>YOU</strong> are verified. Post political discourse here.
</div>
<textarea
value={draft}
onChange={e => setDraft(e.target.value)}
rows={3}
style={{ width: '100%', marginBottom: 12 }}
/>
<button onClick={postVine} style={{ marginBottom: 16 }}>
Post
</button>
</>
)}

{vines.map(v => (
<div key={v.id} style={{ marginBottom: 12 }}>
{v.content}
</div>
))}
</div>

<p className="age">
18+ only. By visiting or joining Polidish, you affirm that you are at least 18 years of age.
</p>
</section>
</section>

{/* FOOTER */}
<footer className="footer">
<div>
Polidish LLC is not legally responsible for your poor judgment. If you endanger children, threaten terrorism, or break the law, you reveal yourself.
</div>
<div>© 2025 Polidish LLC. All rights reserved.</div>
</footer>

{/* STYLES */}
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
.jungle {
border: 3px solid black;
padding: 24px;
display: flex;
flex-direction: column;
background: white;
}
.scroll {
border: 1px solid #ddd;
padding: 12px;
flex: 1;
overflow-y: auto;
}
.rule-line {
margin-left: 6px;
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
.divider {
margin: 12px 0;
padding: 8px 0;
border-top: 1px solid #bbb;
border-bottom: 1px solid #bbb;
text-align: center;
}
.age {
font-size: 12px;
margin-top: 12px;
}
.footer {
padding: 16px 24px;
font-size: 12px;
border-top: 2px solid black;
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
