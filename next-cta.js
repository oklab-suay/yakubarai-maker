(() => {
  const next = document.querySelector('#nextButton');
  const status = document.querySelector('#statusLabel');
  if (!next || !status) return;
  next.addEventListener('click', () => status.classList.add('is-cleared'));
  document.querySelector('#startButton')?.addEventListener('click', () => status.classList.remove('is-cleared'));
  document.querySelector('#replayButton')?.addEventListener('click', () => status.classList.remove('is-cleared'));
})();
