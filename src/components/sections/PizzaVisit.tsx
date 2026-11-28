import { Clock3, MapPin, Phone } from "lucide-react";
import ContentContainer from "@/components/layout/ContentContainer";
import { pizzaServiceHours } from "@/data/pizza-menu";

export default function PizzaVisit() {
  return (
    <section id="service-pizzas" aria-labelledby="pizza-service-title" className="scroll-mt-48 bg-background py-14 sm:py-20">
      <ContentContainer className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="rounded-2xl border border-accent p-6 sm:p-8">
          <h2 id="pizza-service-title" className="flex items-center gap-3 text-xl font-semibold text-primary"><Clock3 aria-hidden="true" className="shrink-0" />Le service pizzas, midi et soir</h2>
          <dl className="mt-6 space-y-5 text-base leading-7">
            {pizzaServiceHours.map(({ days, times }) => (
              <div key={days} className="space-y-1"><dt className="font-semibold text-secondary">{days}</dt><dd>{times}</dd></div>
            ))}
          </dl>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Sur place ou à emporter</p>
          <h2 className="mt-3 font-title text-4xl leading-tight text-secondary sm:text-5xl">Votre prochaine pause pizza à Saint-Viance</h2>
          <p className="mt-5 text-base leading-8">Choisissez votre recette, puis appelez-nous pour commander. Retrouvez Namas’Thés au 1 Place du Commerce, 19240 Saint-Viance.</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            <a href="tel:+33555231016" className="inline-flex min-h-12 items-center gap-2 text-base text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><Phone size={18} aria-hidden="true" />05 55 23 10 16</a>
            <a href="https://www.google.com/maps/dir/?api=1&destination=1%20Place%20du%20Commerce%2C%2019240%20Saint-Viance" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 text-base text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><MapPin size={18} aria-hidden="true" />Calculer mon itinéraire<span className="sr-only"> (Google Maps, nouvel onglet)</span></a>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
