---
title: "Mapping the attack surface of a multi-service platform"
summary: "Most real findings live on the hosts nobody meant to expose. Notes on recon that goes past the main domain."
date: 2026-09-18
cat: "Recon"
lang: en
key: mapping-attack-surface
---

On a platform of any size, the main domain is the part that gets attention — and therefore the part that's usually hardened. The interesting findings tend to sit on everything *around* it: staging servers, admin panels, internal tools that quietly ended up reachable from the internet. This is a sanitized account of how a thorough recon phase turned up far more surface than the target expected.

## Start with the names

Subdomain enumeration is the cheapest high-value step there is. Certificate transparency logs, passive DNS, and brute-forcing common prefixes together surface hosts that were never meant to be public: `dev`, `test`, `staging`, `pos`, `scanner`, `tg`, `admin`. Each one is a separate application with its own assumptions about who can reach it — and those assumptions are usually weaker than the flagship.

In this engagement, the subdomain sweep roughly doubled the known surface. Several of the extra hosts ran on completely different servers and hosting providers, which matters: a hardened main site tells you nothing about the staging box that shares a database.

## Fingerprint everything, trust nothing

Every host got the same quick pass: open ports, server banners, response headers, framework tells. A few patterns repeated:

- An administrative interface exposed to the public internet with no network restriction. Even behind a login, that's a brute-force and credential-stuffing surface, plus any CVE in the admin software itself.
- Public API endpoints returning data with no authentication — enough to enumerate internal structure and feed later testing.
- A Content-Security-Policy header that referenced an internal address (`localhost:<port>`). The policy meant to protect the page instead leaked a detail about the backend architecture — a hint toward server-side request forgery.
- Verbose tech-stack disclosure in headers: framework names, versions, powered-by strings. None of these is a vulnerability by itself; together they hand an attacker a precise target list.

## Why this phase decides the engagement

Scanning the main domain and calling it done is how real issues get missed. The findings that mattered here weren't clever exploits — they were services that should never have been reachable, found by enumerating properly and looking at each host as its own target.

## Practical checklist

- Enumerate subdomains from multiple sources (CT logs, passive DNS, wordlists) and re-run periodically — surface changes.
- Resolve every host and note which server and provider it lives on. Group by infrastructure, not by name.
- Treat `dev`/`test`/`staging` as production from a security standpoint — they often share real data.
- Put admin panels and internal tooling behind a VPN or IP allowlist, not just a login form.
- Strip version and powered-by headers. They cost you nothing and save an attacker time.

## Takeaway

Recon isn't the boring part before the "real" testing — on most engagements it *is* the testing. The exploit is often just confirming what careful enumeration already told you was there.
