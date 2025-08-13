(function () {
  const copyBtn = document.getElementById('copyBtn');
  const printBtn = document.getElementById('printBtn');
  const creed = document.getElementById('creed');

  function getCreedText() {
    // Build a clean, single string from the creed list
    const rows = Array.from(document.querySelectorAll('.creed-list li')).map(li => {
      const name = li.querySelector('.principle-name')?.textContent?.trim() || '';
      const desc = li.querySelector('.principle-desc')?.textContent?.trim() || '';
      return desc ? `${name} — ${desc}` : name;
    });
    return rows.join('\n');
  }

  async function copyTextMobileSafe(text) {
    // Try modern API first
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) { /* fall through to fallback */ }

    // Fallback: create a hidden textarea (works on iOS Safari)
    const ta = document.createElement('textarea');
    ta.value = text;
    // Prevent zoom & keyboard pop on iOS
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    ta.style.left = '-9999px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);

    // Select and copy
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, ta.value.length); // iOS
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (_) {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }

  copyBtn?.addEventListener('click', async () => {
    const text = getCreedText();
    const ok = await copyTextMobileSafe(text);
    if (ok) {
      copyBtn.textContent = 'Copied';
      setTimeout(() => (copyBtn.textContent = 'Copy'), 1600);
    } else {
      // Final fallback: select the creed text so user can long-press → Copy
      const range = document.createRange();
      range.selectNodeContents(creed);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      copyBtn.textContent = 'Select → Copy';
      setTimeout(() => (copyBtn.textContent = 'Copy'), 2000);
    }
  });

  printBtn?.addEventListener('click', () => window.print());
})();
