import { SITE_URL, TAGLINE, business, fullAddress } from "@/content/site";

const { whatsapp: _whatsapp, ...profiles } = business.social;
const sameAs = Object.values(profiles).filter(Boolean) as string[];

/** LocalBusiness JSON-LD for the home and contact pages. */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: business.name,
  legalName: business.legalName,
  slogan: TAGLINE,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "Branding, social media, SEO, websites, mobile apps and AI automation for Kerala businesses, from one Technopark team in Trivandrum.",
  telephone: business.phoneTel,
  email: business.email,
  foundingDate: String(business.foundingYear),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${business.address.line1}, ${business.address.line2}`,
    addressLocality: business.address.locality,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: business.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: business.geo.latitude,
    longitude: business.geo.longitude,
  },
  openingHours: business.openingHours,
  areaServed: [
    { "@type": "City", name: "Thiruvananthapuram" },
    { "@type": "AdministrativeArea", name: "Kerala" },
  ],
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
  ...(sameAs.length ? { sameAs } : {}),
};

export const faqSchema = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  })),
});

export const breadcrumbSchema = (crumbs: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: `${SITE_URL}${c.path === "/" ? "" : c.path}`,
  })),
});
