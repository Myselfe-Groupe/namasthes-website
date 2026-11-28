import type { Metadata } from "next";
import Link from "next/link";
import ContentContainer from "@/components/layout/ContentContainer";
import PizzaMenu from "@/components/sections/PizzaMenu";
import PizzaVisit from "@/components/sections/PizzaVisit";
import { pizzas, pizzaDiameter } from "@/data/pizza-menu";

export const metadata: Metadata = {
  title: "Carte des pizzas — 8 recettes artisanales, format 38 cm",
  description: "La nouvelle carte des pizzas Namas’Thés à Saint-Viance : 8 recettes au format 38 cm, ingrédients et prix de 10,90 € à 15,90 €. Carte à télécharger et commande par téléphone.",
  alternates: { canonical: "/carte-des-pizzas" },
};

export default function MenuPage() {
  const menu = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "La carte des pizzas Namas’Thés",
    hasMenuSection: {
      "@type": "MenuSection",
      name: `Pizzas ${pizzaDiameter} cm`,
      hasMenuItem: pizzas.map((pizza) => ({
        "@type": "MenuItem",
        name: pizza.name,
        description: pizza.ingredients,
        offers: { "@type": "Offer", price: pizza.price.toFixed(2), priceCurrency: "EUR" },
      })),
    },
  };

  return (
    <main className="bg-background text-foreground">
      <ContentContainer className="py-12 text-center sm:py-16">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Namas’Thés · Saint-Viance</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-primary sm:text-5xl">Notre carte des pizzas</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-secondary">Sur place ou à emporter, choisissez votre recette et commandez par téléphone ou directement au comptoir.</p>
        <Link href="/produits/pizzeria" className="mt-4 inline-flex min-h-12 items-center text-base text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Découvrir notre pizzeria</Link>
      </ContentContainer>
      <PizzaMenu />
      <PizzaVisit />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menu).replace(/</g, "\\u003c") }} />
    </main>
  );
}
