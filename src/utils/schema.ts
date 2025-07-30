// Schema.org structured data for Nettup

// Site URL from environment or default
const SITE_URL = 'https://nettup.no';

// Organization Schema - Main business information
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nettup',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description:
    'Profesjonell webutvikling med fokus på resultater og brukeropplevelse. Vi skaper moderne nettsider som både ser fantastiske ut og driver din bedrift fremover.',
  founder: {
    '@type': 'Person',
    name: 'Iver Østensen',
  },
  foundingDate: '2024',
  sameAs: [
    // Add social media URLs when available
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+47 473 31 298', // Update with real phone number
      contactType: 'Customer Service',
      areaServed: 'NO',
      availableLanguage: ['Norwegian', 'English'],
      url: `${SITE_URL}/kontakt`,
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Trollåsveien 4',
    addressLocality: 'Trollåsen',
    postalCode: '1414',
    addressCountry: 'NO',
    addressRegion: 'Norge',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Norge',
  },
  serviceType: 'Web Development',
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Webdesign',
        description:
          'Moderne, responsivt design som fanger oppmerksomhet og konverterer besøkende til kunder',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Booking systemer',
        description: 'Sømløs integrasjon av booking- og timebestillingssystem',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'CMS & Headless',
        description:
          'Fleksible innholdssystemer som gjør det enkelt å oppdatere nettsiden selv',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Support',
        description:
          'Kontinuerlig vedlikehold, sikkerhetsopdateringer og teknisk support',
      },
    },
  ],
};

// Website Schema - Site search and navigation
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: SITE_URL,
  name: 'Nettup - Nettsider som konverterer',
  description:
    'Webutvikling med fokus på resultater. Rimelige, moderne nettsider og CMS-løsninger som driver din bedrift fremover.',
  publisher: {
    '@type': 'Organization',
    name: 'Nettup',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/søk?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// Service Schema - For individual service pages
export function serviceSchema(
  serviceName: string,
  description: string,
  price?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'Nettup',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Norge',
    },
    serviceType: 'Web Development',
    ...(price && {
      offers: {
        '@type': 'Offer',
        price: price,
        priceCurrency: 'NOK',
        availability: 'https://schema.org/InStock',
      },
    }),
  };
}

// Breadcrumb Schema - Dynamic breadcrumbs
export function breadcrumbSchema(breadcrumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((bc, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: bc.name,
      item: bc.url,
    })),
  };
}

// FAQ Schema - For FAQ pages or sections
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Hvordan bestiller jeg en nettside hos Nettup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Du kan bestille ved å klikke på 'Book gratis konsultasjon' og velge et tidspunkt som passer deg. Vi tar en uforpliktende samtale om dine behov og lager et skreddersydd tilbud.",
      },
    },
    {
      '@type': 'Question',
      name: 'Hvor lang tid tar det å få en ferdig nettside?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Leveringstiden avhenger av kompleksiteten, men de fleste prosjekter leveres innen 2-8 uker. Enkle nettsider kan være klare på under 2 uker.',
      },
    },
    {
      '@type': 'Question',
      name: 'Får jeg tilgang til å oppdatere nettsiden selv?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, vi setter opp CMS-løsninger som gjør det enkelt for deg å oppdatere innhold selv. Vi gir også opplæring i hvordan systemet fungerer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hva er inkludert i vedlikeholdspakken?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vedlikeholdspakken inkluderer sikkerhetsopdateringer, backup, teknisk support, mindre endringer og overvåking av nettsiden.',
      },
    },
  ],
};

// Local Business Schema - Since Nettup operates in Norway
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Nettup',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description:
    'Profesjonell webutvikling med fokus på resultater og brukeropplevelse',
  priceRange: '5000-20000 NOK',
  telephone: '+47 473 31 298', // Update with real phone
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Trollåsveien 4',
    addressLocality: 'Trollåsen',
    postalCode: '1414',
    addressCountry: 'NO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '59.9139', // Oslo coordinates as example
    longitude: '10.7522',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Norge',
  },
  serviceArea: {
    '@type': 'Country',
    name: 'Norge',
  },
  knowsAbout: [
    'Web Development',
    'Responsive Design',
    'SEO',
    'CMS Implementation',
    'API Integration',
    'E-commerce Development',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Nettup Tjenester',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Start Pakke',
        itemListElement: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Start Nettside',
          },
          price: '5000',
          priceCurrency: 'NOK',
        },
      },
      {
        '@type': 'OfferCatalog',
        name: 'Plus Pakke',
        itemListElement: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Plus Nettside med CMS',
          },
          price: '8000',
          priceCurrency: 'NOK',
        },
      },
      {
        '@type': 'OfferCatalog',
        name: 'Pro Pakke',
        itemListElement: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pro Nettside med API-integrasjon',
          },
          price: '12000',
          priceCurrency: 'NOK',
        },
      },
      {
        '@type': 'OfferCatalog',
        name: 'Premium Pakke',
        itemListElement: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Premium Enterprise Løsning',
          },
          price: '20000',
          priceCurrency: 'NOK',
        },
      },
    ],
  },
};

// Product/Package Schema - For individual packages
export function packageSchema(
  packageName: string,
  price: string,
  description: string,
  features: string[],
  imageUrl?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: packageName,
    description: description,
    image: imageUrl || `${SITE_URL}/favicon.svg`,
    category: 'Web Development Service',
    brand: {
      '@type': 'Brand',
      name: 'Nettup',
    },
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'NOK',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Nettup',
      },
    },
    additionalProperty: features.map((feature) => ({
      '@type': 'PropertyValue',
      name: 'Feature',
      value: feature,
    })),
  };
}

// Review/Testimonial Schema - For case studies or testimonials
export function reviewSchema(
  reviewText: string,
  rating: number,
  clientName: string,
  clientCompany?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewBody: reviewText,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: 5,
    },
    author: {
      '@type': 'Person',
      name: clientName,
      ...(clientCompany && {
        worksFor: {
          '@type': 'Organization',
          name: clientCompany,
        },
      }),
    },
    itemReviewed: {
      '@type': 'Organization',
      name: 'Nettup',
    },
  };
}

// Case Study / Creative Work Schema
export function caseStudySchema(
  title: string,
  description: string,
  url: string,
  client?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description: description,
    url: url,
    creator: {
      '@type': 'Organization',
      name: 'Nettup',
    },
    dateCreated: new Date().toISOString().split('T')[0],
    genre: 'Case Study',
    inLanguage: 'no',
    ...(client && {
      about: {
        '@type': 'Organization',
        name: client,
      },
    }),
  };
}
