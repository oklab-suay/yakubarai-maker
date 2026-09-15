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
  const shareText = '厄祓いしてスッキリ！\n厄祓いメーカー\n' + location.href;
  document.querySelector('#shareButton').onclick = () => {
    location.href = 'https://x.com/intent/post?text=' + encodeURIComponent(shareText);
  };
  document.querySelector('#saveButton').onclick = async () => {
    const preview = document.querySelector('#previewCanvas');
    const blob = await new Promise(resolve => preview.toBlob(resolve, 'image/png'));
    if (!blob) return;
    const file = new File([blob], 'yakuyoke-wallpaper.png', { type: 'image/png' });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: '厄祓いメーカー', text: '厄祓い画像' });
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  };
})();
