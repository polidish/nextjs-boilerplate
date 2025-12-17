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
setIndex((i) => (i + 1) % ADS.length);
setVisible(true);
}, hold + transition);
return () => { clearTimeout(t1); clearTimeout(t2); };
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

export default function Page() {
const [email, setEmail] = useState('');
const [joinSent, setJoinSent] = useState(false);
const [user, setUser] = useState<any>(null);
const [vines, setVines] = useState<any[]>([]);
const [draft, setDraft] = useState('');

useEffect(() => {
const load = async () => {
const { data: session } = await supabase.auth.getSession();
setUser(session?.session?.user ?? null);

const { data } = await supabase
.from('vines')
.select('*')
.order('created_at', { ascending: true });

if (data) setVines(data);
};
load();

const { data: authListener } = supabase.auth.onAuthStateChange((_e, session) => {
setUser(session?.user ?? null);
});
return () => authListener.subscription.unsubscribe();
}, []);

const handleJoin = async () => {
const { error } = await supabase.auth.signInWithOtp({
email,
options: { emailRedirectTo: 'https://polidish.com' },
});
if (!error) setJoinSent(true);
};

const handlePost = async () => {
if (!draft.trim() || !user) return;
const { error } = await supabase.from('vines').insert({
content: draft,
user_id: user.id,
});
if (!error) {
setVines((v) => [...v, { content: draft, user_id: user.id, created_at: new Date() }]);
setDraft('');
}
};

const handleDelete = async (id: string) => {
await supabase.from('vines').delete().eq('id', id);
setVines((v) => v.filter((x) => x.id !== id));
};

const emailPrefix = user?.email?.split('@')[0];

return (
<main style={{ fontFamily: 'serif' }}>
<header style={{ background: 'black', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
<Image src="/_logo polidish.png" alt="Polidish" width={96} height={96} style={{ width: 48, height: 48 }} priority />
<div style={{ color: '#d07a3a', fontSize: 'clamp(14px, 1.6vw, 20px)', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>
THE VENUE FOR UNCENSORED POLITICAL DISCOURSE. 18+
</div>
</header>

<section className="grid">
<aside className="ads">
<AdFrame startIndex={0} />
<AdFrame startIndex={1} />
<AdFrame startIndex={2} />
</aside>

<section className="jungle">
<h2>Politely dishing politics. <span className="rule-line">May the best mind win.</span></h2>

<div className="signup">
<input type="email" placeholder="Email for member sign-up" value={email} onChange={(e) => setEmail(e.target.value)} />
<button onClick={handleJoin} style={{
background: joinSent ? 'gold' : 'black',
color: joinSent ? 'black' : 'white',
border: '2px solid black',
padding: '8px 12px',
fontWeight: 600,
}}>
Join
</button>
</div>

{joinSent && <div style={{ marginTop: 6, fontSize: 14 }}>Please check your email for the magic link.</div>}

<div className="divider">The Jungle Thread only grows and grows…</div>

<div className="scroll">
{vines.map((v) => (
<div key={v.id} style={{ marginBottom: 12 }}>
<strong>{emailPrefix}:</strong>
<div style={{ whiteSpace: 'pre-wrap' }}>{v.content}</div>
{user?.id === v.user_id && (
<button onClick={() => handleDelete(v.id)} style={{ marginTop: 4, fontSize: 12 }}>Delete</button>
)}
</div>
))}
</div>

{user && (
<>
<textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Enter" style={{ marginTop: 12, minHeight: 80 }} />
<button onClick={handlePost}>Enter</button>
</>
)}

<p className="age">18+ only. By visiting or joining Polidish, you affirm that you are at least 18 years of age.</p>
</section>
</section>

<footer className="footer">
<div>
Polidish LLC is not legally responsible for your poor judgment. If you endanger children, threaten terrorism, or break the law, you reveal yourself. Two factor authentication. It’s a troll-free freedom fest.
</div>
<div>© 2025 Polidish LLC. All rights reserved. — 127 Minds Day 1</div>
</footer>
</main>
);
}
