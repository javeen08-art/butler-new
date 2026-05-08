/* Portfolio gallery lightbox — click any thumbnail to open full-size,
   navigate with prev/next, close with X / backdrop / Escape. */
(function () {
  const grid = document.querySelector('[data-gallery]');
  const lb   = document.querySelector('[data-gallery-lightbox]');
  if (!grid || !lb) return;

  const img    = lb.querySelector('.gallery-lightbox__img');
  const close  = lb.querySelector('.gallery-lightbox__close');
  const prev   = lb.querySelector('.gallery-lightbox__prev');
  const next   = lb.querySelector('.gallery-lightbox__next');

  // Collect all the full-size sources from data-full attrs
  const items = Array.from(grid.querySelectorAll('[data-full]'));
  const sources = items.map((el) => el.dataset.full);
  let current = -1;

  function open(idx) {
    current = idx;
    img.src = sources[idx];
    img.alt = '';
    lb.hidden = false;
    requestAnimationFrame(() => (lb.dataset.open = 'true'));
    document.body.dataset.galleryOpen = 'true';
  }
  function step(delta) {
    if (current < 0) return;
    current = (current + delta + sources.length) % sources.length;
    img.src = sources[current];
  }
  function dismiss() {
    lb.dataset.open = 'false';
    document.body.dataset.galleryOpen = 'false';
    setTimeout(() => { lb.hidden = true; img.src = ''; }, 300);
    current = -1;
  }

  items.forEach((el, idx) => el.addEventListener('click', () => open(idx)));
  close.addEventListener('click', dismiss);
  prev.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(+1));
  lb.addEventListener('click', (e) => { if (e.target === lb) dismiss(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') dismiss();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(+1);
  });
})();
