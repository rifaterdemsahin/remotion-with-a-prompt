# ⚡ Claude Performance Formula

> How fast? How many tokens? How much does it cost?
> Formulas and reference data for every Claude model.

---

## 📐 Core Formulas

### Total Response Time

```
total_time (s) = TTFT + (output_tokens / tokens_per_second)
```

| Variable | Description |
|----------|-------------|
| `TTFT` | Time To First Token — server latency before streaming starts |
| `output_tokens` | Number of tokens in the response |
| `tokens_per_second` | Streaming throughput of the model |

**Example — Sonnet 4.6, 500-token reply:**
```
total_time = 1.0s + (500 / 100) = 1.0 + 5.0 = 6.0 seconds
```

---

### Token ↔ Word Conversion

```
words  ≈ tokens × 0.75       (English prose)
tokens ≈ words  / 0.75  =  words × 1.33

characters ≈ tokens × 4
tokens     ≈ characters / 4
```

**Quick reference:**

| Tokens | ≈ Words | ≈ Characters |
|--------|---------|-------------|
| 100 | 75 | 400 |
| 500 | 375 | 2,000 |
| 1,000 | 750 | 4,000 |
| 4,000 | 3,000 | 16,000 |
| 8,000 | 6,000 | 32,000 |
| 100,000 | 75,000 | 400,000 |
| 200,000 | 150,000 | 800,000 |

---

### Cost Formula

```
cost ($) = (input_tokens  / 1,000,000 × input_price_per_MTok)
         + (output_tokens / 1,000,000 × output_price_per_MTok)
```

**Example — Sonnet 4.6, 1k input + 500 output tokens:**
```
cost = (1000 / 1,000,000 × $3.00) + (500 / 1,000,000 × $15.00)
     = $0.003 + $0.0075
     = $0.0105  (~1 cent)
```

---

### Throughput (batch efficiency)

```
throughput (tok/s) = total_output_tokens / wall_clock_seconds

utilisation (%) = (output_tokens / max_output_tokens) × 100
```

---

## 🤖 Model Performance Reference

### claude-haiku-4-5 — `claude-haiku-4-5-20251001`
_Fastest. Best for high-volume, latency-sensitive tasks._

| Metric | Value |
|--------|-------|
| Output speed | ~200–300 tok/s |
| Time to first token (TTFT) | ~0.3–0.8 s |
| Context window | 200,000 tokens |
| Max output | 8,192 tokens |
| Input price | $0.80 / 1M tokens |
| Output price | $4.00 / 1M tokens |

**Time examples (TTFT = 0.5s assumed):**

| Output tokens | Time |
|---------------|------|
| 100 | 0.9 s |
| 500 | 2.5 s |
| 1,000 | 4.7 s |
| 4,000 | 17.3 s |
| 8,000 | 33.8 s |

---

### claude-sonnet-4-6 — `claude-sonnet-4-6`
_Balanced. Best for coding, analysis, and general tasks._

| Metric | Value |
|--------|-------|
| Output speed | ~80–120 tok/s |
| Time to first token (TTFT) | ~0.5–1.5 s |
| Context window | 200,000 tokens |
| Max output | 8,192 tokens (64k with extended thinking) |
| Input price | $3.00 / 1M tokens |
| Output price | $15.00 / 1M tokens |

**Time examples (TTFT = 1.0s assumed):**

| Output tokens | Time |
|---------------|------|
| 100 | 2.0 s |
| 500 | 6.0 s |
| 1,000 | 11.0 s |
| 4,000 | 41.0 s |
| 8,000 | 81.0 s |

---

### claude-opus-4-6 — `claude-opus-4-6`
_Most capable. Best for complex reasoning and writing._

| Metric | Value |
|--------|-------|
| Output speed | ~40–70 tok/s |
| Time to first token (TTFT) | ~1.0–3.0 s |
| Context window | 200,000 tokens |
| Max output | 8,192 tokens (32k with extended thinking) |
| Input price | $15.00 / 1M tokens |
| Output price | $75.00 / 1M tokens |

**Time examples (TTFT = 2.0s assumed):**

| Output tokens | Time |
|---------------|------|
| 100 | 4.0 s |
| 500 | 11.8 s |
| 1,000 | 21.5 s |
| 4,000 | 82.7 s |
| 8,000 | 163.3 s |

---

## 📊 Side-by-Side Comparison

| Model | Speed (tok/s) | TTFT | Input $/1M | Output $/1M | Best for |
|-------|:---:|:---:|:---:|:---:|---------|
| Haiku 4.5 | 200–300 | 0.3–0.8s | $0.80 | $4.00 | High-volume, chat |
| Sonnet 4.6 | 80–120 | 0.5–1.5s | $3.00 | $15.00 | Coding, analysis |
| Opus 4.6 | 40–70 | 1.0–3.0s | $15.00 | $75.00 | Complex reasoning |

---

## 💡 Applied Examples for Remotion Prompt Studio

### Generating a Remotion Composition (typical output ~400 tokens)

| Model | Est. Time | Est. Cost |
|-------|-----------|-----------|
| Haiku 4.5 | ~2.3 s | $0.0026 |
| Sonnet 4.6 | ~5.0 s | $0.0075 |
| Opus 4.6 | ~9.5 s | $0.0300 |

_Calculation: input = 100 tokens (short prompt), output = 400 tokens_

### Full Conversation Session (10 exchanges, avg 300 output tok/exchange)

| Model | Est. Total Time | Est. Total Cost |
|-------|----------------|----------------|
| Haiku 4.5 | ~17 s | $0.014 |
| Sonnet 4.6 | ~35 s | $0.047 |
| Opus 4.6 | ~58 s | $0.227 |

---

## 🧮 Use the Calculator

→ **[Open Interactive Calculator](claude-performance.html)**

Plug in your own token counts and get instant estimates for time and cost.

---

## ⚠️ Caveats

- Speeds are **median estimates** under normal load; actual speeds vary with server load, prompt structure, and network latency
- TTFT increases with very long context inputs (>50k tokens)
- Extended thinking mode increases both output tokens and latency significantly
- Batch API offers ~50% cost discount but adds minutes of latency
- Prices current as of **2026-03-01** — check [anthropic.com/pricing](https://www.anthropic.com/pricing) for latest

---

## 🔗 References

- [Anthropic API Docs — Models Overview](https://docs.anthropic.com/en/docs/about-claude/models)
- [Anthropic Pricing](https://www.anthropic.com/pricing)
- [Claude API Rate Limits](https://docs.anthropic.com/en/api/rate-limits)
