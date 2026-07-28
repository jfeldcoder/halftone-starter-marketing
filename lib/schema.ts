/**
 * schema.org JSON-LD, built from lib/site.ts.
 *
 * Defaults to Organization (works for any business). If the client has a physical
 * location, set a LocalBusiness `schemaType` and fill the address block in site.ts —
 * this then also emits PostalAddress, geo, priceRange, and areaServed.
 */
import { site } from "@/lib/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || site.url;

export function organizationSchema(): Record<string, unknown> {
  const s = site.seo;
  const sameAs = [site.socials.instagram, site.socials.x, site.socials.linkedin].filter(Boolean);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": s.schemaType,
    "@id": `${SITE_URL}/#org`,
    name: site.name,
    description: site.description,
    url: SITE_URL,
  };

  if (s.image) {
    const img = new URL(s.image, SITE_URL).toString();
    schema.image = img;
    schema.logo = img;
  }
  if (sameAs.length) schema.sameAs = sameAs;

  if (site.phone || site.email) {
    schema.contactPoint = {
      "@type": "ContactPoint",
      contactType: "customer service",
      ...(site.phone ? { telephone: site.phone } : {}),
      ...(site.email ? { email: site.email } : {}),
    };
  }

  // Only for businesses with a real storefront.
  if (s.streetAddress || s.city) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: s.streetAddress || undefined,
      addressLocality: s.city || undefined,
      addressRegion: s.region || undefined,
      postalCode: s.postalCode || undefined,
      addressCountry: s.country || "US",
    };
    if (s.geo.latitude && s.geo.longitude) {
      schema.geo = { "@type": "GeoCoordinates", latitude: s.geo.latitude, longitude: s.geo.longitude };
    }
    if (s.priceRange) schema.priceRange = s.priceRange;
    if (s.areaServed.length) schema.areaServed = s.areaServed;
  }

  return schema;
}
