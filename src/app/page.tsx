import type { Metadata } from "next";
import HeroSlider from "@/components/sections/HeroSlider";
import SocialSection from "@/components/sections/SocialSection";
import Link from "next/link";

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
        <HeroSlider />

        <section className="w-full bg-background px-6 py-16 sm:px-10 lg:px-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Boulangerie et pizzeria à Saint-Viance</p>
              <h2 className="mt-3 text-3xl font-title text-secondary sm:text-4xl">
                Namas'thés, votre adresse gourmande à Saint-Viance
              </h2>
              <p className="mt-4 text-base leading-8 text-foreground/80 sm:text-lg">
                Entre boulangerie artisanale, pizzeria, pâtisserie, chocolat et salon de thé, Namas'thés vous accueille pour des moments gourmands sur place ou à emporter.
              </p>
              <p className="mt-4 text-base leading-8 text-foreground/80 sm:text-lg">
                Situé au cœur de Saint-Viance, le restaurant propose des produits faits avec soin, des horaires adaptés à toute la journée et un cadre chaleureux pour les familles, les amis et les pauses gourmandes.
              </p>
            </div>

            <div className="w-full max-w-md rounded-2xl border border-border/70 bg-muted p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-secondary">Rendez-nous visite !</h3>
              <p className="mt-3 text-sm leading-7 text-foreground/80">
                1 Place du Commerce, 19240 Saint-Viance
              </p>
              <p className="mt-2 text-sm leading-7 text-foreground/80">
                Téléphone : 05 55 23 10 16
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90"
              >
                Voir les horaires / Nous contacter
              </Link>
            </div>
          </div>
        </section>
        <SocialSection />
      </main>
    </div>
  );
}
