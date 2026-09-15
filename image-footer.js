(() => {
  const preview = document.querySelector('#previewCanvas');
  const stamp = () => {
    const ctx = preview.getContext('2d');
    const w = preview.width, h = preview.height;
    const panel = ctx.createLinearGradient(0, h - 430, 0, h);
    panel.addColorStop(0, 'rgba(21,22,55,0)');
    panel.addColorStop(.32, 'rgba(21,22,55,.56)');
    panel.addColorStop(1, 'rgba(21,22,55,.85)');
    ctx.fillStyle = panel; ctx.fillRect(0, h - 430, w, 430);
    ctx.textAlign = 'center';
    ctx.shadowColor = '#fff0b2'; ctx.shadowBlur = 18;
    ctx.fillStyle = '#fff4cf'; ctx.font = '150px serif';
    ctx.fillText('厄払いメーカー', w / 2, h - 205);
    ctx.shadowBlur = 10; ctx.fillStyle = '#fff9df'; ctx.font = '105px serif';
    ctx.fillText('厄祓い完了', w / 2, h - 75);
    ctx.shadowBlur = 0;
  };
  document.querySelectorAll('[data-afterglow]').forEach(button => button.addEventListener('click', stamp));
})();
