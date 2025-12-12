<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Polidish</title>
<style>
body {
margin: 0;
font-family: Georgia, serif;
background: #000;
color: #eaeaea;
}

header, footer {
text-align: center;
padding: 20px;
border-bottom: 3px solid #d4af37;
}

footer {
border-top: 3px solid #d4af37;
border-bottom: none;
font-size: 0.9em;
color: #aaa;
}

.container {
display: flex;
max-width: 1400px;
margin: 0 auto;
min-height: 80vh;
}

.left {
width: 30%;
padding: 20px;
border-right: 3px solid #d4af37;
box-sizing: border-box;
}

.right {
width: 70%;
padding: 20px;
box-sizing: border-box;
display: flex;
align-items: center;
justify-content: center;
}

.ad {
height: 140px;
border: 1px solid #555;
margin-bottom: 20px;
display: flex;
align-items: center;
justify-content: center;
color: #888;
font-size: 0.9em;
}

.cta {
width: 100%;
padding: 12px;
margin-top: 10px;
background: #d4af37;
color: #000;
border: none;
font-weight: bold;
cursor: pointer;
}

.hero {
max-width: 100%;
border: 4px solid #d4af37;
}
</style>
</head>

<body>

<header>
<h1>Polidish</h1>
<p>Public discourse. Verified contributors.</p>
</header>

<div class="container">

<div class="left">
<div class="ad">Advertisement</div>
<div class="ad">Advertisement</div>
<div class="ad">Advertisement</div>

<button class="cta">Join</button>
<button class="cta">About</button>
</div>

<div class="right">
<img src="hero-image.jpg" alt="Polidish Hero" class="hero" />
</div>

</div>

<footer>
© Polidish — A venue, not a platform
</footer>

</body>
</html>
