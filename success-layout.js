(() => {
  const success = document.querySelector('#success');
  if (!success) return;
  const place = () => {
    if (!success.classList.contains('show')) return;
    success.style.display = 'flex';
    success.style.flexDirection = 'column';
    success.style.alignItems = 'center';
    success.style.justifyContent = 'flex-start';
    success.style.paddingTop = '105px';
  };
  new MutationObserver(place).observe(success, { attributes: true, attributeFilter: ['class'] });
})();
