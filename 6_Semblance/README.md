# 🐛 Semblance — The "Scars"

> Stage 6 of 7: Honest documentation of what went wrong.

## Purpose

This folder captures the gap between the plan and reality. Every near-miss, error, and workaround is documented here so future developers don't repeat the same mistakes.

## Error Categories

| Category | Description |
|----------|-------------|
| 🔴 Open | Known bug, no fix yet |
| ⚠️ Warning | Known limitation, workaround available |
| ✅ Resolved | Was a problem, now fixed |

## Lessons Learned

1. **file:// vs http://** — Always test with a local server, not direct file open
2. **Canvas ≠ Remotion** — Preview is approximate; set expectations clearly
3. **CORS on images** — Base64 is the safest for preview; URLs have restrictions
4. **Prompt complexity** — Simple vocabularies beat clever NLP for code gen
5. **GitHub Pages paths** — Relative paths from root work; absolute paths break

## How to Add an Entry

Add to `error-log.md`:
```markdown
## YYYY-MM-DD: Error title
**Type:** error | warning | resolved
**Description:** What happened
**Fix:** What was done (or "Workaround: ...")
```
