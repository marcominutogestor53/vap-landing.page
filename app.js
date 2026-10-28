'use strict';
(() => {
  const localHosts = new Set(['localhost', '127.0.0.1', '::1', '[::1]']);
  const localPreview = localHosts.has(window.location.hostname);
  // Preserve the existing GTM container. Local previews must not pollute analytics.
  if (!localPreview) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-MR8QXW5D';
    document.head.appendChild(tag);
  }
  document.querySelectorAll('[data-track="whatsapp"]').forEach(link => {
    link.addEventListener('click', () => {
      if (localPreview) return;
      const position = link.dataset.position || 'pagina';
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'whatsapp_click', cta_position: position, channel: 'whatsapp' });
      // Centralize delivery through GTM; do not fire a second pixel event here.
      // A click is not a qualified lead or a completed conversation.
    });
  });
  const bar = document.querySelector('#mobile-action');
  const watched = Array.from(document.querySelectorAll('main [data-track="whatsapp"]'));
  if (bar && watched.length > 0 && 'IntersectionObserver' in window) {
    const visibility = new Map(watched.map(el => [el, true]));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => visibility.set(entry.target, entry.isIntersecting));
      bar.hidden = Array.from(visibility.values()).some(Boolean);
    }, { threshold: 0.05 });
    watched.forEach(el => observer.observe(el));
  }
})();
