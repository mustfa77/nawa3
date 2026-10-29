(function (Nawa) {
  'use strict';

  const injectSprite = () => {
    const sprite = (window.NawaPartials || {})['assets/icons/sprite.svg'];
    if (!sprite || document.getElementById('nawa-sprite')) return;
    const holder = document.createElement('div');
    holder.id = 'nawa-sprite';
    holder.hidden = true;
    holder.innerHTML = sprite;
    document.body.prepend(holder);
  };

  async function boot() {
    Nawa.applyAuthState?.();
    injectSprite();

    try {
      await Nawa.includePartials();
    } catch (error) {
      console.error(error);
    }

    Nawa.initHeader();
    Nawa.initProgress?.();
    Nawa.initSelectDropdowns?.();
    Nawa.initSteps?.();
    Nawa.initFileDrops?.();
    Nawa.initForms?.();
    Nawa.initAuth?.();
    Nawa.initReveal?.();

    document.body.classList.add('is-ready');
    document.dispatchEvent(new CustomEvent('app:ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})((window.Nawa = window.Nawa || {}));
