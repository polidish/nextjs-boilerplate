<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Polidish</title>

<style>
/* ===== RESET ===== */
*{box-sizing:border-box}
html,body{margin:0;padding:0;height:100%}

/* ===== GLOBAL ===== */
body{
font-family:Georgia,serif;
background:#c87c00;
color:#111;
}

/* ===== HEADER ===== */
.header{
display:flex;
align-items:center;
justify-content:space-between;
padding:14px 24px;
border-bottom:1px solid #111;
}
._logo{height:34px}
.header-line{font-style:italic;font-size:16px}

/* ===== PAGE GRID ===== */
.page{
display:grid;
grid-template-columns:280px 1fr;
min-height:calc(100vh - 64px);
}

/* ===== OUTPOST ===== */
.outpost{
display:flex;
flex-direction:column;
padding:18px;
border-right:1px solid #111;
}
.outpost-note{font-size:13px;margin-bottom:16px}

.ad{display:none}
.ad.active{display:block}
.ad-caption{margin-top:10px;font-size:14px}

.outpost-links{
margin-top:auto;
display:flex;
gap:12px;
}
.outpost-btn{
border:1px solid #111;
padding:6px 10px;
background:transparent;
color:#111;
text-decoration:none;
}

/* ===== JUNGLE ===== */
.jungle{
display:flex;
flex-direction:column;
min-height:100%;
}
.auth{
padding:16px 24px;
border-bottom:1px solid #111;
}
.auth input{
width:100%;
padding:8px;
border:1px solid #111;
background:transparent;
font-family:Georgia,serif;
}
.jungle-thread{
flex:1;
padding:24px;
overflow-y:auto;
}
.jungle-thread::after{
content:"";
display:block;
height:180vh;
}
.mini-footer{
padding:12px 24px;
border-top:1px solid #111;
font-size:12px;
}

/* ===== FOOTER ===== */
.footer{
padding:16px 24px;
border-top:1px solid #111;
font-size:12px;
}

/* ===== MOBILE ===== */
@media(max-width:768px){
.page{grid-template-columns:1fr}
.outpost{
order:2;
border-right:none;
border-top:1px solid #111;
}
.jungle{order:1}
}
</style>
</head>

<body>

<header class="header">
<img src="/_logo.png" class="_logo" alt="Polidish logo">
<div class="header-line">Politely dishing politics. May the best mind win.</div>
</header>

<div class="page">

<!-- LEFT: OUTPOST -->
<aside class="outpost">
<div class="outpost-note">Uncurated.</div>

<div class="ad active" data-hold="15000">
<img src="/ads/ad1.jpg" alt="">
</div>

<div class="ad" data-hold="32000">
<img src="/ads/ad2.jpg" alt="">
<div class="ad-caption" id="ad2-caption"></div>
</div>

<div class="ad" data-hold="60000">
<img src="/ads/ad3.jpg" alt="">
<div class="ad-caption" id="ad3-caption"></div>
</div>

<div class="outpost-links">
<a class="outpost-btn" href="https://polidish.blog">polidish.blog</a>
<a class="outpost-btn" href="https://polidish.store">polidish.store</a>
</div>
</aside>

<!-- RIGHT: JUNGLE -->
<main class="jungle">
<div class="auth">
<input type="email" placeholder="Email for member sign-up">
<div style="margin-top:8px;font-size:13px">Sign in required to post.</div>
</div>

<section class="jungle-thread">
<!-- existing jungle content -->
</section>

<div class="mini-footer">18+</div>
</main>

</div>

<footer class="footer" id="footer-copy"></footer>

<script>
/* ===== AD ROTATION ===== */
(()=> {
const ads=document.querySelectorAll('.ad');
const transition=15000;
let i=0;
function rotate(){
const cur=ads[i];
const hold=parseInt(cur.dataset.hold,10);
setTimeout(()=>{
cur.classList.remove('active');
setTimeout(()=>{
i=(i+1)%ads.length;
ads[i].classList.add('active');
rotate();
},transition);
},hold);
}
rotate();
})();

/* ===== COPY BINDING (CANON) ===== */
document.getElementById('ad2-caption').textContent = window.POLIDISH_AD2_CAPTION;
document.getElementById('ad3-caption').textContent = window.POLIDISH_AD3_CAPTION;
document.getElementById('footer-copy').innerHTML = window.POLIDISH_FOOTER_COPY;
</script>

</body>
</html>
