(function (Nawa) {
  'use strict';

  const showError = (control) => {
    const field = control.closest('.field-ux');
    if (!field) return;
    const help = field.querySelector('.field-ux__help');
    field.classList.add('is-invalid');
    if (help) {
      if (help.dataset.original === undefined) help.dataset.original = help.textContent;
      help.textContent = control.validationMessage;
    }
  };

  const clearError = (control) => {
    const field = control.closest('.field-ux');
    if (!field || !field.classList.contains('is-invalid')) return;
    const help = field.querySelector('.field-ux__help');
    field.classList.remove('is-invalid');
    if (help && help.dataset.original !== undefined) help.textContent = help.dataset.original;
  };

  let toastTimer;
  Nawa.toast = function (message) {
    let toast = document.querySelector('.toast-ux');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-ux';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  };

  Nawa.initForms = function (root = document) {
    root.querySelectorAll('form[data-validate]').forEach((form) => {
      form.setAttribute('novalidate', '');

      form.addEventListener('submit', (event) => {
        const controls = [...form.querySelectorAll('input, select, textarea')];
        const invalid = controls.filter((control) => !control.checkValidity());

        controls.forEach(clearError);
        if (!invalid.length) return;

        event.preventDefault();
        invalid.forEach(showError);
        invalid[0].focus();
      });

      form.addEventListener('input', (event) => {
        if (event.target.checkValidity()) clearError(event.target);
      });
      form.addEventListener('change', (event) => {
        if (event.target.checkValidity()) clearError(event.target);
      });
    });

    root.querySelectorAll('[data-toast]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        Nawa.toast(button.dataset.toast);
      });
    });
  };
})((window.Nawa = window.Nawa || {}));
