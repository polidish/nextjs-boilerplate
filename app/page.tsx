'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { createClient, type User } from '@supabase/supabase-js';

// -----------------------------
// Supabase client (in-file, no extra files)
// Requires env vars:
// NEXT_PUBLIC_SUPABASE_URL
// NEXT_PUBLIC_SUPABASE_ANON_KEY
// -----------------------------
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase =
supabaseUrl && supabaseAnonKey
? createClient(supabaseUrl, supabaseAnonKey)
: null;

// -----------------------------
// Assumed table + columns
// Table: public.vines
// Columns used: id, created_at, author_id, content
// -----------------------------
type Vine = {
id: string;
created_at: string;
author_id: string | null;
content: string;
};

const BURNT_ORANGE = '#CC5500'; // restrained burnt orange

export default function HomePage() {
const [user, setUser] = useState<User | null>(null);
const [vines, setVines] = useState<Vine[]>([]);
const [draft, setDraft] = useState<string>('');
const [loading, setLoading] = useState<boolean>(true);
const [posting, setPosting] = useState<boolean>(false);
const [error, setError] = useState<string>('');

const newestVineId = useMemo(() => {
if (vines.length === 0) return null;
return vines[vines.length - 1]?.id ?? null; // bottom-down chronology
}, [vines]);

const lastVineAuthorId = useMemo(() => {
if (vines.length === 0) return null;
return vines[vines.length - 1]?.author_id ?? null;
}, [vines]);

const canPost = useMemo(() => {
if (!user) return false;
if (!draft.trim()) return false;
// One-pass / turn-taking: no consecutive vines by same author
if (lastVineAuthorId && lastVineAuthorId === user.id) return false;
return true;
}, [user, draft, lastVineAuthorId]);

async function loadAuthAndVines() {
setError('');
setLoading(true);

try {
if (!supabase) {
setError('Supabase env vars missing: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.');
setLoading(false);
return;
}

const { data: userRes } = await supabase.auth.getUser();
setUser(userRes?.user ?? null);

const { data, error: vinesErr } = await supabase
.from('vines')
.select('id, created_at, author_id, content')
.order('created_at', { ascending: true });

if (vinesErr) throw vinesErr;

setVines((data as Vine[]) ?? []);
} catch (e: any) {
setError(e?.message || 'Unknown error loading vines.');
} finally {
setLoading(false);
}
}

useEffect(() => {
// Initial load
loadAuthAndVines();

if (!supabase) return;

// Keep auth state updated
const { data: authSub } = supabase.auth.onAuthStateChange((_event, session) => {
setUser(session?.user ?? null);
});

// Realtime subscription for new vines + deletes
const channel = supabase
.channel('vines-realtime')
.on(
'postgres_changes',
{ event: 'INSERT', schema: 'public', table: 'vines' },
async () => {
// reload list to preserve strict ordering and newest styling
await loadAuthAndVines();
}
)
.on(
'postgres_changes',
{ event: 'DELETE', schema: 'public', table: 'vines' },
async () => {
await loadAuthAndVines();
}
)
.subscribe();

return () => {
authSub?.subscription?.unsubscribe();
supabase.removeChannel(channel);
};
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

async function postVine() {
if (!supabase) return;
if (!user) {
setError('You must be signed in to post.');
return;
}
if (!canPost) return;

setPosting(true);
setError('');

try {
const content = draft.trim();

const { error: insErr } = await supabase.from('vines').insert([
{
content,
author_id: user.id,
},
]);

if (insErr) throw insErr;

setDraft('');
// Realtime should refresh; also safe to reload now.
await loadAuthAndVines();
} catch (e: any) {
setError(e?.message || 'Post failed.');
} finally {
setPosting(false);
}
}

async function deleteVine(vineId: string) {
if (!supabase) return;
if (!user) return;

setError('');

try {
const { error: delErr } = await supabase
.from('vines')
.delete()
.eq('id', vineId)
.eq('author_id', user.id);

if (delErr) throw delErr;

await loadAuthAndVines();
} catch (e: any) {
setError(e?.message || 'Delete failed.');
}
}

return (
<main style={{ padding: '16px', maxWidth: 980, margin: '0 auto' }}>
{/* Minimal status (no ceremony) */}
{error ? (
<div style={{ marginBottom: 12, padding: 10, border: '1px solid #000', color: '#000' }}>
{error}
</div>
) : null}

{/* Jungle container (thin inner box extends to bottom by design) */}
<section
style={{
border: '1px solid #000',
padding: 12,
minHeight: 520,
display: 'flex',
flexDirection: 'column',
gap: 12,
}}
>
{/* Compose area */}
<div
style={{
border: '1px solid #000',
padding: 10,
}}
>
<div style={{ marginBottom: 8 }}>
{/* Instructional copy only; no rules, no ceremony */}
Member opinions will appear here.
</div>

<textarea
value={draft}
onChange={(e) => setDraft(e.target.value)}
placeholder="Members who clicked the magic link compose here."
rows={4}
style={{
width: '100%',
border: '1px solid #000',
padding: 10,
resize: 'vertical',
font: 'inherit',
color: '#000',
}}
disabled={!user || posting}
/>

<div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
<button
onClick={postVine}
disabled={!canPost || posting}
style={{
border: '1px solid #000',
padding: '8px 12px',
background: 'transparent',
cursor: canPost && !posting ? 'pointer' : 'not-allowed',
}}
>
{posting ? 'Posting…' : 'Post vine'}
</button>

{!user ? (
<span style={{ color: '#000' }}>Sign in required to post.</span>
) : lastVineAuthorId === user.id ? (
<span style={{ color: '#000' }}>Turn-taking: wait for another member to post.</span>
) : null}
</div>
</div>

{/* Thread area (oldest -> newest; newest at bottom, in burnt orange) */}
<div
style={{
border: '1px solid #000',
padding: 10,
flex: 1,
overflow: 'auto',
}}
>
{loading ? (
<div>Loading…</div>
) : vines.length === 0 ? (
<div>The lion sleeps tonight.</div>
) : (
<ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
{vines.map((v) => {
const isNewest = newestVineId === v.id;
const isAuthor = user && v.author_id === user.id;

return (
<li key={v.id} style={{ borderBottom: '1px solid #000', paddingBottom: 10 }}>
<div style={{ whiteSpace: 'pre-wrap', color: isNewest ? BURNT_ORANGE : '#000' }}>
{v.content}
</div>

<div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
<span style={{ fontSize: 12, color: '#000' }}>
{new Date(v.created_at).toLocaleString()}
</span>

{/* Author-only delete; no edits */}
{isAuthor ? (
<button
onClick={() => deleteVine(v.id)}
style={{
border: '1px solid #000',
padding: '4px 8px',
background: 'transparent',
cursor: 'pointer',
fontSize: 12,
}}
>
Delete
</button>
) : null}
</div>
</li>
);
})}
</ul>
)}
</div>
</section>
</main>
);
}


