// ===== Portability & Export Utilities =====

export function downloadFile(filename: string, content: string, mime: string = 'text/plain') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function toCSV(headers: string[], rows: (string | number)[][]): string {
  const escape = (v: string | number) => {
    const s = String(v);
    return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers.map(escape).join(','), ...rows.map((r) => r.map(escape).join(','))].join('\n');
}

export function generateVercelConfig(): string {
  return `{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "version": 2,
  "name": "vrtx-ecosystem",
  "builds": [
    { "src": "package.json", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/dashboard", "dest": "/" },
    { "src": "/mining", "dest": "/" },
    { "src": "/studio", "dest": "/" },
    { "src": "/marketplace", "dest": "/" },
    { "src": "/pay", "dest": "/" },
    { "src": "/class", "dest": "/" },
    { "src": "/mail", "dest": "/" },
    { "src": "/web-builder", "dest": "/" },
    { "src": "/kanban", "dest": "/" },
    { "src": "/affiliates", "dest": "/" },
    { "src": "/automation", "dest": "/" },
    { "src": "/security", "dest": "/" },
    { "src": "/core-control", "dest": "/" },
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}`;
}

export function generateNetlifyConfig(): string {
  return `[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/dashboard"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/mining"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/studio"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/marketplace"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/pay"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/class"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/mail"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/web-builder"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/kanban"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/affiliates"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/automation"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/security"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/core-control"
  to = "/index.html"
  status = 200

# SPA fallback - prevent 404 on client-side routes
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"`;
}

export function generateSEOMetaTags(offerName: string, url: string = 'https://vrtx.app'): string {
  const safeOffer = offerName.replace(/"/g, '&quot;');
  return `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary SEO Meta Tags -->
  <title>${safeOffer} | VRTX</title>
  <meta name="title" content="${safeOffer} | VRTX">
  <meta name="description" content="Descubra como ${safeOffer} pode transformar seus resultados em 7 dias. Garantia incondicional. Acesso imediato.">
  <meta name="keywords" content="${safeOffer}, curso online, escala digital, marketing, tráfego pago">
  <meta name="author" content="VRTX">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}/">
  <meta property="og:title" content="${safeOffer} | VRTX">
  <meta property="og:description" content="Descubra como ${safeOffer} pode transformar seus resultados em 7 dias.">
  <meta property="og:image" content="${url}/og-image.jpg">
  <meta property="og:site_name" content="VRTX">
  <meta property="og:locale" content="pt_BR">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${url}/">
  <meta name="twitter:title" content="${safeOffer} | VRTX">
  <meta name="twitter:description" content="Descubra como ${safeOffer} pode transformar seus resultados em 7 dias.">
  <meta name="twitter:image" content="${url}/og-image.jpg">
  <meta name="twitter:site" content="@vrtx">

  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "${safeOffer}",
    "description": "Solução completa de escala digital com garantia de 7 dias.",
    "brand": { "@type": "Brand", "name": "VRTX" },
    "offers": {
      "@type": "Offer",
      "url": "${url}",
      "priceCurrency": "BRL",
      "price": "297",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "12400"
    }
  }
  </script>
</head>`;
}
