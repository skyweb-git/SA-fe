import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  page = 'home', 
  cmsContent = null, 
  title: customTitle, 
  description: customDescription, 
  canonical: customCanonical, 
  keywords: customKeywords, 
  image: customImage 
}) {
  const siteUrl = 'https://edionroyal.co.za';
  const defaultImage = `${siteUrl}/hero-bg.png`;

  // Dynamic CMS fallbacks
  const heroData = cmsContent?.hero || {};
  const phone = heroData.callNumber || '+27 78 972 4254';
  const addressStreet = heroData.addressTitle || '7 Arum Street';
  const addressArea = heroData.addressSubtitle || 'Milnerton, Cape Town';
  const addressPostal = '7441';
  const email = 'edionroyal@gmail.com';

  // Page-specific metadata configurations
  const pageConfigs = {
    home: {
      title: 'Edion Royal Guesthouse · Luxury Accommodation in Milnerton, Cape Town',
      description: 'Experience tranquility and comfort at Edion Royal Guesthouse in Milnerton, Cape Town. Elegant renovated en-suite rooms, Table Mountain views, free high-speed Wi-Fi, secure parking, and lagoon proximity. Book direct for best rates.',
      keywords: 'Edion Royal Guesthouse, Milnerton accommodation, Cape Town guest house, boutique hotel Milnerton, Table View lodging, Cape Town luxury suites, beachfront guesthouse Cape Town, South Africa hospitality, executive accommodation Milnerton, 7 Arum Street Milnerton',
      path: '',
      breadcrumbName: 'Home'
    },
    rooms: {
      title: 'Luxury Rooms & En-Suite Suites · Edion Royal Guesthouse Milnerton',
      description: 'Explore our renovated private en-suite double rooms, kitchenette suites, and spacious family accommodations at Edion Royal Guesthouse in Milnerton, Cape Town. Modern amenities, private bathrooms, work desks, and Smart TVs.',
      keywords: 'Edion Royal rooms, renovated double room, executive suites Milnerton, luxury accommodation Cape Town, boutique suites Table View, guest house room rates, Cape Town holiday rentals, couples stay Milnerton, family room Cape Town',
      path: '#rooms',
      breadcrumbName: 'Rooms & Suites'
    },
    amenities: {
      title: 'Premium Guest Amenities & Braai Facilities · Edion Royal Guesthouse',
      description: 'Enjoy top hospitality amenities at Edion Royal: free high-speed fiber Wi-Fi, private gated parking, 24-hour reception, authentic South African braai area, fully equipped shared kitchen, and daily housekeeping.',
      keywords: 'Edion Royal amenities, guest house with braai area Milnerton, free secure parking Cape Town, free fiber wifi guesthouse, 24-hour reception Milnerton, business travel lodging Cape Town, shared kitchen guesthouse',
      path: '#amenities',
      breadcrumbName: 'Amenities & Facilities'
    },
    location: {
      title: 'Prime Coastal Milnerton Location · 7 Arum Street, Cape Town',
      description: 'Conveniently situated at 7 Arum Street, Milnerton, Cape Town. Minutes from Lagoon Beach, Milnerton Golf Club, Canal Walk Shopping Centre, and a short 15-minute scenic drive to Cape Town CBD & V&A Waterfront.',
      keywords: 'Milnerton Cape Town location, near Lagoon Beach, Canal Walk nearby hotels, Milnerton Golf Club lodging, 7 Arum Street Milnerton, Cape Town northern suburbs guest house, proximity to V&A Waterfront, Bloubergstrand lodging',
      path: '#location',
      breadcrumbName: 'Location & Nearby'
    },
    contact: {
      title: 'Direct Reservations & Contact Concierge · Edion Royal Guesthouse',
      description: 'Book your stay directly with Edion Royal Guesthouse front desk for guaranteed best rates. Located at 7 Arum Street, Milnerton, Cape Town. Call +27 78 972 4254 or submit a reservation enquiry online.',
      keywords: 'Book Edion Royal Guesthouse, reserve room Milnerton, Cape Town accommodation contact, Edion Royal phone number, guesthouse reservation desk, direct booking discount Cape Town',
      path: '#contact',
      breadcrumbName: 'Contact & Reservations'
    }
  };

  const currentConfig = pageConfigs[page] || pageConfigs.home;

  const metaTitle = customTitle || currentConfig.title;
  const metaDescription = customDescription || currentConfig.description;
  const metaKeywords = customKeywords || currentConfig.keywords;
  const canonicalUrl = customCanonical || `${siteUrl}/${currentConfig.path}`;
  const metaImage = customImage || defaultImage;

  // Rooms offerings from CMS for Schema
  const roomOffers = (cmsContent?.roomsSection?.items || [
    { title: 'Renovated Double Room', pricePerNight: 850, maxGuests: 2, description: 'Calm en-suite room with private bathroom, work desk, and flat-screen TV.' },
    { title: 'Double Room with Kitchenette', pricePerNight: 1050, maxGuests: 2, description: 'Spacious suite with en-suite bathroom and private kitchenette facilities.' },
    { title: 'Spacious Triple Room', pricePerNight: 1250, maxGuests: 3, description: 'Comfortable family or group room with private en-suite bathroom.' },
    { title: 'Family Room with En-Suite', pricePerNight: 1450, maxGuests: 4, description: 'Large multi-guest suite with deluxe bedding and private bathroom.' }
  ]).map((room, idx) => ({
    '@type': 'HotelRoom',
    '@id': `${siteUrl}/#room-${idx + 1}`,
    name: room.title || room.name,
    description: room.description || room.stats || 'Renovated luxury room with private en-suite bathroom and modern amenities.',
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: room.maxGuests || 2
    },
    offers: {
      '@type': 'Offer',
      price: room.pricePerNight || 850,
      priceCurrency: 'ZAR',
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/#rooms`
    }
  }));

  // Schema 1: LodgingBusiness & BedAndBreakfast
  const lodgingSchema = {
    '@context': 'https://schema.org',
    '@type': ['BedAndBreakfast', 'LodgingBusiness'],
    '@id': `${siteUrl}/#lodging`,
    name: 'Edion Royal Guesthouse',
    alternateName: 'Edion Royal Guest House Milnerton',
    legalName: 'Edion Royal Guesthouse (Pty) Ltd',
    description: 'Boutique guesthouse in Milnerton, Cape Town featuring newly renovated en-suite rooms, free high-speed Wi-Fi, secure parking, braai facilities, and easy access to Lagoon Beach and Table Mountain.',
    url: siteUrl,
    telephone: phone,
    email: email,
    image: [
      `${siteUrl}/hero-bg.png`,
      `${siteUrl}/798129955.jpg`,
      `${siteUrl}/513927625.jpg`,
      `${siteUrl}/798153808.jpg`
    ],
    logo: `${siteUrl}/favicon.svg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: addressStreet,
      addressLocality: 'Milnerton',
      addressRegion: 'Western Cape',
      postalCode: addressPostal,
      addressCountry: 'ZA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -33.8710,
      longitude: 18.4970
    },
    hasMap: 'https://maps.google.com/?q=-33.8710,18.4970',
    checkinTime: '14:00',
    checkoutTime: '10:00',
    currenciesAccepted: 'ZAR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, EFT',
    priceRange: 'ZAR 850 - 1500',
    starRating: {
      '@type': 'Rating',
      ratingValue: '4.9',
      bestRating: '5'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '138',
      bestRating: '5',
      worstRating: '1'
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free High-Speed Fiber Wi-Fi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Secure Private Parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: '24-Hour Reception Desk', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Braai & BBQ Facilities', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Shared Kitchen & Dining', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Daily Housekeeping', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning & Heating', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Flat-Screen Smart Satellite TV', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Proximity to Lagoon Beach', value: true }
    ],
    containsPlace: roomOffers,
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/#contact`,
        inLanguage: 'en-ZA',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      },
      result: {
        '@type': 'LodgingReservation',
        name: 'Edion Royal Stay Reservation'
      }
    }
  };

  // Schema 2: BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl
      },
      ...(page !== 'home' ? [{
        '@type': 'ListItem',
        position: 2,
        name: currentConfig.breadcrumbName,
        item: canonicalUrl
      }] : [])
    ]
  };

  // Schema 3: FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where is Edion Royal Guesthouse located in Cape Town?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Edion Royal Guesthouse is located at 7 Arum Street in Milnerton, Cape Town, South Africa (Postal Code 7441). It is situated just minutes from Lagoon Beach, Canal Walk Shopping Centre, and a short 15-minute drive from Cape Town CBD and the V&A Waterfront.'
        }
      },
      {
        '@type': 'Question',
        name: 'What amenities are included with my stay at Edion Royal Guesthouse?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All guests enjoy complimentary high-speed fiber Wi-Fi, secure on-site parking, 24-hour reception, daily housekeeping, access to fully equipped shared kitchens, and authentic South African braai (BBQ) outdoor facilities.'
        }
      },
      {
        '@type': 'Question',
        name: 'What are the check-in and check-out times?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Check-in is from 14:00 (2:00 PM) onwards, and check-out is by 10:00 AM. 24-hour front desk attendance is available for late arrivals with prior arrangement.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are all rooms private with en-suite bathrooms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, every renovated room at Edion Royal features its own private en-suite bathroom, flat-screen Smart TV, work desk, and wardrobe storage.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I book directly for the best rates at Edion Royal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can book directly by filling out the online availability enquiry form on our official website or by calling/WhatsApping our reservation concierge team at +27 78 972 4254.'
        }
      }
    ]
  };

  return (
    <Helmet prioritizeSeoTags>
      {/* Essential Document Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Geographic / Local SEO Meta Tags */}
      <meta name="geo.region" content="ZA-WC" />
      <meta name="geo.placename" content="Milnerton, Cape Town, Western Cape" />
      <meta name="geo.position" content="-33.8710;18.4970" />
      <meta name="ICBM" content="-33.8710, 18.4970" />
      <meta name="address" content="7 Arum Street, Milnerton, Cape Town, 7441, South Africa" />

      {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:type" content="hotel" />
      <meta property="og:site_name" content="Edion Royal Guesthouse" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:secure_url" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Edion Royal Guesthouse Luxury Accommodation Milnerton Cape Town" />
      <meta property="og:locale" content="en_ZA" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="en_GB" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@edionroyal" />
      <meta name="twitter:creator" content="@edionroyal" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content="Edion Royal Guesthouse Milnerton Cape Town" />

      {/* Additional Browser & Mobile App Metadata */}
      <meta name="theme-color" content="#1b2a47" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="author" content="Edion Royal Guesthouse" />
      <meta name="application-name" content="Edion Royal Portal" />
      <meta name="apple-mobile-web-app-title" content="Edion Royal" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Structured Data / JSON-LD Schemas */}
      <script type="application/ld+json">
        {JSON.stringify(lodgingSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
}
