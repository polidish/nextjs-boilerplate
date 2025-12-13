// app/page.tsx ← FINAL – pier → decanter → peacock

import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
"https://dpswoooyjdtzcccgbqmy.supabase.co",
"your-real-anon-key-here" // ← only line you change
);

export default function Home() {
const [email, setEmail] = useState("");
const [status, setStatus] = useState("");
const [posts, setPosts] = useState<any[]>([]);

const sendMagicLink = async () => {
if (!email) return;
const { error } = await supabase.auth.signInWithOtp({
email,
options: { emailRedirectTo: location.href },
});
setStatus(error ? "Retry" : "Magic link sent — check your inbox");
};

const loadPosts = async () => {
const { data } = await supabase
.from("posts")
.select("*")
.order("created_at", { ascending: false });
setPosts(data || []);
};

useEffect(() => {
loadPosts();
loadPosts();
const interval = setInterval(loadPosts, 30000);
return () => clearInterval(interval);
}, []);

return (
<div className="bg-[#D2691E] text-white">
{/* 1 – pier.jpeg (top) */}
<div className="relative">
<Image src="/pier.jpeg" alt="Pier" width={1920} height={1080} className="w-full object-cover" priority />
<div className="absolute bottom-12 inset-x-0 text-center">
<p className="text-2xl md:text-3xl font-bold text-yellow-400 bg-black/60 inline-block px-8 py-4 rounded">
Visualize your ad right here, to the left, or in the center.
</p>
</div>
</div>

{/* 2 – decanter.jpeg (middle) */}
<div className="relative -mt-1">
<Image src="/decanter.jpeg" alt="Decanter" width={1920} height={1080} className="w-full object-cover" />
<div className="absolute inset-0 flex items-center justify-center">
<p className="text-4xl md:text-6xl font-bold text-yellow-300 bg-black/40 px-10 py-6 rounded-lg text-center">
Advertisements are<br />absolutely uncurated<br />for your privacy
</p>
</div>
</div>

{/* 3 – peacock.jpeg (bottom) */}
<div className="relative -mt-1">
<Image src="/peacock.jpeg" alt="Peacock" width={1920} height={1080} className="w-full object-cover" />
<div className="absolute inset-0 flex items-center justify-center">
<p className="text-3xl md:text-5xl font-bold text-yellow-300 bg-black/50 px-10 py-6 rounded-lg text-center leading-tight">
Polidish: the Outpost where luxury partners<br />meet High Worth While Individuals (HWWI).
</p>
</div>
</div>

{/* Black portals */}
<div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
<div className="bg-black p-12 rounded-2xl text-center">
<h2 className="text-4xl font-bold text-yellow-300 underline mb-4">POLIDISH.STORE COMING SOON FOR</h2>
<p className="text-2xl text-yellow-300">ORIGINAL POLIDISH BRAND MERCH</p>
</div>
<div className="bg-black p-12 rounded-2xl text-center">
<h2 className="text-4xl font-bold text-yellow-300 underline mb-4">POLIDISH.BLOG COMING SOON IN</h2>
<p className="text-2xl text-yellow-300">2026-MEMBERS EXTENDED DISH</p>
</div>
</div>

{/* BLACK BOX FLUSH + WHITE JUNGLE */}
<div className="min-h-screen bg-black text-white flex flex-col items-center pt-20 px-6">
<div className="w-full max-w-2xl text-center">
<h1 className="text-7xl font-black tracking-tight">Polidish</h1>
<p className="text-xl opacity-90 mt-6 mb-12">
Transparent. Public view. Members-only posting.<br />
18+ • Freedom of speech • No censorship
</p>

<div className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto">
<input
type="email"
placeholder="your@email.com"
value={email}
onChange={(e) => setEmail(e.target.value)}
className="flex-1 px-8 py-5 bg-[#111] border border-[#d4af37] rounded-l-2xl focus:outline-none text-lg"
/>
<button onClick={sendMagicLink} className="px-12 py-5 bg-[#d4af37] text-black font-bold rounded-r-2xl hover:bg-[#f0c14b]">
Join
</button>
</div>
<div className="h-8 text-sm mt-3">{status}</div>
</div>

<div className="w-full max-w-2xl bg-white text-black rounded-2xl shadow-2xl mt-16 p-10 max-h-[75vh] overflow-y-auto">
{posts.length === 0 ? (
<p className="text-center text-gray-500 italic text-lg">Be the first to post in the jungle…</p>
) : (
posts.map((p) => (
<div key={p.id} className="bg-gray-50 p-6 mb-6 rounded-xl border-l-4 border-[#d4af37]">
<div className="whitespace-pre-wrap mb-4" dangerouslySetInnerHTML={{ __html: p.body.replace(/\n/g, "<br>") }} />
<small className="text-gray-600">
— {p.author || "anon"} • {new Date(p.created_at).toLocaleString()}
</small>
</div>
))
)}
</div>
</div>
</div>
);
}

