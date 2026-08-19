import type { Metadata, Viewport } from "next";
import { Quando, Great_Vibes } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

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
const siteName = "Namas'thés";
const siteDescription = "Namas'thés à Saint-Viance : boulangerie artisanale, pizzeria, pâtisserie, chocolat et salon de thé pour vos moments gourmands sur place ou à emporter.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
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
  applicationName: siteName,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: `${siteName} | Boulangerie, pizzeria et salon de thé à Saint-Viance`,
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Boulangerie, pizzeria et salon de thé à Saint-Viance`,
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
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: siteName,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
