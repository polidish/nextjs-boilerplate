<iframe src="https://polidish.tiiny.site" width="100%" height="800" style="border:4px solid #d4af37;" allowfullscreen></iframe>
notion style embed

page 

<!-- TOP: SIGN-UP + JUNGLE INTRO -->
<div style="background:#000;color:#d4af37;padding:30px 20px;text-align:center;border-bottom:4px solid #d4af37;">
  <h1 style="margin:0;font-size:2.5em;">Polidish</h1>
  <p style="font-size:1.3em;font-weight:bold;margin:15px 0;">
    Welcome to the jungle thread — uncensored viewpoints of verified member accounts posted here.
  </p>
  <p style="margin:10px 0;">
    <strong>By signing up you are confirming you are at least 18 years old, voting age.</strong>
  </p>

  <form id="signup-form" style="margin:25px auto;max-width:500px;">
    <input type="email" placeholder="Your email" required style="width:70%;padding:14px;font-size:1.1em;">
    <button type="submit" style="width:28%;padding:14px;background:#d4af37;color:#000;border:none;font-weight:bold;font-size:1.1em;cursor:pointer;">
      Join → Magic Link
    </button>
  </form>
  <div id="status" style="margin-top:10px;color:#d4af37;font-weight:bold;"></div>
</div>

<!-- MAIN LAYOUT: 25% ADS LEFT | 75% THREAD RIGHT -->
<div style="display:flex;flex-wrap:wrap;max-width:1400px;margin:0 auto;">
  <!-- LEFT: ADS (25%) -->
  <div style="flex:1;min-width:250px;background:#111;padding:20px;border-right:3px solid #d4af37;">
    <h3 style="color:#d4af37;text-align:center;margin-top:0;">Ads</h3>
    <div style="background:#222;height:90vh;color:#888;text-align:center;padding-top:40vh;">
      Your ad here<br>→ contact@polidish.com
    </div>
  </div>

  <!-- RIGHT: JUNGLE THREAD (75%) -->
  <div style="flex:3;min-width:300px;background:#000;color:#fff;padding:30px;height:80vh;overflow-y:auto;">
    <h2 style="color:#d4af37;text-align:center;margin-top:0;">The Jungle Thread</h2>
    <hr style="border-color:#d4af37;margin:20px 0;">
    <div id="thread-posts">
      <p style="text-align:center;color:#888;font-style:italic;">
        No posts yet — the first verified voice starts the fire.
      </p>
    </div>
  </div>
</div>

<script>
  const form = document.getElementById('signup-form');
  const status = document.getElementById('status');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const email = e.target[0].value.trim();
    status.textContent = 'Sending…';
    try {
      const res = await fetch('https://polidish.tiiny.site/api/collections/users/auth-with-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, identity: email })
      });
      if (res.ok) {
        status.innerHTML = 'You’re in! Magic link sent — check inbox + spam.';
        form.reset();
      } else {
        const err = await res.json();
        status.textContent = err.message || 'Error — try again.';
      }
    } catch (err) {
      status.textContent = 'Network error — refresh';
    }
  });
</script>
