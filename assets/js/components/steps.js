(function (Nawa) {
  'use strict';

  Nawa.initSteps = function (root = document) {
    root.querySelectorAll('[data-steps]').forEach((list) => {
      let steps = [];
      try {
        steps = JSON.parse(list.dataset.steps);
      } catch (error) {
        console.error('Invalid data-steps', list, error);
        return;
      }
      const current = parseInt(list.dataset.current, 10) || 1;

      list.innerHTML = '';
      steps.forEach((label, index) => {
        const number = index + 1;
        const item = document.createElement('li');
        item.className = 'steps__item';

        if (number < current) {
          item.classList.add('is-done');
          item.textContent = `✓ ${label}`;
        } else {
          item.textContent = `${number}  ${label}`;
        }

        if (number === current) {
          item.classList.add('is-current');
          item.setAttribute('aria-current', 'step');
        }

        list.appendChild(item);
      });
    });
  };
})((window.Nawa = window.Nawa || {}));
