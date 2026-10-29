(function (Nawa) {
  'use strict';

  Nawa.initFileDrops = function (root = document) {
    root.querySelectorAll('[data-file-drop]').forEach((zone) => {
      const input = zone.querySelector('input[type="file"]');
      const label = zone.querySelector('[data-file-label]');
      if (!input || !label) return;

      const placeholder = label.textContent;

      const update = () => {
        const file = input.files && input.files[0];
        zone.classList.toggle('has-file', Boolean(file));
        label.textContent = file ? `${file.name} (${Math.ceil(file.size / 1024)} KB)` : placeholder;
      };

      ['dragenter', 'dragover'].forEach((type) =>
        zone.addEventListener(type, () => zone.classList.add('is-dragover'))
      );
      ['dragleave', 'drop'].forEach((type) =>
        zone.addEventListener(type, () => zone.classList.remove('is-dragover'))
      );
      input.addEventListener('change', update);
    });
  };
})((window.Nawa = window.Nawa || {}));
