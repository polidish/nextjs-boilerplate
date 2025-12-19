'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from './lib/supabaseClient';

type Vine = {
id: string;
content: string;
created_at: string;
};

export default function Page() {
const [email, setEmail] = useState('');
const [sent, setSent] = useState(false);
const [verified, setVerified] = useState(false);
const [draft, setDraft] = useState('');
const [vines, setVines] = useState<Vine[]>([]);
const [posting, setPosting] = useState(false);

useEffect(() => {
supabase.auth.getSession().then(({ data }) => {
setVerified(!!data.session);
});

const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
setVerified(!!session);
});

loadVines();

return () => {
sub?.subscription.unsubscribe();
};
}, []);

async function loadVines() {
const { data, error } = await supabase
.from('vines')
.select('id, content, created_at')
.order('created_at', { ascending: true });

if (error) {
console.log('LOAD ERROR', error);
return;
}

setVines(data || []);
}

async function handleJoin() {
const { error } = await supabase.auth.signInWithOtp({
email,
options: {
emailRedirectTo: 'https://polidish.com',
},
});

if (!error) setSent(true);
}

async function postVine() {
if (!verified) return;
const text = draft.trim();
if (!text) return;

setPosting(true);

const { data, error } = await supabase
.from('vines')
.insert({ content: text })
.select();

console.log('INSERT RESULT:', { data, error });

if (!error) {
setDraft('');
await loadVines();
}

setPosting(false);
}

return (
<main style={{ fontFamily: 'serif', padding: 24 }}>
<h2>
Politely dishing politics. <em>May the best mind win.</em>
</h2>

<div style={{ margin: '12px 0' }}>
<input
type="email"
placeholder="Email for member sign-up"
value={email}
onChange={(e) => setEmail(e.target.value)}
style={{ padding: 8, marginRight: 8 }}
/>
<button onClick={handleJoin}>Join</button>
</div>

{sent && <div>Magic link sent.</div>}

{verified && (
<div style={{ marginBottom: 8 }}>
<strong>YOU</strong> are verified. Post political discourse here.
</div>
)}

<textarea
value={draft}
onChange={(e) => setDraft(e.target.value)}
rows={4}
placeholder={verified ? '' : 'Join via magic link to post.'}
style={{ width: '100%', padding: 8, marginBottom: 8 }}
/>

<button
onClick={postVine}
disabled={!verified || posting || !draft.trim()}
style={{
cursor:
!verified || posting || !draft.trim()
? 'not-allowed'
: 'pointer',
}}
>
Post
</button>

<hr style={{ margin: '16px 0' }} />

{vines.length === 0 ? (
<em>The lion sleeps tonight.</em>
) : (
vines.map((v) => (
<div key={v.id} style={{ marginBottom: 12 }}>
{v.content}
</div>
))
)}
</main>
);
}





