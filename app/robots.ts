import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { SITE_URL } from "@/lib/url";


export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
