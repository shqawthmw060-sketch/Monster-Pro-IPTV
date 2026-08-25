# MONSTER IPTV — Milestone 1: Foundation (Clean Start)

## Requirements
- Milestone 32: Playback & Media Player System.
- Real, server-authoritative playback authorization, stream sessions, concurrent stream limits, secure source handoff, live/VOD player, progress persistence, and resilient reconnects.
- NO fake streams, NO fake credentials, NO client-side authorization bypass.

## Checklist
- [x] Milestone 31 completed: Favorites, Watchlist & User Library.
- [ ] Audit existing player, auth, device, entitlement, and stream session schemas.
- [ ] Define server playback contracts, decision outcomes, and secure source tokens.
- [ ] Implement PlaybackService and persistent session management with concurrency limits.
- [ ] Build reusable MediaPlayer and integrate VOD/live controls, subtitles, audio tracks, and buffering.
- [ ] Connect player routes to library progress, resume/start-over, and series episode navigation.
- [ ] Validate playback security, concurrency limits, build, and Milestone 32 report.


## Public Vercel URL diagnosis — 2026-08-23
- [ ] Check https://monster-pro-iptv.vercel.app/ HTTP response and rendered content.
- [ ] Compare the public deployment with GitHub `origin/main`.
- [ ] Confirm the deployment uses commit `b5445482d1b6ae25f61af4ed99a3a2b5b4cab219`.
- [ ] Verify the public URL renders MONSTER IPTV and not a build error or source file.
- [ ] Do not claim the deployment works without direct verification.

**Status:** public deployment diagnosis in progress.


## Vercel settings and redeploy — 2026-08-23
- [ ] Open the Vercel project settings for `monster-pro-iptv`.
- [ ] Confirm the connected repository is `Monster-Pro-IPTV` on branch `main`.
- [ ] Set Framework Preset to `Other` or `Vite`, not Next.js.
- [ ] Set Root Directory to the repository root containing package.json.
- [ ] Set Install Command to `pnpm install`.
- [ ] Set Build Command to `pnpm build`.
- [ ] Set Output Directory to the verified Vite output.
- [ ] Redeploy the current main branch without cache.
- [ ] Verify the public URL, JavaScript asset, and CSS asset after redeploy.

**Status:** Vercel configuration correction in progress; no new milestone started.


## Brand icon upload — 2026-08-23
- [ ] Copy the supplied image to `assets/icon-only.png`.
- [ ] Confirm the asset is a valid PNG with the expected dimensions.
- [ ] Commit only the new asset on branch `main`.
- [ ] Push without force-push to the official GitHub repository.
- [ ] Verify the asset exists on `origin/main`.

**Status:** icon upload in progress; application source remains unchanged.


## Icon integration — 2026-08-23
- [ ] Inspect existing header/home markup and favicon declarations.
- [ ] Use `assets/icon-only.png` in the MONSTER IPTV header and homepage.
- [ ] Add the icon as the site favicon without duplicating or regenerating the asset.
- [ ] Validate image paths in the Vite build and production preview.
- [ ] Commit and push only the intended UI integration changes.

**Status:** icon integration in progress.


## Feature catalog analysis — 2026-08-23
- [ ] Parse the attached 1000-feature catalog.
- [ ] Group features by domain and dependency.
- [ ] Compare the catalog with the current MONSTER IPTV repository.
- [ ] Identify already implemented, partial, missing, and blocked features.
- [ ] Propose one prioritized implementation roadmap before coding.

**Status:** analysis only; no feature implementation started.


## Missing features implementation — 2026-08-23
- [ ] Confirm the target repository and active WebDev project are the same project.
- [ ] Upgrade the target to a real full-stack foundation only if required and approved.
- [ ] Add persistent catalog, categories, search, and authorized import flows.
- [ ] Add authentication, roles, profiles, devices, and personal library.
- [ ] Add server-authoritative playback and authorized-provider integration.
- [ ] Add subscriptions, payment webhooks, entitlements, and operations analytics.
- [ ] Run type checking, tests, production build, and representative route verification.

**Status:** implementation requested; source changes have not started in this phase.


