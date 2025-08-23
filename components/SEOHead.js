import Head from 'next/head';

export default function SEOHead({ 
  title = "RAHICO PARC AUTO - Vente de Véhicules d'Occasion en Côte d'Ivoire",
  description = "RAHICO PARC AUTO, votre concessionnaire de confiance à Abidjan. Découvrez notre large sélection de véhicules d'occasion de qualité : berlines, SUV, 4x4. Financement disponible, garantie incluse.",
  keywords = "voiture occasion Abidjan, véhicule d'occasion Côte d'Ivoire, RAHICO PARC AUTO, concessionnaire automobile Abidjan, berline occasion, SUV occasion, 4x4 occasion, financement auto, garantie véhicule",
  image = "/images/icon.png",
  url = "",
  type = "website"
}) {
  const siteUrl = "https://rahico-parc-auto.vercel.app";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImageUrl = `${siteUrl}${image}`;

  return (
    <Head>
      {/* Titre optimisé */}
      <title>{title}</title>
      
      {/* Meta descriptions */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Meta robots */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Géolocalisation */}
      <meta name="geo.region" content="CI" />
      <meta name="geo.placename" content="Abidjan" />
      <meta name="geo.position" content="5.3600;-4.0083" />
      <meta name="ICBM" content="5.3600, -4.0083" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="RAHICO PARC AUTO" />
      <meta property="og:locale" content="fr_CI" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/images/icon.png" />
      <link rel="apple-touch-icon" href="/images/icon.png" />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Langue */}
      <meta httpEquiv="content-language" content="fr-CI" />
      
      {/* Informations business */}
      <meta name="author" content="RAHICO PARC AUTO" />
      <meta name="contact" content="+225 07 89 13 38 97" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
    </Head>
  );
}
