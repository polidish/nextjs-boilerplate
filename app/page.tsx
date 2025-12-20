'use client';

import { useEffect, useMemo, useState } from 'react';
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

// Single source of truth for auth state
const [session, setSession] = useState<any>(null);

const [draft, setDraft] = useState('');
const [vines, setVines] = useState<Vine[]>([]);
const [posting, setPosting] = useState(false);

// Visible truth box (so we stop guessing)
const [status, setStatus] = useState<string>('');

const verified = !!session;
const hasText = !!draft.trim();
const canPost = verified && hasText && !posting;

/* -------------------- BOOTSTRAP AUTH + LOAD -------------------- */

useEffect(() => {
let mounted = true;

const sync = async () => {
setStatus('');

// 1) Let Supabase parse the magic-link redirect (if present)
// (Some redirects land with hash params; this helps session show up.)
try {
await supabase.auth.refreshSession();
} catch {
// ignore; refreshSession may fail if there is nothing to refresh
}

// 2) Read session
const { data, error } = await supabase.auth.getSession();
if (!mounted) return;

if (error) setStatus(`SESSION ERROR: ${error.message}`);
setSession(data.session);

// 3) Load vines for everyone (public read)
await loadVines();
};

sync();

// 4) Listen for auth changes (this is the real-time “YOU are verified” truth)
const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
setSession(nextSession);
if (nextSession) setStatus('Verified session detected.');
});

return () => {
mounted = false;
sub?.subscription.unsubscribe();
};
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

/* -------------------- DATA: LOAD VINES -------------------- */

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

/* -------------------- AUTH: JOIN -------------------- */

async function handleJoin() {
setStatus('');
setSent(false);

const cleanEmail = email.trim();
if (!cleanEmail) {
setStatus('Enter your email first.');
return;
}

// Use the current origin so it works on Vercel preview URLs AND prod.
const redirectTo =
typeof window !== 'undefined' ? window.location.origin : 'https://polidish.com';

const { error } = await supabase.auth.signInWithOtp({
email: cleanEmail,
options: { emailRedirectTo: redirectTo },
});

if (error) {
console.error('JOIN ERROR:', error);
// Common: 429 Too Many Requests, otp_expired, etc.
setStatus(`JOIN ERROR: ${error.message}`);
return;
}

setSent(true);
setStatus('Magic link sent. Open the newest email and click the link once.');
}

/* -------------------- WRITE: POST VINE -------------------- */

async function postVine() {
setStatus('');

if (!session) {
setStatus('Sign in required to post.');
return;
}

const text = draft.trim();
if (!text) {
setStatus('Type something first.');
return;
}

setPosting(true);

// IMPORTANT:
// Your RLS is designed around author_id = auth.uid()
// So we write ONLY author_id (not user_id).
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

/* -------------------- UI COPY (YOUR BRAND VOICE) -------------------- */

const emptyLine = useMemo(() => {
// No lion. Ever.
return `The Jungle Thread keeps growing and growing. Growing and growing.`;
}, []);

/* -------------------- RENDER -------------------- */

return (
<main style={styles.page}>
{/* Top bar */}
<header style={styles.topBar}>
<div style={styles.brandBox}>
<div style={styles.brandMark} aria-hidden />
<div style={styles.brandText}>Polidish</div>
</div>
</header>

{/* Layout wrapper */}
<div style={styles.shell}>
{/* Left ads column */}
<aside style={styles.adsCol} aria-label="Advertisements">
<AdCard
src="/pier.jpeg"
fallbackText="Pier ad placeholder"
caption="Visualize your ad right here — to the left, or in the center."
/>
<AdCard
src="/decanter.jpeg"
fallbackText="Decanter ad placeholder"
caption="Luxury brands belong where readers think."
/>
<AdCard
src="/peacock.jpeg"
fallbackText="Peacock ad placeholder"
caption="Polidish is text-first. Ideas are the asset."
/>
</aside>

{/* Jungle thread column */}
<section style={styles.jungleCol} aria-label="Jungle Thread">
<h1 style={styles.h1}>
Politely dishing politics. <em>May the best mind win.</em>
</h1>

{/* Join row */}
<div style={styles.joinRow}>
<input
type="email"
placeholder="Email for member sign-up"
value={email}
onChange={(e) => setEmail(e.target.value)}
style={styles.joinInput}
autoComplete="email"
/>
<button onClick={handleJoin} style={styles.joinBtn}>
Join
</button>
</div>

{/* Proof + status */}
<div style={styles.truthRow}>
{verified ? (
<div style={styles.truthOk}>
<strong>YOU</strong> are verified.
</div>
) : (
<div style={styles.truthWarn}>
<strong>Sign in required to post.</strong>
</div>
)}

{sent && <div style={styles.subtle}>Magic link sent.</div>}
</div>

{status && <div style={styles.statusBox}>{status}</div>}

{/* Jungle intro */}
<div style={styles.jungleIntro}>
<div style={styles.introLine}>
Freedom is deliberate. Welcome to the Jungle Thread.
</div>
<div style={styles.introDivider}>{emptyLine}</div>
</div>

{/* Post composer */}
<div style={styles.composer}>
<textarea
value={draft}
onChange={(e) => setDraft(e.target.value)}
rows={4}
placeholder={verified ? '' : 'Join via magic link to post.'}
style={styles.textarea}
/>
<button
onClick={postVine}
disabled={!canPost}
style={{
...styles.postBtn,
opacity: canPost ? 1 : 0.55,
cursor: canPost ? 'pointer' : 'not-allowed',
}}
>
{posting ? 'Posting…' : 'Post'}
</button>
</div>

{/* Feed */}
<div style={styles.feed}>
{vines.length === 0 ? (
<div style={styles.emptyFeed}>
<em>It’s Polidish time somewhere.</em>
</div>
) : (
vines.map((v) => (
<div key={v.id} style={styles.vineCard}>
<div style={styles.vineText}>{v.content}</div>
</div>
))
)}
</div>

{/* Footer note */}
<footer style={styles.footer}>
Polidish is public viewing. By using this venue, you affirm you are at least 18 years of
age.
</footer>
</section>
</div>
</main>
);
}

