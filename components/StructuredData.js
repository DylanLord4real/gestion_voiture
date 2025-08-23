import Head from 'next/head';

export function BusinessStructuredData() {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "RAHICO PARC AUTO",
    "description": "Concessionnaire automobile spécialisé dans la vente de véhicules d'occasion de qualité à Abidjan, Côte d'Ivoire",
    "url": "https://rahico-parc-auto.vercel.app",
    "telephone": "+225 07 89 13 38 97",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Abidjan",
      "addressCountry": "CI"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "5.3600",
      "longitude": "-4.0083"
    },
    "openingHours": [
      "Mo-Sa 08:00-20:00"
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card"],
    "currenciesAccepted": "XOF",
    "areaServed": {
      "@type": "Country",
      "name": "Côte d'Ivoire"
    }
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
      />
    </Head>
  );
}

export function CarStructuredData({ car }) {
  const carData = {
    "@context": "https://schema.org",
    "@type": "Car",
    "name": car.Nom,
    "description": car.Description || `${car.Nom} - Véhicule d'occasion de qualité disponible chez RAHICO PARC AUTO`,
    "brand": {
      "@type": "Brand",
      "name": car.Marque || "Marque"
    },
    "model": car.Modele || car.Nom,
    "vehicleConfiguration": car.Type || "Berline",
    "fuelType": car.Carburant || "Essence",
    "vehicleTransmission": car.Transmission || "Manuelle",
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": car.Kilometrage || 0,
      "unitCode": "KMT"
    },
    "productionDate": car.Annee || new Date().getFullYear(),
    "offers": {
      "@type": "Offer",
      "price": car.Prix || 0,
      "priceCurrency": "XOF",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "AutoDealer",
        "name": "RAHICO PARC AUTO",
        "telephone": "+225 07 89 13 38 97"
      }
    },
    "image": car.Images && car.Images.length > 0 ? car.Images.map(img => img.url) : ["/images/icon.png"],
    "url": `https://rahico-parc-auto.vercel.app/voiture/${car.id}`
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(carData) }}
      />
    </Head>
  );
}
