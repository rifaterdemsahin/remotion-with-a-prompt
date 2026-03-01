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

  // ── Structured param extraction ─────────────────────────────────────────────
  // Asks Grok to return JSON params matching the template schema.
  // Known animation values: fade|slide|zoom|bounce|rotate|typewriter|
  //   typewriter-cursor|particle|stagger|wave|counter|custom
  async function extractParams(rawPrompt) {
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
        max_tokens: 300,
        messages: [
          {
            role: 'system',
            content: [
              'You extract structured animation parameters from a Remotion video description.',
              'Return ONLY valid JSON with these keys:',
              '{"animation":"fade|slide|zoom|bounce|rotate|typewriter|typewriter-cursor|particle|stagger|wave|counter|custom",',
              '"slideDirection":"left|right|up|down","bgColor":"#hex","textContent":"string (max 60 chars)",',
              '"hasGradientText":false,"textColor":"#ffffff","hasLogo":false,',
              '"durationSec":5,"items":["item1","item2","item3"],"counterTarget":100}',
              'Rules: animation="custom" ONLY when no known type fits.',
              '"items" = list items for stagger animation (extract from prompt or use ["Step 1","Step 2","Step 3"]).',
              '"counterTarget" = number to count to (extract from prompt or default 100).',
              'Return ONLY the JSON object — no markdown, no explanation.',
            ].join(' '),
          },
          { role: 'user', content: rawPrompt },
        ],
      }),
    });

    if (!res.ok) {
      var err = await res.json().catch(() => ({}));
      throw new Error('xAI extractParams error ' + res.status + ': ' + (err.error?.message || res.statusText));
    }

    var data = await res.json();
    var raw = (data.choices[0].message.content || '').trim();
    // Strip markdown fences if model wraps in ```json
    raw = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '');
    return JSON.parse(raw);
  }

  // ── Custom TSX generation ────────────────────────────────────────────────────
  // When no template matches, generates a one-off Remotion component.
  async function generateCustomTSX(rawPrompt) {
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
        max_tokens: 900,
        messages: [
          {
            role: 'system',
            content: [
              'You are a Remotion v4 expert. Write a single valid TypeScript React component.',
              'Rules: import only from "remotion" (AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence, Img).',
              'Export: export const GeneratedComposition: React.FC = () => { ... }',
              'Use spring() and interpolate() — no CSS keyframes or setTimeout.',
              'Keep under 90 lines. Return ONLY the .tsx source — no markdown fences, no explanation.',
            ].join(' '),
          },
          { role: 'user', content: rawPrompt },
        ],
      }),
    });

    if (!res.ok) {
      var err = await res.json().catch(() => ({}));
      throw new Error('xAI generateCustomTSX error ' + res.status + ': ' + (err.error?.message || res.statusText));
    }

    var data = await res.json();
    var raw = (data.choices[0].message.content || '').trim();
    raw = raw.replace(/^```tsx?\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '');
    return raw;
  }

  // ── New template generation prompt ───────────────────────────────────────────
  // When a prompt doesn't match any template, generates a developer guide
  // for permanently adding this animation as a new template to the codebase.
  async function generateNewTemplatePrompt(rawPrompt) {
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
        max_tokens: 700,
        messages: [
          {
            role: 'system',
            content: [
              'You are helping a developer add a new animation template to a Remotion Prompt Studio app.',
              'The app has a parsePrompt() function, a routeToTemplate() router, a renderFrame() canvas renderer,',
              'and buildAnimationLogic()/buildJSX() for TSX code generation.',
              'Given the animation description, produce a DEVELOPER GUIDE with exactly these four sections:',
              '1. TEMPLATE ID: a short camelCase string (e.g. "morphText")',
              '2. KEYWORDS: JavaScript snippet to add to parsePrompt() to detect this animation',
              '3. CANVAS RENDER: Canvas 2D JavaScript code to add to renderFrame() for this animation',
              '4. TSX CODE: Remotion TSX animation logic + JSX to add to buildAnimationLogic()/buildJSX()',
              'Be concrete and copy-pasteable. No markdown headers — use plain numbered sections.',
            ].join(' '),
          },
          { role: 'user', content: 'Create a new template for: ' + rawPrompt },
        ],
      }),
    });

    if (!res.ok) {
      var err = await res.json().catch(() => ({}));
      throw new Error('xAI generateNewTemplatePrompt error ' + res.status + ': ' + (err.error?.message || res.statusText));
    }

    var data = await res.json();
    return (data.choices[0].message.content || '').trim();
  }

  // ── Public API ──────────────────────────────────────────────────────────────
  window.xAI = {
    getKey:                    getKey,
    hasKey:                    hasKey,
    setKey:                    function (k) { localStorage.setItem('xai_api_key', k); },
    clearKey:                  function ()  { localStorage.removeItem('xai_api_key'); },
    enhancePrompt:             enhancePrompt,
    generateImage:             generateImage,
    extractParams:             extractParams,
    generateCustomTSX:         generateCustomTSX,
    generateNewTemplatePrompt: generateNewTemplatePrompt,
  };
})();
