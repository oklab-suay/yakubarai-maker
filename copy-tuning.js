(() => {
  const status = document.querySelector('#statusLabel');
  document.querySelector('#startButton')?.addEventListener('click', () => {
    setTimeout(() => { if (status) status.textContent = '手放す準備中'; }, 0);
  });
  document.querySelector('#replayButton')?.addEventListener('click', () => {
    if (status) status.textContent = '手放す準備中';
  });
  if (status) new MutationObserver(() => {
    if (status.textContent === 'モヤがほどけてきた') status.textContent = '厄がほどけてきた';
    if (status.textContent === 'モヤが集まりました') status.textContent = '厄が集まりました';
  }).observe(status, { childList: true, characterData: true, subtree: true });
  document.querySelector('#shareButton').onclick = () => open('https://x.com/intent/post?text=' + encodeURIComponent('厄をひとつ祓いました #厄祓いメーカー #オカルトかーちゃん'), '_blank');
})();
