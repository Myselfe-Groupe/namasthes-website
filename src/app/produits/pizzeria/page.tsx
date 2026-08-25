import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Pizzeria",
    description: "Découvrez nos produits de pizzeria fraîchement préparés chaque jour à Saint-Viance.",
    alternates: {
        canonical: "/produits/pizzeria"
    }
};

export default function PizzeriaPage() {
    return (
        <main className="bg-background text-foreground">
            <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 lg:px-12">
                <div className="relative flex flex-col gap-4 justify-center items-center">
                    <h1 className="absolute top-18 text-4xl font-text uppercase text-secondary z-10">Pizzeria</h1>
                    <span className="font-title text-accent/70 text-9xl text-center drop-shadow-lg z-0">Pizzeria</span>
                    <span className="absolute top-28 w-full h-0.5 bg-secondary/70 z-10" />
                </div>
                <div className="h-full mt-12 flex flex-col sm:flex-row gap-8 items-center justify-center">
                    <Image
                        src="/images/vitrine-contrast.jpeg"
                        alt="Pizzeria"
                        className="mx-auto rounded-lg shadow-lg aspect-square object-cover"
                        width={400}
                        height={200}
                    />
                    <div className="gap-3 flex flex-col">
                        <h2 className="text-2xl font-text text-secondary uppercase">Pizza midi & soir</h2>
                        <div className="flex flex-col p-2 border-accent border bg-muted rounded-sm text-sm mb-4">
                            <p>Lun-Jeu : 11:30 - 14:00 / 19:00 - 21:00</p>
                            <p>Ven-Sam : 11:30 - 14:00 / 19:00 - 21:30</p>
                            <p>Dim : 11:30 - 13:00 / 19:00 - 21:00</p>
                            <p className="font-semibold mt-2">Commander : 05 55 23 10 16</p>
                        </div>
                        <p className="text-base leading-6 text-foreground/80">
                            Bienvenue dans notre pizzeria, un lieu pensé pour les amoureux de saveurs authentiques et de cuisine généreuse.
                            Nous sélectionnons avec soin des ingrédients frais et de qualité afin de créer des pizzas gourmandes, équilibrées et pleines de caractère.
                        </p>
                        <p className="text-base leading-6 text-foreground/80">
                            À travers notre carte, nous aimons mêler créativité, finesse et associations de goûts afin de proposer aussi bien des recettes incontournables que des créations originales qui éveillent la curiosité et le plaisir des papilles.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

