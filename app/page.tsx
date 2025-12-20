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

// single source of truth for auth
const [session, setSession] = useState<any>(null);

const [draft, setDraft] = useState('');
const [vines, setVines] = useState<Vine[]>([]);
const [posting, setPosting] = useState(false);

// visible truth (no guessing)
const [status, setStatus] = useState<string>('');

/* ---------- AUTH STATE ---------- */

useEffect(() => {
let mounted = true;

(async () => {
// 1) Try to sync/refresh first (helps after magic-link redirect)
await supabase.auth.refreshSession();

// 2) Then read session
const { data } = await supabase.auth.getSession();
if (mounted) setSession(data.session);

// 3) Load vines
await loadVines();
})();

const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
setSession(session);
if (session) setStatus('Verified session detected.');
});

return () => {
mounted = false;
sub?.subscription.unsubscribe();
};
}, []);

const verified = !!session;
const hasText = !!draft.trim();
const canPost = verified && hasText && !posting;

/* ---------- LOAD VINES ---------- */

async function loadVines() {
const { data, error } = await supabase
.from('vines')
.select('id, content, created_at')
.order('created_at', { ascending: true });

if (error) {
console.error('SELECT ERROR:', error);
setStatus(`SELECT ERROR: ${error.message}`);
return;
}

setVines(data || []);
}

/* ---------- JOIN ---------- */

async function handleJoin() {
setStatus('');

const { error } = await supabase.auth.signInWithOtp({
email,
options: { emailRedirectTo: 'https://polidish.com' },
});

if (error) {
console.error('JOIN ERROR:', error);
setStatus(`JOIN ERROR: ${error.message}`);
return;
}

setSent(true);
setStatus('Magic link sent.');
}

/* ---------- POST ---------- */

async function postVine() {
setStatus('');

if (!session) {
setStatus('Not verified yet (no session).');
return;
}

const text = draft.trim();
if (!text) {
setStatus('Type something first.');
return;
}

setPosting(true);

const { error } = await supabase.from('vines').insert({
content: text,
author_id: session.user.id,
});

if (error) {
console.error('INSERT ERROR:', error);
setStatus(`INSERT ERROR: ${error.message}`);
setPosting(false);
return;
}

setDraft('');
await loadVines();
setPosting(false);
setStatus('Posted.');
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

{!verified && (
<div style={{ margin: '12px 0' }}>
<strong>Sign in required to post.</strong>
</div>
)}

{status && (
<div style={{ margin: '12px 0', border: '1px solid #000', padding: 8 }}>
{status}
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
disabled={!canPost}
style={{
border: '2px solid black',
padding: '8px 12px',
fontWeight: 600,
cursor: canPost ? 'pointer' : 'not-allowed',
opacity: canPost ? 1 : 0.6,
}}
>
{posting ? 'Posting…' : 'Post'}
</button>

<hr style={{ margin: '16px 0' }} />

<div style={{ marginBottom: 12 }}>
<em>It’s Polidish time somewhere.</em>
</div>

{vines.map((v) => (
<div key={v.id} style={{ marginBottom: 12 }}>
{v.content}
</div>
))}
</main>
);
}


