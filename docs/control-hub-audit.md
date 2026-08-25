# تدقيق Control Hub — MONSTER IPTV

## النتيجة الحالية

المستودع الحالي هو تطبيق React/Vite مع خادم Express وDrizzle/PostgreSQL. التطبيق العميل يحتوي على دخول MAC + Username + Password للجمهور، بينما لا توجد في الفرع الحالي طبقة كاملة مستقلة لإدارة Control Hub.

## الموجود فعليًا

| المجال | الموجود | الحالة |
|---|---|---|
| حسابات العملاء | `iptv_accounts` و`iptv_sessions` ومسارات `/api/access/*` | يعمل كمسار العملاء |
| الأدوار | enum `user_role` بقيم `user`, `admin`, `super_admin` في جدول `users` | موجود في المخطط، لكن لا توجد مصادقة دخول كاملة مبنية عليه |
| المحتوى | `media_items`, `media_sources`, `categories` وواجهات الكتالوج والمزامنة | موجود جزئيًا ويعرض المنشور المصرح به فقط |
| الأجهزة | جدول `devices` | موجود في المخطط دون Control Hub CRUD مكتمل |
| الاشتراكات | جدول `subscriptions` | موجود في المخطط دون شاشة إدارة مكتملة |
| السجل | جدول `audit_logs` | موجود في المخطط دون شاشة بحث/تصفية مكتملة |
| الإدارة | `/admin/login` و`/control` وملفات `server/admin/routes.ts` | أساس أولي؛ يحتاج APIs وواجهات حقيقية |
| الاشتراك | زر WhatsApp في صفحة دخول العميل على `01508536392` | موجود |

## المفقود

لا توجد حاليًا صفحات مستقلة مكتملة لإدارة المستخدمين والأجهزة والأفلام والمسلسلات والمواسم والحلقات والمصادر والبث المباشر والفئات والمزامنة والاشتراكات والتحليلات والإعدادات والسجلات. كما لا توجد APIs إدارية كافية لتغذية هذه الصفحات من Neon، ولا ينبغي عرض أرقام أو عناصر تجريبية بدل البيانات الحقيقية.

## قرار التنفيذ

سيتم تنفيذ Control Hub على مراحل، بدءًا من عقد جلسة الإدارة ومسارات القراءة الآمنة وإطار التنقل الإداري، ثم إضافة كل مجال ببيانات Neon الحقيقية وحالات `Not connected` أو `No data available yet` عند غياب endpoint أو بيانات. لن تتم إضافة روابط فيديو أو مستخدمين أو إحصاءات وهمية، ولن تعتمد الحماية على حارس الواجهة وحده.

## مسارات مقترحة

`/admin/login`, `/control`, `/control/dashboard`, `/control/users`, `/control/devices`, `/control/content`, `/control/movies`, `/control/series`, `/control/seasons`, `/control/episodes`, `/control/sources`, `/control/streams`, `/control/categories`, `/control/live`, `/control/subscriptions`, `/control/analytics`, `/control/settings`, `/control/security`, `/control/logs`.

## متطلبات البيئة

يجب ضبط `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`, و`ADMIN_ROLE` على الخادم أو Vercel فقط. لا يجوز وضعها تحت `VITE_*` أو داخل GitHub أو الواجهة. لا يتم إنشاء حساب مدير أو كلمة مرور تلقائيًا.
