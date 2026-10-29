# Supabase Auth setup — owner steps (keys)

Login page: `/login/` · Callback: `/auth/callback/` · After login: `/dashboard/`

## 1. Create / choose a Supabase project

Use a project dedicated to NextCoreSoft (do not reuse an unrelated client project).

## 2. Copy keys (frontend-safe only)

Supabase Dashboard → **Project Settings → API**:

- Project URL → `VITE_SUPABASE_URL`
- **Publishable key** → `VITE_SUPABASE_PUBLISHABLE_KEY`
  - Older project: anon key → `VITE_SUPABASE_ANON_KEY`
- **Never** share or commit a **service_role / secret key** for the website.

Create `.env.local` in the repo root (gitignored), then restart `npm run dev`.

## 3. Auth settings in Supabase

Dashboard → **Authentication → URL Configuration**:

- Site URL: `http://localhost:5173` while testing (production: `https://nextcoresoft.com`)
- Redirect URLs (add all):
  - `http://localhost:5173/auth/callback/`
  - `http://localhost:4173/auth/callback/`
  - `https://nextcoresoft.com/auth/callback/`

## 4. Social logins

Dashboard → **Authentication → Sign In / Providers**. Enable each one and paste that provider’s client id and secret. Every provider uses the same Supabase callback:

`https://<your-project-ref>.supabase.co/auth/v1/callback`

| Button on `/login/` | Supabase provider |
| --- | --- |
| Continue with Google | Google |
| Continue with Apple | Apple (Hide My Email is an Apple setting on the Services ID) |
| Continue with Facebook | Facebook |
| Continue with Microsoft | Azure |
| Continue with GitHub | GitHub |
| Continue with X | X (OAuth 2.0). The older Twitter provider is separate. |
| Continue with phone | Phone. Same button row as Google. Opens the mobile number and SMS code step. |

The buttons are already on the site. Each one stays inactive until that provider is enabled here.

## 5. Mobile number (SMS)

Providers → **Phone** → Enable, then connect an SMS sender (Twilio or the provider Supabase lists). **Continue with phone** sits in the same button list as Google. It asks for the mobile number, sends a one-time code with `signInWithOtp({ phone })`, and checks it with `verifyOtp`. Country code defaults to `+91`.

## 6. Email settings

Providers → Email: keep enabled for password + magic link. For production, configure a custom SMTP sender later so confirmation mails do not hit spam/rate limits.

## 7. Test checklist

1. `npm run dev`
2. Open `/login/` — no “Supabase setup pending” warning.
3. Test email signup/login.
4. Test a social button only after that provider is enabled (Google, Apple, Facebook, Microsoft, GitHub, X).
5. Test mobile login only after Phone and an SMS sender are enabled.
6. Confirm redirect to `/dashboard/` and Logout works.

After local testing, add the same two `VITE_SUPABASE_*` variables in Cloudflare Pages → Settings → Environment variables and redeploy.
