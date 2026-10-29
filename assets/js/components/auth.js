(function (Nawa) {
  'use strict';

  const KEY = 'nawa_auth';

  const read = () => {
    try { return localStorage.getItem(KEY); } catch (error) { return null; }
  };
  const write = (value) => {
    try {
      if (value) localStorage.setItem(KEY, value);
      else localStorage.removeItem(KEY);
    } catch (error) {  }
  };

  Nawa.applyAuthState = function () {
    const body = document.body;
    if (body.dataset.authMode === 'auto') {
      body.dataset.auth = read() === 'user' ? 'user' : 'guest';
    } else if (body.dataset.auth === 'user') {
      write('user');
    }
  };

  Nawa.initAuth = function () {
    document.addEventListener('click', (event) => {
      if (event.target.closest('[data-logout]')) write(null);
    });

    document.querySelectorAll('form[data-auth-login]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        if (!event.defaultPrevented) write('user');
      });
    });
  };
})((window.Nawa = window.Nawa || {}));
