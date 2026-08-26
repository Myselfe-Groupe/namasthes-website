import type { Metadata, Viewport } from "next";
import { Quando, Great_Vibes } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { Analytics } from "@vercel/analytics/next"

const quando = Quando({
  variable: "--font-quando",
  subsets: ["latin"],
  weight: "400"
});

const great_Vibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400"
});

const siteUrl = "https://namasthes.myselfegroupe.com";
// 1. Le nom pur de la marque pour Google Site Name
const brandName = "Namas'thés"; 
// 2. Le titre SEO complet pour la balise <title>
const siteTitle = "Namas'thés | Boulangerie, Pizzeria & Salon de thé à Saint-Viance";
const siteDescription = "Namas'thés à Saint-Viance : boulangerie artisanale, pizzeria, pâtisserie, chocolat et salon de thé pour vos moments gourmands sur place ou à emporter.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Namas'thés"
  },
  description: siteDescription,
  keywords: [
    "Namas'thés",
    "boulangerie Saint-Viance",
    "pizzeria Saint-Viance",
    "salon de thé",
    "pâtisserie artisanale",
    "pain artisanat"
  ],
  // Indique à Google le nom court exact du site
  applicationName: brandName, 
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: brandName, // Nom de la marque uniquement
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/logo/logo_namasthes.png",
    shortcut: "/logo/logo_namasthes.png",
    apple: "/logo/logo_namasthes.png"
  }
};

export const viewport: Viewport = {
  themeColor: "#1e2538"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema obligatoirement requis par Google pour détecter le "Site Name"
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brandName,
    alternateName: ["Namas'Thés", "Namas'Thés Saint-Viance", "Namasthes"],
    url: siteUrl
  };

  // Schema pour ton établissement local (Bakery)
  const bakeryJsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: brandName,
    alternateName: ["Namas'Thés", "Namas'Thés Saint-Viance"],
    url: siteUrl,
    description: siteDescription,
    telephone: "+33555231016",
    email: "sas.namasthes@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1 Place du Commerce",
      postalCode: "19240",
      addressLocality: "Saint-Viance",
      addressCountry: "FR"
    },
    sameAs: [
      "https://www.instagram.com/namas.thes/",
      "https://www.tiktok.com/@namas.thes"
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "06:00",
        closes: "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "06:00",
        closes: "21:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "07:00",
        closes: "13:00"
      }
    ]
  };

  return (
    <html
      lang="fr"
      className={`${quando.variable} ${great_Vibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppShell>{children}</AppShell>
        <Analytics/>
        
        {/* JSON-LD WebSite pour le Nom du site Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* JSON-LD Bakery pour le Référencement Local */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bakeryJsonLd) }}
        />
      </body>
    </html>
  );
}