## Full-stack foundation approved — 2026-08-23
- [ ] Upgrade the correct target project `/home/ubuntu/monster-iptv-zero` to full-stack capabilities.
- [ ] Configure PostgreSQL access through the server-only `DATABASE_URL` environment variable.
- [ ] Add Drizzle configuration and persistent schema without replacing existing architecture.
- [ ] Apply schema safely and verify with a real database query.
- [ ] Add the first real API and UI routes only after the foundation passes checks.

**Status:** user approved implementation of the full-stack foundation; no application code changed yet in this phase.


## Vercel build failure — 2026-08-24
- [ ] Fix `client/index.html` analytics placeholders that fail Vite production interpolation when `VITE_ANALYTICS_ENDPOINT` and `VITE_ANALYTICS_WEBSITE_ID` are absent.
- [ ] Preserve analytics when configured and make the build safe when analytics are not configured.
- [ ] Run local `pnpm build`, `pnpm check`, and `pnpm test` after the fix.
- [ ] Commit and push only the build fix after verification; do not add Next.js.

**Evidence:** Vercel commit `4c85a69` ran `pnpm build` and failed at `client/index.html: %VITE_ANALYTICS_ENDPOINT%/umami`.


## Vercel redeploy follow-up — 2026-08-24
- [ ] Push the verified analytics-loading build fix so Vercel no longer uses the stale `client/index.html` interpolation.
- [ ] Confirm Vercel builds the commit containing the conditional analytics loader.
- [ ] Verify the deployed URL after a successful build.

**Evidence:** attached Vercel log cloned commit `4c85a69` and failed on the old `%VITE_ANALYTICS_ENDPOINT%/umami` reference. The local fix is newer and has not yet been deployed.


## Vercel wrong output diagnosis — 2026-08-24
- [ ] Confirm the Vercel Output Directory matches the actual frontend HTML location.
- [ ] Keep `dist/public` as the static frontend output; do not expose `dist/index.js` as the site root.
- [ ] Decide whether server hosting requires a separate runtime deployment; Vercel static output must not serve the server bundle as HTML.
- [ ] Verify the deployed response content type and root page after correction.

**Evidence:** the deployed page visibly renders the bundled server source, while local build creates `dist/public/index.html` and `dist/index.js` separately.


## MAC account access flow approved — 2026-08-24
- [ ] Inspect the current client routes and existing old category page.
- [ ] Define server-side account records for MAC, username, password hash, status, and subscription expiry.
- [ ] Create a secure session flow; never store raw passwords in localStorage or expose them to the client.
- [ ] Add first-visit login gate and remembered session behavior.
- [ ] Add WhatsApp subscription CTA for `01508536392` without claiming payment or activation.
- [ ] Add admin account provisioning and activation controls.
- [ ] Restore the old category page after a valid active subscription.
- [ ] Test unauthenticated, pending, active, expired, admin, and remembered-session states.

**Status:** scope approved; implementation begins after architecture inspection.


## Neon SQL Editor evidence — 2026-08-24
- Neon project: `proud-violet-43015621`.
- Branch shown: `production`.
- Database shown: `neondb`.
- The SQL Editor is open and ready to run SQL.
- The migration must include the current account/session tables, not only the original baseline tables.

## Neon schema reconciliation — 2026-08-24
- [ ] Reconcile Neon IPTV schema mismatch: Neon `iptv_accounts` uses text `account_id`/`user_id` and `password`, while project migration expects UUID `id`/`created_by_user_id` and `password_hash`; do not alter existing columns until constraints and server schema are reviewed.
- [ ] Verify primary/unique constraints and foreign keys for `iptv_accounts` and `iptv_sessions` before adding any relationship.
- [ ] Confirm password storage is compatible with the server authentication implementation; never insert plaintext credentials.

**Evidence:** Neon column inspection showed `iptv_accounts.account_id` and `iptv_accounts.user_id` are `text`; `iptv_sessions.account_id` is also `text`; `iptv_accounts` has a `password` column rather than `password_hash`, and no `id` column was shown.

## GitHub synchronization — 2026-08-25
- [ ] Review git status and diff before staging.
- [ ] Scan for DATABASE_URL, environment files, credentials, and plaintext secrets.
- [ ] Run TypeScript, tests, and production build.
- [ ] Commit only intended Neon/Drizzle/auth changes.
- [ ] Push to origin/main after verification.
- [ ] Verify remote commit and key files after push.
- [ ] Do not create admin credentials or fake IPTV data automatically.

