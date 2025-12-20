'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from './lib/supabaseClient';

/* ---------------- ADS ---------------- */

const ADS = [
{
src: '/pier.jpeg',
caption: 'Visualize your ad copy right here, to the left, or in the center.',
duration: 15000,
},
{
src: '/decanter.jpeg',
caption: 'Advertisements are uncurated for your continued privacy.',
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
fontWeight: 700,
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

/* ---------------- TYPES ---------------- */

type Vine = {
id: string;
content: string | null;
created_at: string;
author_display: string;
};

/* ---------------- PAGE ---------------- */

export default function Page() {
const [email, setEmail] = useState('');
const [sent, setSent] = useState(false);
const [session, setSession] = useState<any>(null);

const [draft, setDraft] = useState('');
const [vines, setVines] = useState<Vine[]>([]);
const [posting, setPosting] = useState(false);

const verified = !!session;

/* ---------------- AUTH ---------------- */

useEffect(() => {
supabase.auth.getSession().then(({ data }) => {
setSession(data.session);
});

const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
setSession(s);
});

loadVines();

return () => {
listener.subscription.unsubscribe();
};
}, []);

/* ---------------- DATA ---------------- */

async function loadVines() {
const { data } = await supabase
.from('vines')
.select('id, content, created_at, author_display')
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
if (!verified || !draft.trim()) return;

setPosting(true);

const display =
session.user.email?.slice(0, 5).toLowerCase() + '••';

await supabase.from('vines').insert({
content: draft.trim(),
author_display: display,
author_id: session.user.id,
});

setDraft('');
setPosting(false);
loadVines();
}

/* ---------------- RENDER ---------------- */

return (
<main style={{ fontFamily: 'serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

<header style={{ background: 'black', padding: '12px 24px', display: 'flex', justifyContent: 'space-between' }}>
<Image src="/_logo polidish.png" alt="Polidish" width={48} height={48} />
<div style={{ color: '#d07a3a', fontWeight: 700 }}>
Join Now-Posting Coming Soon THE VENUE FOR UNCENSORED POLITICAL DISCOURSE. 18+
</div>
</header>

<section className="grid">
<aside className="ads">
<AdFrame startIndex={0} />
<AdFrame startIndex={1} />
<AdFrame startIndex={2} />
<div className="outpost-links">
<a href="/blog">BLOG</a>
<a href="/store">STORE</a>
</div>
</aside>

<section className="jungle">
<h2>
<strong>Politely dishing politics.</strong>{' '}
<em><strong>May the best mind win.</strong></em>
</h2>

<div className="signup">
<input
type="email"
placeholder="Please enter email for member sign-up"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
<button onClick={handleJoin}>Join</button>
</div>

{sent && <div>Magic link sent.</div>}

<div className="jungle-rules">
{verified ? (
<>
<strong>
You are now an official verified vine author and will be displayed publicly as…
</strong>
<div>Published vines cannot be edited. You may delete your authored vine at any time.</div>
<div><em>deleted</em> means deleted.</div>
<div><strong>Add your vine below.</strong></div>
</>
) : (
<strong>Sign in required to post.</strong>
)}
</div>

<div className="scroll">
{verified && (
<>
<textarea
value={draft}
onChange={(e) => setDraft(e.target.value)}
rows={3}
style={{ width: '100%', marginBottom: 12 }}
/>
<button onClick={postVine} disabled={posting}>Post</button>
</>
)}

<div className="jungle-marker">
<em>The Jungle vines keep growing and growing.</em>
</div>

{vines.map((v) => (
<div key={v.id} className="vine">
<div className="author">{v.author_display}</div>
<div className="content">{v.content ?? 'deleted'}</div>
</div>
))}
</div>

<p className="age">
18+ only. By visiting or joining Polidish, you affirm that you are at least 18 years of age, Voting age.
</p>
</section>
</section>

<footer className="footer">
<div>
Polidish LLC is not legally responsible for your poor judgment.
If you endanger children, threaten terrorism, or break the law, you reveal yourself.
Two-factor Authentication. It’s a troll-free freedom fest.
</div>
<div>© 2025 Polidish LLC. All rights reserved. — 127 Minds Day One</div>
</footer>

</main>
);
}