/* -------------------- AD CARD -------------------- */

function AdCard({
src,
caption,
fallbackText,
}: {
src: string;
caption: string;
fallbackText: string;
}) {
// Next/Image will error if the asset isn’t present.
// So we render a stable frame + caption regardless.
return (
<div style={styles.adCard}>
<div style={styles.adFrame}>
<div style={styles.adImageWrap}>
<Image
src={src}
alt={fallbackText}
fill
sizes="(max-width: 900px) 100vw, 320px"
style={{ objectFit: 'cover' }}
priority={false}
/>
</div>
</div>
<div style={styles.adCaption}>{caption}</div>
</div>
);
}

/* -------------------- STYLES (MOBILE-SAFE, NO BLEED) -------------------- */

const styles: Record<string, React.CSSProperties> = {
page: {
minHeight: '100vh',
background: '#ffffff',
color: '#000',
fontFamily: 'serif',
},

topBar: {
background: '#000',
color: '#fff',
padding: '12px 16px',
},
brandBox: {
display: 'flex',
alignItems: 'center',
gap: 10,
maxWidth: 1200,
margin: '0 auto',
},
brandMark: {
width: 16,
height: 16,
background: '#d08a00',
border: '1px solid #000',
},
brandText: {
fontWeight: 700,
letterSpacing: 0.5,
},

shell: {
maxWidth: 1200,
margin: '0 auto',
padding: 16,

// Desktop: 2 columns (ads + jungle)
display: 'grid',
gridTemplateColumns: '340px minmax(0, 1fr)',
gap: 16,
},

adsCol: {
display: 'flex',
flexDirection: 'column',
gap: 16,
},

jungleCol: {
minWidth: 0, // CRITICAL: prevents horizontal overflow / “bleed”
border: '2px solid #000',
padding: 16,
},

h1: {
margin: 0,
marginBottom: 12,
fontSize: 32,
lineHeight: 1.15,
},

joinRow: {
display: 'flex',
gap: 10,
alignItems: 'center',
flexWrap: 'wrap',
marginBottom: 10,
},
joinInput: {
flex: '1 1 260px',
padding: 10,
border: '1px solid #000',
fontSize: 16,
minWidth: 220,
},
joinBtn: {
padding: '10px 14px',
border: '2px solid #000',
background: '#fff',
fontWeight: 700,
},

truthRow: {
display: 'flex',
gap: 12,
alignItems: 'center',
flexWrap: 'wrap',
marginBottom: 12,
},
truthOk: {
padding: '6px 10px',
border: '1px solid #000',
background: '#fff',
},
truthWarn: {
padding: '6px 10px',
border: '1px solid #000',
background: '#fff',
},
subtle: {
opacity: 0.85,
},

statusBox: {
border: '1px solid #000',
padding: 10,
marginBottom: 12,
whiteSpace: 'pre-wrap',
},

jungleIntro: {
borderTop: '1px solid #000',
borderBottom: '1px solid #000',
padding: '10px 0',
marginBottom: 12,
},
introLine: {
marginBottom: 8,
fontSize: 18,
},
introDivider: {
fontSize: 16,
},

composer: {
border: '1px solid #000',
padding: 12,
marginBottom: 12,
},
textarea: {
width: '100%',
padding: 10,
border: '1px solid #000',
resize: 'vertical',
fontSize: 16,
boxSizing: 'border-box',
marginBottom: 10,
},
postBtn: {
border: '2px solid #000',
padding: '10px 14px',
fontWeight: 700,
background: '#fff',
},

feed: {
display: 'flex',
flexDirection: 'column',
gap: 10,
minWidth: 0,
},
emptyFeed: {
padding: 10,
border: '1px solid #000',
},
vineCard: {
border: '1px solid #000',
padding: 10,
minWidth: 0,
overflowWrap: 'anywhere',
wordBreak: 'break-word',
},
vineText: {
fontSize: 16,
lineHeight: 1.35,
},

footer: {
marginTop: 14,
fontSize: 12,
opacity: 0.85,
},

adCard: {
border: '2px solid #000',
padding: 10,
background: '#fff',
},
adFrame: {
border: '1px solid #000',
padding: 6,
background: '#fff',
},
adImageWrap: {
position: 'relative',
width: '100%',
height: 220,
overflow: 'hidden',
},
adCaption: {
marginTop: 10,
fontSize: 13,
lineHeight: 1.25,
},
};

/*
MOBILE BEHAVIOR NOTE:
Next.js inline styles can’t do media queries.
BUT the no-bleed is already fixed (minWidth:0 and grid minmax(0,1fr)).

If you already have global CSS, you can add:

@media (max-width: 900px) {
.shell { grid-template-columns: 1fr; }
}

For now: this will still render safely on phones without bleeding right.
*/




