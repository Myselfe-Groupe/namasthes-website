import Link from "next/link";
import { Download, Phone } from "lucide-react";
import ContentContainer from "@/components/layout/ContentContainer";
import { pizzas, pizzaDiameter } from "@/data/pizza-menu";

const formatPrice = (price: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price);

export default function PizzaMenu() {
  return (
    <section id="carte" aria-labelledby="pizza-menu-title" className="scroll-mt-48 border-y border-accent bg-muted py-14 sm:py-20">
      <ContentContainer>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Notre nouvelle carte</p>
          <h2 id="pizza-menu-title" className="mt-4 font-title text-5xl leading-tight text-secondary sm:text-6xl">À chacun sa pizza préférée</h2>
          <p className="mt-5 text-base leading-8 text-secondary">{pizzas.length} recettes artisanales et gourmandes, un seul format de {pizzaDiameter} cm. Les ingrédients et les prix de notre carte, à retrouver ici en un coup d’œil.</p>
          <span className="mt-5 inline-flex rounded-full border border-border bg-background px-5 py-2 text-base font-semibold text-primary">Format {pizzaDiameter} cm</span>
        </div>

        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pizzas.map((pizza) => (
            <li key={pizza.name} className="flex min-w-0 flex-col rounded-2xl border border-border/70 bg-background p-6">
              <h3 className="font-serif text-2xl font-semibold leading-tight text-secondary">{pizza.name}</h3>
              <span aria-hidden="true" className="mt-4 h-px w-12 bg-border" />
              <p className="mt-4 grow text-base leading-7 text-foreground/80">{pizza.ingredients}</p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-accent pt-5">
                <span className="text-sm text-secondary">{pizzaDiameter} cm</span>
                <span className="whitespace-nowrap rounded-full bg-primary px-4 py-2 text-base font-semibold tabular-nums text-background">{formatPrice(pizza.price)}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="tel:+33555231016" className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-3 text-base text-background transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:w-auto"><Phone size={19} aria-hidden="true" />Commander au 05 55 23 10 16</a>
          <a href="/menus/carte-pizzas-namasthes.pdf" download="carte-pizzas-namasthes.pdf" className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-primary px-6 py-3 text-base text-primary transition-colors hover:bg-primary hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:w-auto"><Download size={19} aria-hidden="true" />Télécharger la carte (PDF)</a>
        </div>
        <p className="mt-6 text-center text-sm leading-7 text-secondary">Une question sur les ingrédients ? Contactez-nous avant de commander. <Link href="/allergenes" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Consulter les allergènes</Link></p>
      </ContentContainer>
    </section>
  );
}
