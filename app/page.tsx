'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from './lib/supabaseClient';

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

export default function Page() {
const [email, setEmail] = useState('');
const [draft, setDraft] = useState('');
const [sent, setSent] = useState(false);
const [sending, setSending] = useState(false);
const [confetti, setConfetti] = useState(false);

useEffect(() => {
supabase.auth.getSession();
}, []);

const handleJoin = async () => {
setSending(true);
setSent(true);
setConfetti(true);
setTimeout(() => setConfetti(false), 1500);

await supabase.auth.signInWithOtp({
email,
options: {
emailRedirectTo: 'https://polidish.com',
},
});
};

return (
<main style={{ fontFamily: 'serif' }}>
{confetti && (
<div className="confetti">
{Array.from({ length: 40 }).map((_, i) => (
<span key={i}>✨</span>
))}
</div>
)}

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

<div className="signup">
<input
type="email"
placeholder="Email for member sign-up"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
<button
onClick={handleJoin}
disabled={sending}
style={{
background: sent ? 'gold' : 'black',
color: sent ? 'black' : 'white',
border: '2px solid black',
padding: '8px 12px',
fontWeight: 600,
cursor: sending ? 'default' : 'pointer',
transition: 'all 0.3s ease',
}}
>
{sent ? 'Check your email' : 'Join'}
</button>
</div>

{sent && (
<div style={{ marginTop: 8, fontSize: 14 }}>
A magic link has been sent. Check your email to confirm.
</div>
)}

<textarea
placeholder="Dish politely. May the best mind win."
value={draft}
onChange={(e) => setDraft(e.target.value)}
style={{
width: '100%',
minHeight: 120,
padding: 12,
fontFamily: 'inherit',
fontSize: 14,
marginTop: 12,
marginBottom: 12,
}}
/>

<div className="divider">
The Jungle Thread only grows and grows…
</div>

<div className="scroll">
<div className="enter">Enter</div>
</div>

<p className="age">
18+ only. By visiting or joining Polidish, you affirm that you are at
least 18 years of age.
</p>
</section>
</section>

<footer className="footer">
<div>
Polidish LLC is not legally responsible for your poor judgment.
</div>
<div>© 2025 Polidish LLC. All rights reserved.</div>
</footer>

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
background: white;
}

.signup {
display: flex;
gap: 8px;
margin: 12px 0;
}

.signup input {
flex: 1;
padding: 8px;
}

.divider {
margin: 12px 0;
padding: 8px 0;
border-top: 1px solid #bbb;
border-bottom: 1px solid #bbb;
text-align: center;
}

.scroll {
border: 1px solid #ddd;
padding: 12px;
flex: 1;
overflow-y: auto;
}

.footer {
padding: 16px 24px;
font-size: 12px;
border-top: 2px solid black;
}

.confetti {
position: fixed;
inset: 0;
pointer-events: none;
z-index: 9999;
}

.confetti span {
position: absolute;
top: -10px;
left: calc(100% * var(--x));
animation: fall 1.5s linear forwards;
font-size: 18px;
}

@keyframes fall {
to {
transform: translateY(110vh) rotate(360deg);
opacity: 0;
}
}
`}</style>
</main>
);
}

