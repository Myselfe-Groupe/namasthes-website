import type { Metadata } from "next";
import HeroSlider from "@/components/sections/HeroSlider";
import SocialSection from "@/components/sections/SocialSection";
import Link from "next/link";
import NewProductsSection from "@/components/sections/ProductsSection";
import MoreProducts from "@/components/sections/MoreProducts";
import Button from "@/components/ui/Button";
import PartnersSection from "@/components/sections/PartnersSection";
import OpeningHours from "@/components/sections/OpeningHours";
import { ArrowRight, ArrowUpRight, MapPin, ShoppingBag } from "lucide-react";
import ContentContainer from "@/components/layout/ContentContainer";

export const metadata: Metadata = {
  title: "Namas'thés à Saint-Viance",
  description: "Découvrez Namas'thés, votre boulangerie, pizzeria, pâtisserie et salon de thé à Saint-Viance, ouverte pour le plaisir de chaque moment de la journée.",
  alternates: {
    canonical: "/"
  }
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-between bg-black sm:items-start font-text">
        <div className="w-full bg-background">
          <ContentContainer className="grid items-center gap-y-8 py-12 sm:py-16 lg:grid-cols-2">
          <section aria-labelledby="welcome-title" className="flex min-w-0 items-center lg:pr-10">
            <div className="w-full">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-border sm:text-sm">
                <span aria-hidden="true" className="h-px w-8 shrink-0 bg-border" />
                Bienvenue chez Namas&apos;Thés
              </p>
              <h1 id="welcome-title" className="text-foreground mt-6 font-serif text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl xl:text-7xl">
                Chaque moment mérite sa <span className="text-secondary">pause gourmande.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-foreground/80">
                Du pain croustillant du matin aux pizzas du soir, en passant par
                les pâtisseries et les instants au salon de thé : une seule adresse
                pour se faire plaisir à Saint-Viance.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/carte-des-pizzas" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-background shadow-md transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                  Voir la carte des pizzas
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                </Link>
                <a href="#horaires" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-secondary/40 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                  Horaires &amp; itinéraire
                  <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                </a>
              </div>
              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-secondary">
                <li className="flex items-center gap-2"><MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-border" />Plusieurs envies, une adresse</li>
                <li className="flex items-center gap-2"><ShoppingBag aria-hidden="true" className="h-4 w-4 shrink-0 text-border" />Sur place &amp; à emporter</li>
              </ul>
            </div>
          </section>
          <div className="min-w-0">
            <HeroSlider />
          </div>
          </ContentContainer>
        </div>
        <NewProductsSection />
        <MoreProducts />
        <SocialSection />
        <PartnersSection />
      </main>
    </div>
  );
}
