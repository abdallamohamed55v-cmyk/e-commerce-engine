import { Helmet } from "react-helmet-async";
import { LANGUAGES, type LangCode } from "@/lib/languages";

type Props = {
  title: string;
  description: string;
  lang: LangCode;
  /** Path without the lang prefix, e.g. "/courses" or "/courses/ai-agents" */
  path: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: object | object[];
};

/**
 * Per-page SEO head with full hreflang set for all 12 languages.
 * Path should NOT include the lang prefix — Seo adds it.
 */
export default function Seo({ title, description, lang, path, image, type = "website", jsonLd }: Props) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonical = `/${lang}${cleanPath}`;
  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* hreflang for every supported language + x-default */}
      {LANGUAGES.map((l) => (
        <link key={l.code} rel="alternate" hrefLang={l.code} href={`/${l.code}${cleanPath}`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`/en${cleanPath}`} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={lang} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(ld)}</script>
      ))}
    </Helmet>
  );
}
