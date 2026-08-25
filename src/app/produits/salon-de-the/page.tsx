import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Salon de thé",
    description: "Découvrez nos thés et boissons fraîchement préparés chaque jour à Saint-Viance.",
    alternates: {
        canonical: "/produits/salon-de-the"
    }
};

export default function SalonDeThePage() {
    return (
        <main className="bg-background text-foreground">
            <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 lg:px-12">
                <div className="relative flex flex-col gap-4 justify-center items-center">
                    <h1 className="absolute top-18 text-4xl font-text uppercase text-secondary z-10">Salon de thé</h1>
                    <span className="font-title text-accent/70 text-9xl text-center drop-shadow-lg z-0">Salon de thé</span>
                    <span className="absolute top-28 w-full h-0.5 bg-secondary/70 z-10" />
                </div>
                <div className="h-full mt-12 flex flex-col sm:flex-row gap-8 items-center justify-center">
                    <Image
                        src="/images/salon-de-the.jpg"
                        alt="Salon de thé"
                        className="mx-auto rounded-lg shadow-lg aspect-square object-cover"
                        width={400}
                        height={200}
                    />
                    <div className="gap-3 flex flex-col">
                        <h2 className="text-2xl font-text text-secondary uppercase">à dégus'thé</h2>
                        <p className="text-base leading-6 text-foreground/80">
                            Bienvenue dans notre salon de thé, un véritable cocon pensé pour les amateurs de douceur et de moments de détente.
                            Nous vous accueillons dans une ambiance chaleureuse, intimiste et réconfortante, idéale pour profiter d’une pause gourmande dans un cadre cosy et apaisant.
                        </p>
                        <p className="text-base leading-6 text-foreground/80">
                            Nous proposons une large gamme de thés, d’infusions et de boissons soigneusement sélectionnés afin d’offrir des saveurs variées et raffinées pour chaque envie et chaque moment de la journée. Nos thés proviennent de Compagnie & Co, reconnue pour la qualité et la richesse de leurs créations.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

