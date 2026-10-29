(function (Nawa) {
  'use strict';

  Nawa.initSelectDropdowns = function (root = document) {
    root.querySelectorAll('[data-select]').forEach((select) => {
      const label = select.querySelector('[data-select-label]');

      select.addEventListener('click', (event) => {
        const item = event.target.closest('[data-value]');
        if (!item) return;

        select.querySelectorAll('[data-value]').forEach((el) => {
          el.classList.toggle('active', el === item);
          el.setAttribute('aria-selected', el === item ? 'true' : 'false');
        });
        if (label) label.textContent = item.textContent.trim();

        select.dispatchEvent(
          new CustomEvent('select:change', {
            bubbles: true,
            detail: { name: select.dataset.select, value: item.dataset.value, label: item.textContent.trim() },
          })
        );
      });
    });
  };
})((window.Nawa = window.Nawa || {}));
