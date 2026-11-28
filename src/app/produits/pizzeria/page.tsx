import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Pizza, Utensils } from "lucide-react";
import ContentContainer from "@/components/layout/ContentContainer";
import ProductsSection from "@/components/sections/ProductsSection";
import PizzaMenu from "@/components/sections/PizzaMenu";
import PizzaVisit from "@/components/sections/PizzaVisit";

export const metadata: Metadata = {
  title: "Pizzeria à Saint-Viance — pizzas artisanales 38 cm",
  description: "Découvrez la nouvelle carte de Namas’Thés à Saint-Viance : 8 pizzas artisanales au format 38 cm, de 10,90 € à 15,90 €. Sur place ou à emporter, commande par téléphone.",
  alternates: { canonical: "/produits/pizzeria" },
};

export default async function PizzeriaPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
  const params = await searchParams;
  const page = Number.parseInt(params.page ?? "1", 10);

  return (
    <main className="bg-background text-foreground">
      <section aria-labelledby="pizzeria-title" className="py-10 sm:py-16">
        <ContentContainer>
          <nav aria-label="Fil d’Ariane" className="mb-8 flex flex-wrap items-center gap-3 text-sm text-secondary">
            <Link href="/" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Accueil</Link>
            <span aria-hidden="true">/</span><span aria-current="page">Pizzeria</span>
          </nav>
          <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <p className="text-sm uppercase tracking-[0.2em] text-primary">Namas’Thés · Saint-Viance</p>
              <h1 id="pizzeria-title" className="mt-5 font-serif text-4xl font-semibold leading-tight text-primary sm:text-5xl lg:text-6xl">Une pizza, et le plaisir de se retrouver.</h1>
              <p className="mt-6 text-base leading-8 text-foreground/80 sm:text-lg">Les classiques que l’on aime, des associations gourmandes et une touche corrézienne : découvrez nos huit recettes artisanales, toutes au format 38 cm.</p>
              <p className="mt-4 text-base leading-8 text-foreground/80">À savourer chez nous ou à emporter, pour votre pause du midi comme pour votre soirée à Saint-Viance.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#carte" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-6 py-3 text-base text-background transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><Pizza size={19} aria-hidden="true" />Découvrir la nouvelle carte</a>
                <a href="tel:+33555231016" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-primary px-6 py-3 text-base text-primary transition-colors hover:bg-primary hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><Phone size={19} aria-hidden="true" />05 55 23 10 16</a>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-secondary"><Utensils size={17} aria-hidden="true" />Sur place &amp; à emporter · Format 38 cm</p>
            </div>
            <div className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-2xl bg-muted">
              <Image src="/images/pizzeria.jpg" alt="Une pizza proposée à la pizzeria Namas’Thés à Saint-Viance" fill preload sizes="(min-width: 1280px) 568px, (min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </ContentContainer>
      </section>
      <PizzaMenu />
      <PizzaVisit />
      <ProductsSection category="pizzeria" page={Number.isNaN(page) ? 1 : page} query={params.q} />
    </main>
  );
}