## Authorized content repository discovery
- [x] Confirm the legal/authorized source and its API or feed format: licensed Xtream Codes API.
- [ ] Define normalized movie and series metadata plus stream-link policy for Xtream VOD.
- [ ] Design secure server-to-server integration with MONSTER IPTV.
- [ ] Separate ingestion, validation, caching, and client delivery.

## Content delivery repository discovery
- [x] Confirm repository 3 transfers metadata/authorized URLs only; do not copy media files.
- [ ] Define publish states, idempotency, retries, and deletion behavior for metadata and authorized URLs.
- [ ] Define secure server-to-server authentication with MONSTER IPTV and separate Xtream credentials.
- [ ] Confirm the target application API and database ownership before implementation.

## Desktop build — discovery
- [ ] Inspect current web build and desktop packaging options.
- [ ] Choose a desktop wrapper that preserves the existing web and Android targets.
- [ ] Add Windows and macOS build scripts without committing signing secrets.
- [ ] Validate desktop packaging and document platform limitations.

## Android signing security review — 2026-08-25
- [ ] Ensure Android keystore and keystore.properties are never committed.
- [ ] Remove signing secrets from Git staging before any push.
- [ ] Review Android build configuration for CI-safe signing variables.

## Codespaces Git sync conflict — 2026-08-25
- [ ] Compare Codespaces working tree with origin/main before merging.
- [ ] Identify missing client paths and newly added Capacitor/Android files.
- [ ] Merge remote changes safely without force-push or destructive reset.
- [ ] Re-run checks after resolving the synchronization conflict.


## Control Hub Access Incident
- [ ] تدقيق route `/control` ومكوّن Control Hub وحارس الصلاحيات.
- [ ] مراجعة مطابقة أدوار `admin` و`super_admin` مع الحساب المنشور.
- [ ] فحص متغيرات البيئة المطلوبة للإدارة في deployment دون طباعة قيمها.
- [ ] اختبار رفض المستخدم العادي والسماح للحساب الإداري الحقيقي.
- [ ] رفع الإصلاح بعد نجاح TypeScript والاختبارات والبناء.


## Admin Login and Subscription CTA
- [ ] تدقيق نموذج `users` والأدوار والجلسات الحالية.
- [ ] إضافة جلسة إدارية خادمية آمنة مع تحقق `admin` و`super_admin`.
- [ ] إضافة `/admin/login` و`/control` مع حماية المسار والـ API.
- [ ] الحفاظ على صفحة دخول MAC + Username + Password للعملاء.
- [ ] إضافة زر اشتراك يفتح WhatsApp على `01508536392`.
- [ ] اختبار الرفض والسماح والبناء قبل الرفع إلى GitHub.


## Attached Control Hub Specification
- [ ] مقارنة مواصفات Control Hub المرفقة مع المسارات والملفات الموجودة فعليًا.
- [ ] فصل واجهة الإدارة عن تطبيق العملاء بصريًا ومساريًا.
- [ ] استخدام بيانات Neon الحقيقية فقط مع حالات واضحة عند عدم توفر البيانات.
- [ ] تغطية المستخدمين والأجهزة والمحتوى والأفلام والمسلسلات والمواسم والحلقات والمصادر والبث المباشر.
- [ ] تغطية المزامنة والاشتراكات والتحليلات والإعدادات والأمان وسجل التدقيق.
- [ ] منع أي روابط أو إحصاءات أو مستخدمين وهميين، وإبقاء العمليات الحساسة خادمية.
- [ ] توثيق الميزات غير المتصلة بBackend فعلي بدل عرضها كميزات مكتملة.


## Published Admin Route Incident
- [ ] اختبار الرابط المنشور `/login/admin` مقابل `/admin/login`.
- [ ] التأكد من commit Vercel ومتغيرات ADMIN المطلوبة.
- [ ] إضافة redirect توافقية إذا كان المسار القديم مطلوبًا.
- [ ] إعادة فحص البناء والتحقق من المسار بعد النشر.


## React Error 31
- [ ] البحث عن مواضع عرض قيم API أو أخطاء ككائنات داخل JSX.
- [ ] إضافة دالة آمنة لتحويل `{ code, message }` وأي Error إلى نص قابل للعرض.
- [ ] اختبار نجاح وفشل تسجيل الدخول الإداري وغياب API.
- [ ] إعادة البناء ورفع الإصلاح بعد نجاح التحقق.
