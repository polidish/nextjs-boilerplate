<style jsx global>{`
@media (max-width: 768px) {
/* Let everything breathe full-width */
main,
header,
footer,
section,
aside {
width: 100% !important;
max-width: 100% !important;
margin: 0 auto !important;
box-sizing: border-box;
}

/* Stack naturally (already correct) */
main > section {
display: flex !important;
flex-direction: column !important;
gap: 16px;
}

/* Ads appear BELOW the jungle thread */
aside {
display: flex !important;
flex-direction: column !important;
gap: 16px;
margin-top: 16px;
}

/* Remove cramped footer feel */
footer {
border-top: none !important;
padding-left: 16px;
padding-right: 16px;
}
}
`}</style>



