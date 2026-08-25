

## Administrative sign-in

The `/admin/login` and `/control` routes require server-only environment variables. Configure `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`, and optionally `ADMIN_ROLE` (`admin` or `super_admin`) in Vercel Project Settings → Environment Variables. Never prefix these values with `VITE_`, never place them in client code, and never commit the generated password hash or session secret. Generate the password hash using the existing server helper or a one-time secure server-side script; the browser only receives an HttpOnly signed session cookie after successful verification.
