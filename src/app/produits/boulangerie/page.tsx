import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Boulangerie",
    description: "Découvrez nos produits de boulangerie fraîchement cuits chaque jour à Saint-Viance.",
    alternates: {
        canonical: "/produits/boulangerie"
    }
};

export default function BoulangeriePage() {
    return (
        <main className="bg-background text-foreground">
            <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-20 sm:px-10 lg:px-12">
                <div className="relative flex flex-col gap-4 justify-center items-center">
                    <h1 className="absolute top-10 sm:top-18 text-2xl sm:text-4xl font-text uppercase text-secondary z-10">Boulangerie</h1>
                    <span className="font-title text-accent/70 text-7xl sm:text-9xl text-center drop-shadow-lg z-0">Boulangerie</span>
                    <span className="absolute top-18 sm:top-28 w-full h-0.5 bg-secondary/70 z-10" />
                </div>
                <div className="mt-12 flex flex-col sm:flex-row gap-8 items-center justify-center">
                    <Image
                        src="/images/vitrine-contrast.jpeg"
                        alt="Boulangerie"
                        className="mx-auto rounded-lg shadow-lg aspect-square object-cover"
                        width={400}
                        height={200}
                    />
                    <div className="gap-3 flex flex-col">
                        <h2 className="text-2xl font-text text-secondary uppercase">Du pain de qualité</h2>
                        <p className=" text-sm sm:text-base leading-6 text-foreground/80">
                            Dans notre boulangerie, nous sommes fiers de proposer un pain de qualité, élaboré avec des farines issues de meuniers français, en partenariat avec Axiane en Bretagne, afin de garantir authenticité, traçabilité et excellence des matières premières.
                        </p>
                        <p className="text-sm sm:text-base leading-6 text-foreground/80">
                            Fidèles à un savoir-faire traditionnel, nous mettons chaque jour passion et exigence au cœur de notre travail pour offrir des produits qui respectent les gestes d’antan tout en répondant aux attentes d’aujourd’hui.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

