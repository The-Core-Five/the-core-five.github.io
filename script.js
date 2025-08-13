
(function(){
  const copyBtn = document.getElementById('copyBtn');
  const printBtn = document.getElementById('printBtn');
  const creed = document.getElementById('creed');
  const principles = document.querySelectorAll('details.principle');

  // Copy creed text
  copyBtn?.addEventListener('click', async () => {
    const text = Array.from(creed.querySelectorAll('p')).map(p => p.innerText).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = 'Copied';
      setTimeout(() => copyBtn.textContent = 'Copy', 1600);
    } catch {
      copyBtn.textContent = 'Press Ctrl/Cmd+C';
      setTimeout(() => copyBtn.textContent = 'Copy', 1600);
    }
  });

  // Print
  printBtn?.addEventListener('click', () => window.print());

  // Allow only one open at a time
  principles.forEach(principle => {
    principle.addEventListener('toggle', () => {
      if (principle.open) {
        principles.forEach(other => {
          if (other !== principle) {
            other.removeAttribute('open');
          }
        });
      }
    });
  });
})();