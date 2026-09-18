(() => {
  const hint = document.querySelector('#gestureHint');
  const canvas = document.querySelector('#ritualCanvas');
  if (!hint || !canvas) return;
  const dismiss = () => hint.classList.add('is-hidden');
  const arm = () => {
    hint.classList.remove('is-hidden');
    canvas.addEventListener('pointerdown', dismiss, { once: true });
    setTimeout(dismiss, 12000);
  };
  canvas.addEventListener('pointerdown', dismiss, { once: true });
  document.querySelector('#startButton')?.addEventListener('click', arm);
  document.querySelector('#replayButton')?.addEventListener('click', () => {
    setTimeout(arm, 20);
  });
})();
