'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from './lib/supabaseClient';

/* ---------------- ADS ---------------- */

const ADS = [
{ src: '/pier.jpeg', caption: 'Visualize your ad right here.', duration: 15000 },
{ src: '/decanter.jpeg', caption: 'Advertisements are absolutely uncurated.', duration: 30000 },
{ src: '/peacock.jpeg', caption: 'Polidish Outpost — HWWI.', duration: 60000 },
];

function AdFrame({ startIndex }: { startIndex: number }) {
const [index, setIndex] = useState(startIndex);
const [visible, setVisible] = useState(true);

useEffect(() => {
const hold = ADS[index].duration;
const t1 = setTimeout(() => setVisible(false), hold);
const t2 = setTimeout(() => {
setIndex((i) => (i + 1) % ADS.length);
setVisible(true);
}, hold + 15000);
return () => {
clearTimeout(t1);
clearTimeout(t2);
};
}, [index]);

return (
<div style={{ border: '3px solid black', padding: 8, position: 'relative' }}>
<div style={{ opacity: visible ? 1 : 0, transition: 'opacity 15s linear' }}>
<Image src={ADS[index].src} alt="Ad" width={600} height={900} />
<div style={{ color: 'gold', fontStyle: 'italic' }}>{ADS[index].caption}</div>
</div>
</div>
);
}

/* ---------------- PAGE ---------------- */

type Vine = {
id: string;
content: string;
created_at: string;
};

export default function Page() {
const [email, setEmail] = useState('');
const [sent, setSent] = useState(false);

const [draft, setDraft] = useState('');
const [vines, setVines] = useState<Vine[]>([]);
const [posting, setPosting] = useState(false);
const [userId, setUserId] = useState<string | null>(null);

/* ---- AUTH: capture user id once ---- */
useEffect(() => {
supabase.auth.getUser().then(({ data }) => {
setUserId(data.user?.id ?? null);
});

const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
setUserId(session?.user?.id ?? null);
});

return () => {
sub?.subscription?.unsubscribe();
};
}, []);

/* ---- DATA ---- */
useEffect(() => {
loadVines();

const channel = supabase
.channel('vines-realtime')
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

if (data) setVines(data as Vine[]);
}

/* ---- ACTIONS ---- */

async function handleJoin() {
const { error } = await supabase.auth.signInWithOtp({
email,
options: { emailRedirectTo: 'https://polidish.com' },
});
if (!error) setSent(true);
}

async function postVine() {
if (!userId) return;

const text = draft.trim();
if (!text) return;

setPosting(true);

// optimistic append (guarantees visibility)
const tempVine: Vine = {
id: crypto.randomUUID(),
content: text,
created_at: new Date().toISOString(),
};

setVines((prev) => [...prev, tempVine]);
setDraft('');

try {
await supabase.from('vines').insert({
content: text,
author_id: userId,
});
} finally {
setPosting(false);
}
}

return (
<main style={{ fontFamily: 'serif' }}>
<header style={{ background: 'black', color: '#d07a3a', padding: 12 }}>
THE VENUE FOR UNCENSORED POLITICAL DISCOURSE. 18+
</header>

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

<div className="signup">
<input
value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="Email for member sign-up"
/>
<button onClick={handleJoin}>Join</button>
</div>

{sent && <div>Magic link sent.</div>}

<div className="scroll">
<textarea
value={draft}
onChange={(e) => setDraft(e.target.value)}
rows={4}
placeholder={userId ? '' : 'Join via magic link to post.'}
/>

<button
onClick={postVine}
disabled={!userId || posting || !draft.trim()}
>
Post
</button>

{vines.length === 0 ? (
<div style={{ fontStyle: 'italic' }}>The lion sleeps tonight.</div>
) : (
vines.map((v) => <div key={v.id}>{v.content}</div>)
)}
</div>
</section>
</section>

<style jsx>{`
.grid {
display: grid;
grid-template-columns: 320px 1fr;
gap: 24px;
padding: 24px;
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
}
.scroll {
border: 1px solid #ddd;
padding: 12px;
overflow-y: auto;
}
.signup {
display: flex;
gap: 8px;
margin: 12px 0;
}
.rule-line {
margin-left: 6px;
}
`}</style>
</main>
);
}

 
