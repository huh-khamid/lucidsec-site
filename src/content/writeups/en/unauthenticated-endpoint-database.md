---
title: "When an unauthenticated endpoint quietly talks to the database"
summary: "An endpoint that answers before checking who's asking is a problem even when it returns an error. On error timing, injection surface, and auth order."
date: 2026-09-25
cat: "Web / API"
lang: en
key: unauthenticated-endpoint-database
---

A custom API route took a POST request, started processing the arguments, reached the database, and *then* failed — returning a 500 after a few seconds. No authentication was required to get that far. This is a sanitized note on why "it just errors out" is not the reassurance it sounds like.

## The error is the finding

An endpoint that errors *after* touching the database has already told you several things:

- **Authorization runs too late, or not at all.** Reaching the database before checking the caller's identity means the access-control decision happens after the sensitive work has started. That ordering is the bug, independent of what the endpoint returns today.
- **There's an injection surface.** If unauthenticated input flows into a query far enough to cause a database-level error, the question is no longer *whether* input reaches the query — it's whether it's parameterized. A ~3-second delay before a 500 is a strong hint that the server is doing real query work on attacker-controlled data.
- **Error behavior leaks structure.** Timing differences and error types are themselves information: which inputs are processed, which fields exist, how the backend is shaped.

## How you'd confirm it safely

On an authorized engagement, you confirm the class without going destructive: compare response times and error types across benign inputs, check whether the endpoint distinguishes "valid-but-unauthorized" from "malformed," and look for any reflection of input in errors. The goal is to characterize the flaw and its impact for the report — not to dump data.

## The fix is an ordering fix

- **Authenticate and authorize first.** Every route, including internal-looking custom ones, checks identity and permission *before* it does anything else. In most frameworks that's one guard (`current_user_can()`, a middleware, a decorator) at the top of the handler.
- **Parameterize every query.** No string-built SQL with request data, ever. Use the ORM or bound parameters.
- **Fail closed and fail quiet.** Return a generic error. Don't leak stack traces, query fragments, or timing that maps to internal logic. Turn off debug mode in production.
- **Inventory your custom routes.** Framework defaults are usually fine; the risky endpoints are the bespoke ones someone added for a one-off feature and never threat-modeled.

## Takeaway

"It only returns an error" describes the symptom, not the severity. An unauthenticated request that reaches your database has already crossed the boundary that mattered — the error is just where it happened to stop this time.
