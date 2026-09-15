(() => {
  const target = document.querySelector('#throwTarget');
  const canvas = document.querySelector('#ritualCanvas');
  const button = document.querySelector('#nextButton');
  const ritual = document.querySelector('#ritual');
  if (!target || !canvas || !button || !ritual) return;
  const hide = () => target.classList.remove('is-visible');
  button.addEventListener('click', () => {
    target.classList.add('is-visible');
    target.style.left = '50%'; target.style.top = '50%';
  });
  canvas.addEventListener('pointermove', (event) => {
    if (!target.classList.contains('is-visible') || !canvas.hasPointerCapture(event.pointerId)) return;
    const rect = canvas.getBoundingClientRect();
    const left = event.clientX - rect.left, top = event.clientY - rect.top;
    target.style.left = `${left}px`; target.style.top = `${top}px`;
    if (left < -25 || top < -25 || left > rect.width + 25 || top > rect.height + 25) hide();
  });
  new MutationObserver(() => { if (document.querySelector('#success').classList.contains('show')) hide(); }).observe(document.querySelector('#success'), { attributes: true });
  document.querySelector('#replayButton')?.addEventListener('click', hide);
})();
