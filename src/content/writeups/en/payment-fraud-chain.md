---
title: "Chaining CORS, IDOR and a missing rate limit into payment fraud"
summary: "Three findings that look mild on their own line up into a path for charging someone else's card. A look at how low-severity bugs compound."
date: 2026-09-30
cat: "Web"
lang: en
key: payment-fraud-chain
---

Severity ratings are assigned per finding. Attackers don't attack per finding — they attack the gap between them. This is a sanitized walkthrough of a real black-box engagement where three issues, each arguably "medium" in isolation, chained into a realistic payment-fraud scenario.

## The three pieces

**1. A permissive CORS policy.** The payment host reflected whatever `Origin` it was given and set `Access-Control-Allow-Credentials: true`. That combination means any website a victim visits can make authenticated requests to the payment API *as the victim* and read the responses. `Origin: null` and arbitrary subdomains were accepted too, so the usual "only https origins" assumptions didn't hold.

**2. Sequential order IDs (IDOR).** Orders were numbered incrementally from a low starting value. Requesting an ID returned a different error for "exists" versus "not found," which is enough to enumerate the full range — in this case millions of valid order references — without any authentication.

**3. No rate limiting on the OTP step.** The one-time-password confirmation endpoint accepted unlimited attempts. Parallelized, the full OTP space was exhaustible in hours, not years.

## Why that chains

None of these is dramatic alone. A permissive CORS policy on a page with no sensitive data is noise. IDOR on a resource that reveals only "this order exists" sounds low-impact. A missing rate limit on OTP matters only if you can reach the step.

Put together, they describe a full attack:

1. CORS lets a malicious page issue credentialed calls to the payment API from the victim's browser.
2. IDOR supplies valid order references to target — no guessing.
3. The unauthenticated payment endpoints accept those references.
4. The missing rate limit makes brute-forcing the OTP that "protects" the transaction practical.

The result is a path to completing a charge against a card the attacker never had. The business logic assumed each step was gated by the one before it. None of them actually were.

## How to catch it in your own stack

- Treat `Access-Control-Allow-Origin` as an allowlist, never a reflection. If you're echoing `Origin` back, that's the bug — especially with credentials enabled.
- Use non-sequential, non-guessable identifiers (UUIDs) for anything referenced across a trust boundary, and still enforce authorization on each request. Unguessable IDs are defense in depth, not the control itself.
- Rate-limit and lock out on *every* sensitive action — login, OTP, payment confirmation — not just the front door. Count attempts server-side, per account and per IP.
- Review flows as chains, not checklists. Ask "what does an attacker reach if this one control fails?" for each step.

## Takeaway

The most interesting findings on an engagement are rarely the single critical bug. They're the quiet mediums that the threat model assumed couldn't line up — and did. When you report, report the chain, not just the parts: it's the difference between a developer closing one ticket and a team fixing the actual risk.
