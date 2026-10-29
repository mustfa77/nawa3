(function (Nawa) {
  'use strict';

  Nawa.initProgress = function (root = document) {
    const tracks = root.querySelectorAll('[data-progress]');
    if (!tracks.length) return;

    const fill = (track) => {
      const value = Math.min(Math.max(parseFloat(track.dataset.progress) || 0, 0), 100);
      track.style.setProperty('--progress', `${value}%`);
    };

    if (!('IntersectionObserver' in window)) {
      tracks.forEach(fill);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          fill(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    tracks.forEach((track) => observer.observe(track));
  };
})((window.Nawa = window.Nawa || {}));
