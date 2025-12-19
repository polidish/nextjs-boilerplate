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
const [draft, setDraft] = useState('');
const [vines, setVines] = useState<Vine[]>([]);
const [posting, setPosting] = useState(false);

useEffect(() => {
loadVines();

const channel = supabase
.channel('vines-realtime')
.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'vines' }, () => {
loadVines();
})
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

const handleJoin = async () => {
const { error } = await supabase.auth.signInWithOtp({
email,
options: { emailRedirectTo: 'https://polidish.com' },
});

if (!error) setSent(true);
};

async function postVine() {
if (!user?.id) return;

const text = draft.trim();
if (!text) return;

setPosting(true);
try {
await supabase.from('vines').insert({
content: text,
author_id: user.id,
});

setDraft('');
await loadVines();
} finally {
setPosting(false);
}
}

return (
<main style={{ fontFamily: 'serif' }}>
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
type="email"
placeholder="Email for member sign-up"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
<button onClick={handleJoin}>Join</button>
</div>

{sent && <div>An email has been sent with a magic link.</div>}

<p>Freedom is deliberate. Welcome to the Jungle Thread.</p>

<div className="scroll">
<textarea
value={draft}
onChange={(e) => setDraft(e.target.value)}
rows={4}
placeholder={user?.id ? '' : 'Join via magic link to post.'}
/>

<button
onClick={postVine}
disabled={!user?.id || posting || !draft.trim()}
>
Post
</button>

{vines.length === 0 ? (
<div>The lion sleeps tonight.</div>
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
textarea {
width: 100%;
margin-bottom: 10px;
}
`}</style>
</main>
);
}
