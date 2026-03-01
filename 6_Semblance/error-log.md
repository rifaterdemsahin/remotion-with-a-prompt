# 📝 Error Log

## 2026-03-01: fetch() CORS on file:// protocol
**Type:** warning
**Description:** Loading menu-debug.json, menu-content.json, search-index.json via fetch() fails when opening HTML files directly from the filesystem (file:// protocol). Browser CORS policy blocks cross-origin requests.
**Fix:** Use `npx serve .` from repo root to serve over HTTP. GitHub Pages serves over HTTPS, so production is unaffected.

---

## 2026-03-01: Canvas preview spring physics mismatch
**Type:** resolved
**Description:** Browser canvas 2D spring simulation doesn't precisely match Remotion's spring() implementation. Visual output differs by ~15% in timing.
**Fix:** Added "CSS Preview (live render)" label in preview box. Users are informed this is an approximation. The generated TSX code output is the accurate implementation.

---

## 2026-03-01: Cross-origin image loading in canvas
**Type:** resolved
**Description:** External image URLs loaded into Canvas were blocked by browser CORS policy, causing `getImageData` errors and broken preview.
**Fix:** Added `crossOrigin = 'anonymous'` to Image elements before setting src. Data URIs (file uploads) always work. Some external hosts still block CORS — in this case, the image thumbnail appears but canvas fallback shows placeholder box.

---

## 2026-03-01: Multi-animation sequence parsing
**Type:** error (open)
**Description:** Prompts containing multiple animation phases (e.g. "first bounce, then slide out") only apply the last detected animation keyword. The parser doesn't build a timeline.
**Workaround:** Use the generated code as a base and manually add Remotion `<Sequence from={X}>` wrappers to create the timeline.
**Future fix:** Add timeline/sequence parser that splits on "then", "after", "followed by" keywords.

---

## 2026-03-01: Nav JSON paths in subdirectory pages
**Type:** warning
**Description:** Pages in subfolders (e.g., `1_Real_Unknown/index.html`) use `data-root="../"` to resolve menu JSON paths. This works on HTTP server but fails on file:// protocol because relative path resolution differs.
**Fix:** Confirmed working on GitHub Pages. Local dev requires `npx serve .`.
