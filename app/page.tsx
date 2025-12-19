'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from './lib/supabaseClient';
import { useUser } from '@supabase/auth-helpers-react';

const ADS = [
{
src: '/pier.jpeg',
caption: 'Visualize your ad right here, to the left, or in the center.',
duration: 15000,
},
{
src: '/decanter.jpeg',
caption: 'Advertisements are absolutely uncurated for your privacy.',
duration: 30000,
},
{
src: '/peacock.jpeg',
caption:
'Polidish: the Outpost where luxury partners meet High Worth While Individuals (HWWI).',
duration: 60000,
},
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

type Vine = {
id: string;
content: string;
created_at: string;
};

export default function Page() {
const user = useUser();

const [email, setEmail] = useState('');
const [sent, setSent] = useState(false);

// Keep this for messaging only (NOT for gating writes).
const [verified, setVerified] = useState(false);

const [draft, setDraft] = useState('');
const [vines, setVines] = useState<Vine[]>([]);
const [posting, setPosting] = useState(false);

useEffect(() => {
// Set initial verification state
supabase.auth.getSession().then(({ data }) => {
setVerified(!!data.session);
});

// Keep verification state current (does NOT gate textarea visibility)
const { data: authSub } = supabase.auth.onAuthStateChange((_event, session) => {
setVerified(!!session);
});

// Load existing vines
loadVines();

// Realtime updates for new posts
const channel = supabase
.channel('vines-realtime')
.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'vines' }, () => {
loadVines();
})
.subscribe();

return () => {
authSub?.subscription?.unsubscribe();
supabase.removeChannel(channel);
};
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

async function loadVines() {
const { data } = await supabase
.from('vines')
.select('id, content, created_at')
.order('created_at', { ascending: true });

if (data) setVines(data as Vine[]);
}

const handleJoin = async () => {
const { error } = await supabase.auth.signInWithOtp({
email,
options: {
emailRedirectTo: 'https://polidish.com',
},
});

if (!error) setSent(true);
};

async function postVine() {
// Gate on stable user id (NOT on session/verified)
if (!user?.id) return;

const text = draft.trim();
if (!text) return;

setPosting(true);
try {
const { error } = await supabase.from('vines').insert({
content: text,
author_id: user.id,
});

if (error) {
// Keep UI usable even on error (no hard lock)
console.error('Insert error:', error);
return;
}

setDraft('');
await loadVines();
} finally {
setPosting(false);
}
}

return (
<main style={{ fontFamily: 'serif' }}>
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
<Image
src="/_logo polidish.png"
alt="Polidish"
width={96}
height={96}
style={{ width: 48, height: 48 }}
priority
/>

<div
style={{
color: '#d07a3a',
fontSize: 'clamp(14px, 1.6vw, 20px)',
letterSpacing: '0.05em',
textTransform: 'uppercase',
fontWeight: 600,
}}
>
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
<input
type="email"
placeholder="Email for member sign-up"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
<button
onClick={handleJoin}
style={{
background: sent ? 'gold' : 'black',
color: sent ? 'black' : 'white',
border: '2px solid black',
padding: '8px 12px',
fontWeight: 600,
}}
>
Join
</button>
</div>

{sent && <div style={{ marginTop: 6 }}>An email has been sent with a magic link.</div>}

<p>Freedom is deliberate. Welcome to the Jungle Thread.</p>

<div className="divider">Jungle posting for verified members is coming soon.</div>

{/* JUNGLE THREAD BOX */}
<div className="scroll">
{/* Verified message: ONLY visible to verified members */}
{verified && (
<div style={{ marginBottom: 10 }}>
<strong>YOU</strong> are verified. Post political discourse here.
</div>
)}

{/* Write box: ALWAYS visible (not gated/hidden) */}
<textarea
value={draft}
onChange={(e) => setDraft(e.target.value)}
rows={4}
placeholder={user?.id ? '' : 'Join via magic link to post.'}
style={{
width: '100%',
border: '1px solid #000',
padding: 10,
resize: 'vertical',
font: 'inherit',
marginBottom: 10,
}}
/>

<button
onClick={postVine}
disabled={!user?.id || posting || !draft.trim()}
style={{
background: 'transparent',
color: 'black',
border: '2px solid black',
padding: '8px 12px',
fontWeight: 600,
marginBottom: 14,
cursor: !user?.id || posting || !draft.trim() ? 'not-allowed' : 'pointer',
}}
>
Post
</button>

{/* Thread */}
{vines.length === 0 ? (
<div style={{ fontStyle: 'italic' }}>The lion sleeps tonight.</div>
) : (
vines.map((v) => (
<div key={v.id} style={{ marginBottom: 12 }}>
{v.content}


