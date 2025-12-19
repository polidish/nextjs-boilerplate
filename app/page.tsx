'use client';

import { useEffect, useState } from 'react';
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

/* ---------- AUTH STATE ---------- */

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

/* ---------- LOAD VINES ---------- */

async function loadVines() {
const { data, error } = await supabase
.from('vines')
.select('id, content, created_at')
.order('created_at', { ascending: true });

if (error) {
console.error('SELECT ERROR:', error);
return;
}

setVines(data || []);
}

/* ---------- JOIN ---------- */

async function handleJoin() {
const { error } = await supabase.auth.signInWithOtp({
email,
options: { emailRedirectTo: 'https://polidish.com' },
});

if (!error) setSent(true);
}

/* ---------- POST ---------- */

async function postVine() {
if (!verified) return;

const text = draft.trim();
if (!text) return;

setPosting(true);

const {
data: { user },
error: userError,
} = await supabase.auth.getUser();

if (userError || !user) {
console.error('AUTH ERROR:', userError);
setPosting(false);
return;
}

const { error } = await supabase.from('vines').insert({
content: text,
author_id: user.id,
});

if (error) {
console.error('INSERT ERROR:', error);
setPosting(false);
return;
}

setDraft('');
await loadVines();
setPosting(false);
}

/* ---------- RENDER ---------- */

return (
<main style={{ fontFamily: 'serif', padding: 24, maxWidth: 720 }}>
<h2>
Politely dishing politics. <em>May the best mind win.</em>
</h2>

<div style={{ margin: '12px 0' }}>
<input
type="email"
placeholder="Email for member sign-up"
value={email}
onChange={(e) => setEmail(e.target.value)}
style={{ padding: 8, marginRight: 8, width: '60%' }}
/>
<button onClick={handleJoin}>Join</button>
</div>

{sent && <div>Magic link sent.</div>}

{verified && (
<div style={{ margin: '12px 0' }}>
<strong>YOU</strong> are verified. Post political discourse here.
</div>
)}

<textarea
value={draft}
onChange={(e) => setDraft(e.target.value)}
rows={4}
placeholder={verified ? '' : 'Join via magic link to post.'}
style={{ width: '100%', padding: 10, marginBottom: 8 }}
/>

<button
onClick={postVine}
disabled={!verified || posting || !draft.trim()}
style={{
border: '2px solid black',
padding: '8px 12px',
fontWeight: 600,
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
