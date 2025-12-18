<section
style={{
backgroundColor: '#0A1A14', // deep, near-black green
color: '#EAEAEA',
padding: '24px',
borderRadius: '4px',
marginTop: '32px',
}}
>
<h2>Jungle Thread</h2>

{!session && (
<p style={{ opacity: 0.8 }}>
Sign in required to post.
</p>
)}

{session && (
<p>
<strong>You</strong> are verified. Discuss <em>your</em> political opinions here.
</p>
)}

<textarea
value={vine}
onChange={(e) => setVine(e.target.value)}
placeholder={session ? 'Dish politely…' : 'Sign in to post'}
disabled={!session}
style={{
width: '100%',
height: '120px',
marginTop: '12px',
padding: '12px',
fontSize: '16px',
backgroundColor: '#0F2A1D',
color: '#EAEAEA',
border: '1px solid #333',
borderRadius: '4px',
}}
/>

<button
onClick={postVine}
disabled={!session || !vine.trim()}
style={{
marginTop: '12px',
padding: '8px 16px',
fontSize: '14px',
cursor: session && vine.trim() ? 'pointer' : 'not-allowed',
}}
>
Post
</button>

<div style={{ marginTop: '32px' }}>
{vines.map((v) => (
<div key={v.id} style={{ marginBottom: '24px' }}>
<p>{v.content}</p>
<small style={{ color: '#B5B5B5' }}>
{new Date(v.created_at).toLocaleString()}
</small>
</div>
))}
</div>
</section>

