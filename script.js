/* ============================================================
   CHARNGO FASHION HOUSE — Main Script
   ============================================================ */

// ── Back To Top ──
(function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  function onScroll() {
    btn.classList.toggle('show', window.scrollY > 280);
  }
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ── Active Nav Link ──
(function () {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (!href) return;
    const isHome = (href === 'index.html' || href === '') && (path === 'index.html' || path === '');
    if (isHome || href === path) a.classList.add('active');
  });
})();

// ── Site Nav Toggle (index/about/contact pages) ──
(function () {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', links.classList.contains('open'));
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
    }
  });
})();

// ── Sidebar Burger (outfit pages) ──
(function () {
  const burger = document.getElementById('burgerBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (!burger || !sidebar) return;

  function open() {
    burger.classList.add('active');
    sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    burger.classList.remove('active');
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => sidebar.classList.contains('open') ? close() : open());
  if (overlay) overlay.addEventListener('click', close);

  // Close when sidebar link clicked on mobile
  document.querySelectorAll('.sidebar__nav a').forEach(a => {
    a.addEventListener('click', () => { if (window.innerWidth <= 768) close(); });
  });
})();

// ── Image Lightbox ──
(function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  if (!lightbox || !lightboxImg) return;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  document.querySelectorAll('.clothes-grid img, .gallery-reel__strip img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
})();
