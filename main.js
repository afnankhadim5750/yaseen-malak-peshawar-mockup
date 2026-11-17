/* Yaseen Malak Restaurant — mobile menu, accordion, lightbox, nav highlight */
(function () {
  'use strict';

  /* Mobile menu — instant toggle, no transition on the open/close state */
  var toggle = document.querySelector('[data-menu-toggle]');
  var mobileMenu = document.querySelector('[data-mobile-menu]');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      var open = mobileMenu.hidden;
      mobileMenu.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  /* FAQ accordion — panels start hidden, one open at a time */
  var accBtns = Array.prototype.slice.call(document.querySelectorAll('.acc-btn'));
  accBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = btn.parentElement.querySelector('.acc-panel');
      var willOpen = panel.hidden;
      accBtns.forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        b.parentElement.querySelector('.acc-panel').hidden = true;
      });
      if (willOpen) {
        panel.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Lightbox gallery */
  var box = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCaption = document.getElementById('lbCaption');
  var items = Array.prototype.slice.call(document.querySelectorAll('.g-item'));
  var lbIndex = 0;
  function showLb(i) {
    lbIndex = (i + items.length) % items.length;
    var item = items[lbIndex];
    lbImg.src = item.dataset.full;
    lbImg.alt = item.dataset.alt;
    lbCaption.textContent = item.dataset.alt;
    box.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function hideLb() {
    box.hidden = true;
    document.body.style.overflow = '';
  }
  items.forEach(function (item, i) {
    item.addEventListener('click', function () { showLb(i); });
  });
  document.getElementById('lbClose').addEventListener('click', hideLb);
  document.getElementById('lbPrev').addEventListener('click', function () { showLb(lbIndex - 1); });
  document.getElementById('lbNext').addEventListener('click', function () { showLb(lbIndex + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) hideLb(); });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') hideLb();
    if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
    if (e.key === 'ArrowRight') showLb(lbIndex + 1);
  });

  /* Nav active-section highlight */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.main-nav a[href^="#"]'));
  var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id); });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { obs.observe(s); });
  }
})();
