(() => {
  const ritual = document.querySelector('#ritual');
  const canvas = document.querySelector('#ritualCanvas');
  const preview = document.querySelector('#previewCanvas');
  const next = document.querySelector('#nextButton');
  let points = [], drawing = false, last;

  const position = event => {
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height };
  };
  const record = event => {
    if (!drawing || !ritual.classList.contains('active') || !next.disabled) return;
    const point = position(event);
    if (!last || Math.hypot(point.x - last.x, point.y - last.y) > .012) { points.push(point); last = point; }
  };
  canvas.addEventListener('pointerdown', event => {
    if (!ritual.classList.contains('active') || !next.disabled) return;
    drawing = true; last = position(event); points.push(last);
  });
  canvas.addEventListener('pointermove', record);
  canvas.addEventListener('pointerup', () => { drawing = false; });

  function drawSeal() {
    const ctx = preview.getContext('2d');
    const cx = preview.width / 2, cy = preview.height * .58;
    const source = points.length > 8 ? points : Array.from({ length: 32 }, (_, i) => {
      const a = i / 31 * Math.PI * 3.7, r = 80 + i * 4;
      return { x: .5 + Math.cos(a) * r / 800, y: .5 + Math.sin(a) * r / 1200 };
    });
    const mx = source.reduce((sum, point) => sum + point.x, 0) / source.length;
    const my = source.reduce((sum, point) => sum + point.y, 0) / source.length;
    const mapped = source.map(point => ({ x: (point.x - mx) * 720, y: (point.y - my) * 1000 }));
    const farthest = Math.max(1, ...mapped.map(point => Math.hypot(point.x, point.y)));
    const scale = Math.min(7, 950 / farthest);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (let copy = 0; copy < 8; copy += 1) {
      ctx.save(); ctx.rotate(copy * Math.PI / 4);
      ctx.beginPath();
      mapped.forEach((point, index) => {
        const x = point.x * scale, y = point.y * scale;
        if (index === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.globalAlpha = .2 + (copy % 2) * .12;
      ctx.lineWidth = 13; ctx.strokeStyle = '#8e5df0'; ctx.stroke();
      ctx.globalAlpha = .85;
      ctx.lineWidth = 3.2; ctx.strokeStyle = '#fff1ae'; ctx.stroke();
      ctx.restore();
    }
    ctx.globalAlpha = .82; ctx.fillStyle = '#fff6ca';
    for (let i = 0; i < 12; i += 1) {
      const a = i * Math.PI / 6, r = 690;
      ctx.beginPath(); ctx.arc(Math.cos(a) * r, Math.sin(a) * r, 5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }

  document.querySelectorAll('[data-afterglow]').forEach(button => button.addEventListener('click', drawSeal));
  document.querySelector('#startButton')?.addEventListener('click', () => { points = []; });
  document.querySelector('#replayButton')?.addEventListener('click', () => { points = []; });
})();
