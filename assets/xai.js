/**
 * assets/xai.js — xAI (Grok) client
 * - Prompt enhancement via grok-2-latest (chat completions)
 * - Image generation via grok-2-image-1212 (images/generations)
 *
 * Key resolution order:
 *   1. window.ENV.XAI_API_KEY  (set by env-config.js on local dev)
 *   2. localStorage 'xai_api_key' (entered via Settings panel)
 */

(function () {
  var BASE_URL    = 'https://api.x.ai/v1';
  var TEXT_MODEL  = 'grok-2-latest';
  var IMAGE_MODEL = 'grok-2-image-1212';

  // ── Key resolution ──────────────────────────────────────────────────────────
  function getKey() {
    var env = (window.ENV || {}).XAI_API_KEY || '';
    if (env && env !== 'YOUR_XAI_KEY_HERE') return env;
    return localStorage.getItem('xai_api_key') || '';
  }

  function hasKey() { return !!getKey(); }

  // ── Prompt enhancement ──────────────────────────────────────────────────────
  // Takes a raw user prompt and returns a Remotion-optimised version via Grok.
  async function enhancePrompt(rawPrompt) {
    var key = getKey();
    if (!key) throw new Error('No xAI API key set. Add it in ⚙️ Settings.');

    var res = await fetch(BASE_URL + '/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + key,
      },
      body: JSON.stringify({
        model: TEXT_MODEL,
        max_tokens: 220,
        messages: [
          {
            role: 'system',
            content: [
              'You are a Remotion animation expert. The user describes a video they want.',
              'Rewrite their prompt to be richer and more specific for Remotion code generation.',
              'Include: animation type (fade/slide/zoom/rotate/bounce/typewriter),',
              'background colour, text content, duration, and any visual details.',
              'Return ONLY the enhanced prompt — no explanation, no quotes, no preamble.',
              'Keep it under 120 words.',
            ].join(' '),
          },
          { role: 'user', content: rawPrompt },
        ],
      }),
    });

    if (!res.ok) {
      var err = await res.json().catch(() => ({}));
      throw new Error('xAI error ' + res.status + ': ' + (err.error?.message || res.statusText));
    }

    var data = await res.json();
    return (data.choices[0].message.content || '').trim();
  }

  // ── Image generation ────────────────────────────────────────────────────────
  // Generates an image from a text description.
  // Returns { url, b64 } — one will be populated depending on response_format.
  async function generateImage(description) {
    var key = getKey();
    if (!key) throw new Error('No xAI API key set. Add it in ⚙️ Settings.');

    var res = await fetch(BASE_URL + '/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + key,
      },
      body: JSON.stringify({
        model:           IMAGE_MODEL,
        prompt:          description,
        n:               1,
        response_format: 'url',
      }),
    });

    if (!res.ok) {
      var err = await res.json().catch(() => ({}));
      throw new Error('xAI image error ' + res.status + ': ' + (err.error?.message || res.statusText));
    }

    var data = await res.json();
    var item = data.data[0];
    return { url: item.url || '', b64: item.b64_json || '' };
  }

  // ── Public API ──────────────────────────────────────────────────────────────
  window.xAI = {
    getKey:        getKey,
    hasKey:        hasKey,
    setKey:        function (k) { localStorage.setItem('xai_api_key', k); },
    clearKey:      function ()  { localStorage.removeItem('xai_api_key'); },
    enhancePrompt: enhancePrompt,
    generateImage: generateImage,
  };
})();
