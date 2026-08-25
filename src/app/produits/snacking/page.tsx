import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Snacking",
    description: "Découvrez nos produits de snacking fraîchement préparés chaque jour à Saint-Viance.",
    alternates: {
        canonical: "/produits/snacking"
    }
};

export default function SnackingPage() {
    return (
        <main className="bg-background text-foreground">
            <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 lg:px-12">
                <div className="relative flex flex-col gap-4 justify-center items-center">
                    <h1 className="absolute top-18 text-4xl font-text uppercase text-secondary z-10">Snacking</h1>
                    <span className="font-title text-accent/70 text-9xl text-center drop-shadow-lg z-0">Snacking</span>
                    <span className="absolute top-28 w-full h-0.5 bg-secondary/70 z-10" />
                </div>
                <div className="h-full mt-12 flex flex-col sm:flex-row gap-8 items-center justify-center">
                    <Image
                        src="/images/snacking.jpg"
                        alt="Snacking"
                        className="mx-auto rounded-lg shadow-lg aspect-square object-cover"
                        width={400}
                        height={200}
                    />
                    <div className="gap-3 flex flex-col">
                        <h2 className="text-2xl font-text text-secondary uppercase">La pause dèj'</h2>
                        <p className="text-base leading-6 text-foreground/80">
                            Bienvenue dans notre espace snacking, où gourmandise, fraîcheur et simplicité se rencontrent au quotidien.
                            Nous élaborons chaque jour des plats faits maison ainsi qu’une sélection de sandwichs préparés avec des ingrédients frais et de qualité, soigneusement choisis pour garantir saveur et générosité.
                        </p>
                        <p className="text-base leading-6 text-foreground/80">
                            Nos recettes sont pensées pour plaire au plus grand nombre, en proposant des associations gourmandes, équilibrées et adaptées à toutes les envies, que ce soit pour une pause rapide, un déjeuner convivial ou un moment gourmand à partager.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

