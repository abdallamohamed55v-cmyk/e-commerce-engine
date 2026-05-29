# خطة إكمال موقع Shro.AI (منصة كورسات)

الهدف: منصة كورسات متكاملة تشتغل 100% — كل الصفحات موجودة، التصميم موحّد، الدفع شغّال، والمحتوى ظاهر.

## 1. مشاكل حرجة لازم تتحل أولاً

- **قاعدة البيانات فاضية من الكورسات**: `courses=0`, `lessons=0` → صفحة `/courses` طالعة فاضية دلوقتي. هنشغّل edge function `seed-content` لتعبئة الكورسات والدروس والـ quizzes والمشاريع بالترجمات (AR/EN).
- **خطة Lifetime بدون `dodo_product_id`**: الدفع للـ Lifetime هيفشل. لازم تتعمل في Dodo كـ One-time product ويتحط الـ ID في الجدول.
- **مراجعة `dodo-webhook`**: التأكد إنه بيعالج الـ lifetime صح (period_end = +100 سنة) وبيحدّث `user_subscriptions`.

## 2. صفحات ناقصة (خاصة بالكورسات بس)

| المسار | الوصف |
|---|---|
| `/reset-password` | إعادة تعيين كلمة السر — مطلوب لـ Supabase auth |
| `/checkout/success` و `/checkout/cancel` | صفحات نتيجة الدفع بعد العودة من Dodo |
| `/about` | تعريف بالمنصة والمدرسين |
| `/contact` | فورم تواصل يكتب في `contact_messages` |

(مفيش marketplace/cart/seller — الموقع كورسات فقط)

## 3. تحسينات على الصفحات الموجودة

- **`/` (Index)**: ربط CTAs بـ `/courses` و `/pricing` فعلياً، عرض أحدث 3-4 كورسات من الداتابيز.
- **`/courses`**: فلترة بالـ level و topic، بحث، عرض حالة الاشتراك.
- **`/courses/:slug`**: عرض الـ outcomes والـ prerequisites وقائمة الدروس مع قفل الدروس للي مش مشترك.
- **`/courses/:slug/lessons/:lessonSlug`**: 
  - markdown renderer للمحتوى
  - quiz في آخر كل درس مع حفظ النتيجة في `lesson_progress`
  - زرار "تم" + التنقل للدرس التالي
  - شريط تقدم
  - حماية: لو الكورس مدفوع والمستخدم مش مشترك → redirect للـ pricing
- **`/account`**: تبويبات (My Courses مع progress، Subscription، Referrals، Settings).
- **`/pricing`**: (شغّال) — تأكيد إن الـ 3 خطط ظاهرين جنب بعض.
- **`/auth`**: إضافة "Forgot password" link.

## 4. توحيد التصميم والربط

- التأكد إن كل الصفحات بتستخدم `SiteShell` (نفس النيف بار/فوتر/مبدل اللغة).
- نيف بار موحّد: Home / Courses / Pricing / About / Contact + Account/Login.
- فوتر موحّد: روابط + social + Terms/Privacy.
- نفس الـ design tokens (الثيم الداكن الأزرق) في كل الصفحات.

## 5. التحقق والـ QA

1. `bun run build` بدون أخطاء.
2. كل route يفتح بدون runtime errors.
3. flow كامل: signup → login → فتح كورس مجاني → عمل quiz → التقدم محفوظ.
4. flow الدفع: شراء Monthly في sandbox → ظهور الاشتراك في `/account` → فتح كورس مدفوع.
5. اختبار شراء Lifetime بعد ضبط `dodo_product_id`.
6. `supabase--linter` للتأكد من سلامة RLS.
7. تبديل اللغة AR/EN يشتغل في كل الصفحات + RTL/LTR صح.

## 6. ترتيب التنفيذ

**Sprint 1 — تعبئة وإصلاح حرج**
- تشغيل `seed-content` لملء الكورسات والدروس
- إنشاء `/reset-password`
- مراجعة `dodo-webhook` لدعم lifetime
- إضافة `dodo_product_id` للخطة Lifetime (تعليمات للمستخدم)

**Sprint 2 — تجربة الكورس**
- تحسين `/courses/:slug` (lessons list + lock للمدفوع)
- تحسين `LessonView` (markdown + quiz + progress + next/prev)
- شريط تقدم في `/account`

**Sprint 3 — صفحات الدفع والتواصل**
- `/checkout/success` و `/checkout/cancel`
- `/about` و `/contact` (مع كتابة في `contact_messages`)

**Sprint 4 — Polish**
- SEO meta لكل صفحة (Seo.tsx موجود)
- ربط CTAs في `/` بداتا حقيقية
- اختبار شامل AR/EN
- إصلاح أي bug من الـ console/network logs

---

## تفاصيل تقنية

- **Routing**: إضافة الـ 4 routes الجديدة في `src/App.tsx`.
- **Data**: كل الـ fetching بـ `@tanstack/react-query` من جداول `courses`, `lessons`, `lesson_translations`, `quizzes`, `lesson_progress`.
- **i18n**: النصوص الجديدة في `src/i18n/`.
- **Auth guard**: hook بسيط يتأكد من `useAuth` + `has_active_subscription` قبل عرض درس مدفوع.
- **Markdown**: استخدام مكتبة موجودة (react-markdown) لعرض `content_markdown`.

تحب أبدأ بـ Sprint 1 على طول؟
