(() => {
  const success = document.querySelector('#success');
  const step = document.querySelector('#stepLabel');
  const guide = document.querySelector('#guideLabel');
  if (!success || !step || !guide) return;
  const update = () => {
    if (!success.classList.contains('show')) return;
    step.textContent = 'STEP 03';
    document.querySelector('#successText').textContent = '厄を祓いました';
    guide.classList.add('is-hidden');
  };
  const reset = () => guide.classList.remove('is-hidden');
  new MutationObserver(update).observe(success, { attributes: true, attributeFilter: ['class'] });
  document.querySelector('#startButton')?.addEventListener('click', reset);
  document.querySelector('#replayButton')?.addEventListener('click', reset);
})();
