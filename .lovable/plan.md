# خطة الإنهاء الكامل لمنصة Shro.AI

الهدف: موقع كورسات production-ready — كل صفحة نضيفة، كل flow شغّال، Backend سليم، وE2E tests بتأكد إن كل حاجة بتشتغل.

## الحالة الحالية (مراجعة)

**شغّال:**
- 13 صفحة (Index, Courses, CourseDetail, LessonView, Auth, ResetPassword, Pricing, Account, About, Contact, CheckoutSuccess/Cancel, NotFound)
- 15 كورس محلي (src/content/courses) كاملين بـ AR/EN + فيديو + quiz + مشروع
- Auth + Subscription + lesson_progress + webhook (subscriptions + lifetime)
- SiteShell موحّد للنفيجيشن/فوتر/مبدّل اللغة

**مشاكل لازم تتحل:**
1. **`Index.tsx` مش بيستخدم `SiteShell`** — تصميم مختلف عن باقي الموقع، فيه `alert()` بدل toast، فورم وهمي، نفيجيشن منفصل. لازم يتعمل refactor.
2. **خطة Lifetime** — `dodo_product_id` فاضي → الشراء هيفشل. (مهمة المستخدم في Dodo)
3. **مفيش E2E tests** — مفيش playwright/vitest installed.
4. **Polish ناقص:** SEO tags لكل صفحة، loading states، error boundaries، 404 صديق.

## التنفيذ

### 1. توحيد صفحة Index على SiteShell
- إعادة بناء `Index.tsx` ليستخدم `SiteShell` (نفس الهيدر/فوتر/مبدّل اللغة).
- استبدال `alert()` بـ `toast`.
- استبدال الفورم الوهمي بكتابة فعلية في `contact_messages` (أو حذفه وتوجيه لـ `/contact`).
- إبقاء الـ hero video والـ sections الجمالية لكن مع التوكنات الموحّدة.
- عرض ديناميكي لأحدث 4 كورسات من `@/content`.
- ربط كل CTAs بـ `/courses` و `/pricing` فعلياً.

### 2. تحسينات صغيرة على باقي الصفحات
- **SEO**: استخدام `Seo.tsx` الموجود في كل صفحة (title + description + canonical).
- **Account**: تجميع الـ progress per-course (بدل total فقط) + شريط تقدم لكل كورس.
- **NotFound**: زرار رجوع للرئيسية + تصميم على SiteShell.
- **LessonView**: زرار "Mark complete" يحفظ بدون quiz لو مفيش quiz.
- **Pricing**: إضافة badge "أكثر شيوعاً" للـ Yearly.
- **CourseDetail**: عرض المشروع النهائي (`course.project`).

### 3. Backend
- مراجعة edge functions (deploy auto). 
- التأكد إن `dodo-webhook` بيتعامل مع `payment.failed` للـ lifetime.
- إضافة تعليمات واضحة للمستخدم لإكمال إعداد Dodo Lifetime product.

### 4. E2E Tests (Playwright)
تثبيت Playwright وإنشاء tests:
- `home.spec.ts`: الصفحة الرئيسية تفتح + الـ CTAs بتوصل للأماكن الصح.
- `courses.spec.ts`: قائمة الكورسات تظهر، الفلترة شغّالة، البحث شغّال، الكليك على كورس بيوديني لصفحة التفاصيل.
- `course-detail.spec.ts`: صفحة كورس تظهر outcomes/prerequisites + قائمة الدروس، والدروس مقفولة لو مش مشترك.
- `auth.spec.ts`: صفحة Auth تتبدّل بين signin/signup + لينك forgot password بيشتغل.
- `pricing.spec.ts`: 3 خطط بتظهر جنب بعض بأسعار صحيحة، زرار subscribe بيوديني لـ /auth لو مش مسجّل.
- `contact.spec.ts`: ملء الفورم وإرساله بيكتب في `contact_messages`.
- `i18n.spec.ts`: تبديل اللغة بيغيّر `dir` و النصوص.
- `nav.spec.ts`: كل لينكات النفيجيشن في الهيدر والفوتر شغّالة.

السكريبت في `package.json`: `"test:e2e": "playwright test"`.

### 5. Verification النهائي
- `bun run build` نظيف.
- تشغيل Playwright tests كلها → خضراء.
- فحص يدوي في الـ browser للـ flows الحرجة (signup → reset password → pricing → checkout redirect).
- `supabase--linter` للتأكد من سلامة RLS.

## تنبيهات للمستخدم (مهام خارج الكود)

1. **Dodo Lifetime product**: أنشئ منتج One-time بـ $200 وحدّث الـ ID:
   ```sql
   UPDATE subscription_plans SET dodo_product_id = 'pdt_xxx' WHERE slug = 'lifetime';
   ```
2. **Email templates في Supabase**: تأكد إن template "Reset Password" مفعّل و الـ redirect URL `*/reset-password`.
3. **Webhook URL في Dodo dashboard**: لازم يكون على `https://jdowaletwmqjhvmaervb.functions.supabase.co/dodo-webhook` مع تفعيل أحداث `payment.*` و `subscription.*`.

## ترتيب التنفيذ (تقريباً 15 دقيقة)
1. Refactor `Index.tsx` (5 د)
2. SEO + small page polish (3 د)
3. تثبيت Playwright + كتابة 8 tests (5 د)
4. Build + run tests + إصلاح أي خطأ (2 د)

ابدأ على طول؟
