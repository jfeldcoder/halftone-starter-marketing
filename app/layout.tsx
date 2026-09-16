import type { Metadata } from "next";
import { Barlow, Manrope, Space_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { SITE_URL } from "@/lib/url";
import { organizationSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Splash from "@/components/Splash";
import "./globals.css";

const display = Barlow({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono", display: "swap" });

const ogImages = site.seo.image ? [{ url: site.seo.image, width: 1200, height: 630, alt: "EventPro Seating 10 Row bleacher at a night event" }] : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.name} · ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: { title: site.name, description: site.description, url: SITE_URL, siteName: site.name, locale: "en_US", type: "website", images: ogImages },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ogImages },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration="manual";window.scrollTo(0,0);addEventListener("pageshow",function(e){if(e.persisted)window.scrollTo(0,0)});`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationSchema()} />
        <Splash />
        <Nav />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
