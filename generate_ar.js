const fs = require('fs');

let html = fs.readFileSync('../POC - Opticas + Sistema AR Gafas-20260705T202439Z-3-001/POC - Opticas + Sistema AR Gafas/Óptica Oviedo e-commerce AR v2/index.html', 'utf8');

const arInject = `
<style>
  header, footer, .page, .toast-container, .hero { display: none !important; }
  body { background: #120F17 !important; overflow: hidden !important; }
  .ar-fullscreen { display: flex !important; }
  .ar-header h2 { font-family: sans-serif; }
  /* Ensure the AR close button takes the user back to the Next.js site */
</style>
<script>
  window.addEventListener('load', () => {
    // Automatically open AR
    setTimeout(() => {
      openARFullscreen();
      // Overwrite the closeARFullscreen function so it redirects back to the Next.js site
      window.closeARFullscreen = function() {
        window.location.href = '/';
      };
      
      // Also overwrite the back button in the AR header
      const arCloseBtn = document.querySelector('.ar-header button');
      if(arCloseBtn) {
        arCloseBtn.onclick = function() {
          window.location.href = '/';
        }
      }
    }, 1000);
  });
</script>
`;

html = html.replace('</head>', arInject + '</head>');
fs.writeFileSync('public/ar.html', html);
