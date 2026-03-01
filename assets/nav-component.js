/**
 * nav-component.js — Shared Navigation for Remotion Prompt Studio
 * Reads from menu-debug.json, menu-content.json, search-index.json
 * Usage: <body data-root="./"> or <body data-root="../">
 */
(function () {
  const root = document.body.getAttribute('data-root') || './';

  // ── Cookie helpers ──────────────────────────────────────────────────────────
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days || 30) * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + d.toUTCString() + ';path=/';
  }

  window.navDebugMode = getCookie('debug') === 'true';

  // ── Toggle debug mode ───────────────────────────────────────────────────────
  window.toggleDebug = function () {
    window.navDebugMode = !window.navDebugMode;
    setCookie('debug', window.navDebugMode, 30);
    applyDebugVisibility();
  };

  function applyDebugVisibility() {
    const nav = document.getElementById('debug-nav');
    if (nav) nav.style.display = window.navDebugMode ? 'flex' : 'none';
    const btn = document.getElementById('debug-toggle-btn');
    if (btn) btn.classList.toggle('active', window.navDebugMode);
  }

  // ── Fetch all menu data in parallel ────────────────────────────────────────
  Promise.all([
    fetch(root + 'menu-debug.json').then(r => r.json()).catch(() => []),
    fetch(root + 'menu-content.json').then(r => r.json()).catch(() => []),
    fetch(root + 'search-index.json').then(r => r.json()).catch(() => [])
  ]).then(function (results) {
    buildDebugNav(results[0]);
    buildContentNav(results[1]);
    buildSearch(results[2]);
    applyDebugVisibility();
  });

  // ── Build debug nav (Menu 1) ────────────────────────────────────────────────
  function buildDebugNav(items) {
    var container = document.getElementById('debug-nav');
    if (!container) return;

    var links = items.map(function (item) {
      return '<a href="' + root + item.url + '" class="debug-nav-link">' +
        (item.emoji || '') + ' ' + item.label + '</a>';
    }).join('');

    container.innerHTML =
      '<span class="debug-label">🐛 DEBUG</span>' +
      links +
      '<a href="' + root + 'markdown_renderer.html" class="debug-nav-link">📄 MD Renderer</a>' +
      '<button onclick="window.toggleDebug()" class="debug-close-btn">✕ Close Debug</button>';
  }

  // ── Build content nav (Menu 2) ──────────────────────────────────────────────
  function buildContentNav(items) {
    var container = document.getElementById('content-nav-items');
    if (!container) return;

    // Determine current page to highlight active link
    var currentPath = window.location.pathname;

    var links = items.map(function (item) {
      var href = root + item.url;
      var isActive = currentPath.endsWith(item.url.replace(/^.*\//, ''));
      return '<a href="' + href + '" class="nav-link' + (isActive ? ' active' : '') + '">' +
        (item.emoji || '') + ' ' + item.label + '</a>';
    }).join('');

    container.innerHTML = links;
  }

  // ── Build search with autocomplete ─────────────────────────────────────────
  function buildSearch(searchIndex) {
    var container = document.getElementById('nav-search-container');
    if (!container) return;

    var input = container.querySelector('#nav-search');
    var dropdown = container.querySelector('#search-dropdown');
    if (!input || !dropdown) return;

    function doSearch() {
      var query = input.value.toLowerCase().trim();
      if (!query || query.length < 1) {
        dropdown.style.display = 'none';
        return;
      }

      var results = searchIndex.filter(function (item) {
        return item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          (item.tags || []).some(function (t) { return t.toLowerCase().includes(query); });
      }).slice(0, 8);

      if (results.length === 0) {
        dropdown.innerHTML = '<div class="search-result-item"><span class="search-result-title">No results found</span></div>';
        dropdown.style.display = 'block';
        return;
      }

      dropdown.innerHTML = results.map(function (item) {
        return '<a href="' + root + item.url + '" class="search-result-item">' +
          '<span class="search-result-title">' + (item.emoji || '📄') + ' ' + escapeHtml(item.title) + '</span>' +
          '<span class="search-result-desc">' + escapeHtml(item.description) + '</span>' +
          '</a>';
      }).join('');

      dropdown.style.display = 'block';
    }

    input.addEventListener('input', doSearch);
    input.addEventListener('focus', doSearch);

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        dropdown.style.display = 'none';
        input.blur();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        var first = dropdown.querySelector('a');
        if (first) first.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!container.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
