# Cloudflare Redirect Rule — www → apex (manual, required)

Cloudflare **Pages** `_redirects` only supports **path-based** source patterns (e.g. `/about` → `/about/index.html`). It does **not** apply host-based rules like `https://www.nextcoresoft.com/*` → apex, and **Pages Functions** (`functions/_middleware.js`) do not run host redirect logic in this project.

**Do not rely on `public/_redirects` for www-to-apex.** Configure the rule below in the Cloudflare **dashboard** for zone `nextcoresoft.com`.

## Recommended Redirect Rule (301, preserve path and query)

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) → select zone **nextcoresoft.com**.
2. **Rules** → **Redirect Rules** → **Create rule**.
3. **Rule name:** `WWW to apex HTTPS (canonical host)`
4. **When incoming requests match…** → **Custom filter expression**:

```txt
(http.host eq "www.nextcoresoft.com")
```

5. **Then…** → **Redirect**:
   - **Type:** Dynamic
   - **Expression** (Redirect Rules “dynamic” URL):

```txt
concat("https://nextcoresoft.com", http.request.uri.path)
```

   - Enable **Preserve query string** (or append `?` + query in expression if your UI uses a checkbox).
   - **Status code:** **301** (Permanent Redirect)

6. **Deploy** the rule and move it **above** conflicting rules if any.

### Alternative (wildcard-style UI)

If your plan shows “Static redirect” with wildcard:

- **If:** Hostname equals `www.nextcoresoft.com`
- **Then:** Redirect to `https://nextcoresoft.com/${uri.path}` with query string preserved, status **301**.

(Exact labels vary by Cloudflare UI version; the filter `(http.host eq "www.nextcoresoft.com")` + apex URL with `${uri.path}` is the intent.)

## Verify (read-only, after saving the rule)

```powershell
curl.exe -I https://www.nextcoresoft.com/about/
```

Expect **301** (or single redirect chain) to **`https://nextcoresoft.com/about/`** on the **apex** host, not `200` on `www`.

## HTTP → HTTPS

Cloudflare **SSL/TLS** “Always Use HTTPS” (or automatic edge HTTPS) handles `http://` upgrades separately. This rule addresses **hostname canonicalization** only.

## Related docs

- `docs/HTTPS_CANONICAL_AUDIT.md` — why duplicate www/apex hurts canonical signals
- `docs/BING-WEBMASTER-FIX.md` — Bing property should use apex `https://nextcoresoft.com/`

No indexing or ranking outcome is guaranteed.
