// app height
function appHeight() {
  const doc = document.documentElement
  doc.style.setProperty('--vh', (window.innerHeight * .01) + 'px');
}

// end app height