// Add Q/R pair
function addQR() {
  const list = document.getElementById('qr-list');
  if (!list) return;
  const pair = document.createElement('div');
  pair.className = 'qr-pair';
  pair.innerHTML = `
    <div class="field-row">
      <label>Question :</label>
      <input type="text" name="q[]" placeholder="…" />
    </div>
    <div class="field-row">
      <label>Réponse :</label>
      <textarea name="r[]" rows="2" placeholder="…"></textarea>
    </div>`;
  list.appendChild(pair);
}

// Signature pad
const canvas = document.getElementById('signature-pad');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let drawing = false;

  function pos(e) {
    const r = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: src.clientX - r.left, y: src.clientY - r.top };
  }

  canvas.addEventListener('mousedown', e => { drawing = true; ctx.beginPath(); const p = pos(e); ctx.moveTo(p.x, p.y); });
  canvas.addEventListener('mousemove', e => { if (!drawing) return; const p = pos(e); ctx.lineTo(p.x, p.y); ctx.strokeStyle = '#111'; ctx.lineWidth = 2; ctx.stroke(); });
  canvas.addEventListener('mouseup', () => drawing = false);
  canvas.addEventListener('mouseleave', () => drawing = false);

  canvas.addEventListener('touchstart', e => { e.preventDefault(); drawing = true; ctx.beginPath(); const p = pos(e); ctx.moveTo(p.x, p.y); }, { passive: false });
  canvas.addEventListener('touchmove', e => { e.preventDefault(); if (!drawing) return; const p = pos(e); ctx.lineTo(p.x, p.y); ctx.strokeStyle = '#111'; ctx.lineWidth = 2; ctx.stroke(); }, { passive: false });
  canvas.addEventListener('touchend', () => drawing = false);
}

function clearSig() {
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
