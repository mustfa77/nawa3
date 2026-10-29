(function (Nawa) {
  'use strict';

  const cache = new Map();
  const root = () => document.body.dataset.root || '';

  const escapeHtml = (value) =>
    String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const render = (html, props) => {
    const values = { root: root(), ...props };
    return html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key) => escapeHtml(values[key]));
  };

  const getPartial = (url) => {
    const registry = window.NawaPartials || {};
    if (registry[url] !== undefined) return Promise.resolve(registry[url]);

    if (!cache.has(url)) {
      cache.set(
        url,
        fetch(root() + url).then((res) => {
          if (!res.ok) throw new Error(`Include failed: ${url} (${res.status})`);
          return res.text();
        })
      );
    }
    return cache.get(url);
  };

  const fillSlots = (fragment, host) => {
    [...host.children].forEach((child) => {
      const name = child.getAttribute('slot') || 'default';
      const target = fragment.querySelector(`[data-slot="${name}"]`);
      if (target) {
        child.removeAttribute('slot');
        target.appendChild(child);
      }
    });
  };

  async function includePartials(root = document) {
    const hosts = [...root.querySelectorAll('[data-include]')].filter(
      (host) => !host.parentElement?.closest('[data-include]')
    );

    await Promise.all(
      hosts.map(async (host) => {
        const props = host.dataset.props ? JSON.parse(host.dataset.props) : {};
        const html = render(await getPartial(host.dataset.include), props);

        const template = document.createElement('template');
        template.innerHTML = html.trim();
        const fragment = template.content;

        fillSlots(fragment, host);
        await includePartials(fragment);
        host.replaceWith(fragment);
      })
    );
  }

  Nawa.includePartials = includePartials;
})((window.Nawa = window.Nawa || {}));
