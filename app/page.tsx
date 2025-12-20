'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from './lib/supabaseClient';

/*
POLIDISH_PAGE_v1.1_FULL_ADD_ONLY_JUNGLE
Baseline preserved + Jungle enabled
Additive only. No takeaways.

Expected render:
- Black header with orange venue line
- 3 rotating ads with gold captions
- Store + Blog links under third ad
- Jungle bordered, scrollable, contained
- Footer visible
- Verified authors can post at bottom
*/

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
const [email, setEmail] = useState('');
const [sent, setSent] = useState(false);
const [verified, setVerified] = useState(false);

const [vines, setVines] = useState<Vine[]>([]);
const [draft, setDraft] = useState('');
const [posting, setPosting] = useState(false);
const [status, setStatus] = useState('');
const [showVerified, setShowVerified] = useState(false);

useEffect(() => {
let mounted = true;

(async () => {
await supabase.auth.refreshSession();
const { data } = await supabase.auth.getSession();
if (!mounted) return;

const isVerified = !!data.session;
setVerified(isVerified);

if (isVerified) {
setShowVerified(true);
setTimeout(() => setShowVerified(false), 3000);
}

loadVines();
})();

const { data: authSub } = supabase.auth.onAuthStateChange((_e, session) => {
const isVerified = !!session;
setVerified(isVerified);

if (isVerified) {
setShowVerified(true);
setTimeout(() => setShowVerified(false), 3000);
}
});

const channel = supabase
.channel('vines')
.on(
'postgres_changes',
{ event: 'INSERT', schema: 'public', table: 'vines' },
() => loadVines()
)
.subscribe();

return () => {
mounted = false;
authSub?.subscription?.unsubscribe();
supabase.removeChannel(channel);
};
}, []);

async function loadVines() {
const { data, error } = await supabase
.from('vines')
.select('id, content, created_at')
.order('created_at', { ascending: true });

if (error) {
setStatus(`READ ERROR: ${error.message}`);
return;
}

setVines(data || []);
}

async function postVine() {
setStatus('');
if (!verified) return;

const text = draft.trim();
if (!text) return;

setPosting(true);

const {
data: { user },
error: userError,
} = await supabase.auth.getUser();

if (userError || !user) {
setStatus('AUTH ERROR');
setPosting(false);
return;
}

const { error } = await supabase.from('vines').insert({
content: text,
author_id: user.id,
});

if (error) {
setStatus(`POST ERROR: ${error.message}`);
setPosting(false);
return;
}

setDraft('');
setStatus('Posted.');
loadVines();
setPosting(false);
}

async function handleJoin() {
setStatus('');
const { error } = await supabase.auth.signInWithOtp({
email,
options: { emailRedirectTo: 'https://polidish.com' },
});

if (error) {
setStatus(`JOIN ERROR: ${error.message}`);
return;
}

setSent(true);
}

return (
<main style={{ fontFamily: 'serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
{/* HEADER */}
<header style={{ background: 'black', padding: '12px 24px', display: 'flex', justifyContent: 'space-between' }}>
<Image src="/_logo polidish.png" alt="Polidish" width={48} height={48} />
<div style={{ color: '#d07a3a', fontWeight: 600 }}>
THE VENUE FOR UNCENSORED POLITICAL DISCOURSE. 18+
</div>
</header>

{/* BODY */}
<section className="grid">
<aside className="ads">
<AdFrame startIndex={0} />
<AdFrame startIndex={1} />
<AdFrame startIndex={2} />

{/* Store / Blog links */}
<div style={{ marginTop: 12, fontSize: 14 }}>
<div><a href="/store">Store</a></div>
<div><a href="/blog">Blog</a></div>
</div>
</aside>

<section className="jungle">
<h2>
Politely dishing politics.
<span className="rule-line">May the best mind win.</span>
</h2>

{/* Sign up */}
<div className="signup">
<input
type="email"
placeholder="Email for member sign-up"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
<button onClick={handleJoin}>Join</button>
</div>

{sent && <div>Magic link sent.</div>}
{showVerified && <div
