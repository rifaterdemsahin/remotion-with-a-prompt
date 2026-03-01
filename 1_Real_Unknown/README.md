# ❓ Real Unknown — The "Why"

> Stage 1 of 7: Transform the unknown into the known.

## Problem Statement

Creating video animations traditionally requires deep knowledge of video editing tools, animation software, or programming libraries like Remotion. The barrier to entry is high for content creators who can *describe* what they want but can't code it.

**The Unknown:** Can a natural language prompt + image input be reliably transformed into a working Remotion video composition?

## Core Unknowns

| # | Unknown | Risk Level |
|---|---------|-----------|
| 1 | Prompt parsing accuracy for animation keywords | Medium |
| 2 | CSS preview matching Remotion output | High |
| 3 | Image loading in both web preview and Remotion | Low |
| 4 | Static GitHub Pages hosting for a "video studio" | Low |
| 5 | Code generation quality for edge-case prompts | High |

## The Hypothesis

> "If we build a prompt parser that maps natural language animation descriptions to Remotion API calls, we can generate 80%+ accurate Remotion compositions from plain English."

## Why Remotion?

- React-based: component model is perfect for AI code generation
- TypeScript: strong typing reduces generation errors
- Active ecosystem: widely used for programmatic video
- CSS-compatible: preview in browser without Node.js
