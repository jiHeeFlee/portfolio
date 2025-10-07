// SEO 유틸 생성

import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: object;
}

export default function SEO({
  title = "flee's portfolio",
  description = "2025 flee's portfolio",
  url,
  image = "/og-image.png",
  type = "website",
  jsonLd,
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {url && <link rel="canonical" href={url} />}

      {/* meta-data */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* 구조화 데이터를 검색엔진이 정확하게 이해하도록 돕는 SEO 표준 */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
