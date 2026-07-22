---
name: Replit beacon script visibility in mockup sandbox
description: Why beacon JS renders as visible text in preview iframes, and the fix.
---

## Problem
When the mockup-sandbox preview URL is loaded through the Replit proxy in a user's browser, the Replit beacon script (injected by both the Vite cartographer plugin server-side AND the proxy network layer) renders as visible scrollable text at the top of the page. This only happens in the user's browser, not in headless screenshot tools.

## Why it happens
The proxy performs a second beacon injection on top of the one the cartographer plugin already placed inside `<head>`. The second injection ends up in a position or form that the user's browser renders as visible body text (likely a `<script type="text/plain">` or a text node). CSS `script { display: none }` alone is insufficient because the browser has already painted the text by the time the stylesheet is parsed.

## Fix (in `artifacts/mockup-sandbox/index.html`)
Three-layer defence added as the first `<style>` block in `<head>`:

```css
script, noscript { display: none !important; }
html, body { overflow: hidden !important; }
#root { position: absolute !important; inset: 0 !important; overflow: auto !important; z-index: 1 !important; }
```

- `html/body overflow:hidden` clips any injected text that lands in normal flow before or after `#root`.
- `#root position:absolute; inset:0` takes it out of normal flow and covers the full viewport, sitting above any injected content.
- `script/noscript display:none` is a belt-and-suspenders rule.

**Why:** The fix must be in the first `<style>` block (before `<meta charset>`) so it applies before any proxy-injected content can paint.
