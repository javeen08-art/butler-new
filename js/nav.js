/* ============================================================
   Site nav: header scroll state + mobile hamburger toggle +
   IntersectionObserver-driven scroll reveals (.fade-in).
   ============================================================ */

(function () {
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.site-header__hamburger');
  const nav = document.querySelector('.site-header__nav');

  // Header solid state once scrolled past the first viewport.
  // If the page has no .hero, the header starts in the solid state.
  // Also swaps the header logo image between light/dark variants.
  if (header) {
    const TRIGGER = 60;
    const hero = document.querySelector('.hero');
    const logoSwap = header.querySelector('.js-logo-swap');

    const apply = (scrolled) => {
      header.classList.toggle('is-scrolled', scrolled);
      if (logoSwap) {
        const target = scrolled ? logoSwap.dataset.dark : logoSwap.dataset.light;
        if (target && logoSwap.getAttribute('src') !== target) {
          logoSwap.setAttribute('src', target);
        }
      }
    };

    const onScroll = () => apply(!hero || window.scrollY > TRIGGER);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile hamburger toggle
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      document.body.classList.toggle('nav-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close menu when a link is clicked
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        document.body.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scroll-reveal animations for elements with .fade-in
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    fadeEls.forEach((el) => io.observe(el));
  } else {
    // Fallback: just show everything
    fadeEls.forEach((el) => el.classList.add('is-visible'));
  }
})();
