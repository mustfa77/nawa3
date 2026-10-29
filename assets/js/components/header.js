(function (Nawa) {
  'use strict';

  const markActive = (selector) => {
    document.querySelectorAll(selector).forEach((link) => {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    });
  };

  Nawa.initHeader = function () {
    const { section, page, top } = document.body.dataset;
    const key = section || page;
    if (key) markActive(`[data-nav="${key}"]`);
    if (top) markActive(`[data-top="${top}"]`);

    if (document.getElementById('appSidebar')) {
      document.querySelectorAll('[data-menu-toggle]').forEach((button) => {
        button.setAttribute('data-bs-target', '#appSidebar');
        button.setAttribute('aria-controls', 'appSidebar');
      });
    }

    document.querySelectorAll('[data-search]').forEach((form) => {
      const input = form.querySelector('input[name="q"]');
      const query = new URLSearchParams(window.location.search).get('q');
      if (input && query) input.value = query;

      form.addEventListener('submit', (event) => {
        if (input && !input.value.trim()) {
          event.preventDefault();
          input.focus();
        }
      });
    });
  };
})((window.Nawa = window.Nawa || {}));
