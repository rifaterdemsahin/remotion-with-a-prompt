# ✨ Origin Prompt

> The single prompt that describes this repo's own creation.

---

## The Prompt

```
Fade in gradient text saying "A prompt created this." on deep purple background,
typewriter reveals remotion-with-a-prompt below,
zoom in for 6 seconds,
fade out at end
```

---

## Why This Exists

This repo is **self-referential** — it was built by a prompt, and it builds prompts.

The origin prompt captures that loop:

```
prompt → tool → prompt → video
```

Entering it into the studio generates a Remotion composition that animates
the story of how the repo itself came to exist.

---

## What It Generates

| Element | Animation |
|---------|-----------|
| Background | Deep purple `#1a0533` fill |
| Line 1 text | `"A prompt created this."` — fade in gradient (pink → violet → green) |
| Line 2 text | `remotion-with-a-prompt` — typewriter reveal |
| Overall | Zoom in spring over 6 seconds |
| End | Fade out via `interpolate` in final 0.5s |

---

## The Meta Loop

```
1. User types:  "Create remotion outputs and take a prompt input"
                          ↓
2. Claude builds: remotion-with-a-prompt repo
                          ↓
3. Repo contains: a studio that takes prompt input
                          ↓
4. Studio generates: Remotion TSX from "A prompt created this."
                          ↓
5. Remotion renders: a video of the origin story
```

The origin prompt closes the loop — the tool's first output should be its own creation story.

---

## Try It

Open the [Prompt Studio](../index.html) and click the **✨ Origin Prompt** card at the top.
