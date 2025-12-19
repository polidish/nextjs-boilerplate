'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from './lib/supabaseClient';

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
<div style={{ border: '3px solid black', padding: 8 }}>
<Image src={ADS[index].src} alt="Ad" width={600} height={900} />
<div style={{ color: 'gold', fontStyle: 'italic' }}>{ADS[index].caption}</div>
</div>
);
}

type Vine = { id: string; content: string; created_at: string };

export default function Page() {
const [email, setEmail] = useState('');
const [sent, setSent] = useState(false);
const [draft, setDraft] = useState('');
const [vines, setVines] = useState<Vine[]>([]);
const [posting, setPosting] = useState(false);
const [userId, setUserId] = useState<string | null>(null);

useEffect(() => {
supabase.auth.getUser().then(({ data }) => {
setUserId(data.user?.id ?? null);
});

const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
setUserId(session?.user?.id ?? null);
});

loadVines();

const channel = supabase
.channel('vines')
.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'vines' }, loadVines)
.subscribe();

return () => {
sub?.subscription?.unsubscribe();
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
try {
await supabase.from('vines').insert({
content: text,
author_id: userId,
});
setDraft('');
await loadVines();
} finally {
setPosting(false);
}
}

return (
<main>
<header style={{ background: 'black', color: '#d07a3a', padding: 12 }}>
THE VENUE FOR UNCENSORED POLITICAL DISCOURSE. 18+
</header>

<section style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24 }}>
<aside>
<AdFrame startIndex={0} />
<AdFrame startIndex={1} />
<AdFrame startIndex={2} />
</aside>

<section style={{ border: '3px solid black', padding: 24 }}>
<h2>Politely dishing politics. May the best mind win.</h2>

<input
value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="Email for member sign-up"
/>
<button onClick={handleJoin}>Join</button>
{sent && <div>Magic link sent.</div>}

<textarea
value={draft}
onChange={(e) => setDraft(e.target.value)}
placeholder={userId ? '' : 'Join via magic link to post'}
/>

<button onClick={postVine} disabled={!userId || posting || !draft.trim()}>
Post
</button>

{vines.length === 0 ? (
<div>The lion sleeps tonight.</div>
) : (
vines.map((v) => <div key={v.id}>{v.content}</div>)
)}
</section>
</section>
</main>
);
}
