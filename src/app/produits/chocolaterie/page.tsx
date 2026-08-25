import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Chocolaterie",
    description: "Découvrez nos produits de chocolaterie en partenariat avec Cluizel",
    alternates: {
        canonical: "/produits/chocolaterie"
    }
};

export default function ChocolateriePage() {
    return (
        <main className="bg-background text-foreground">
            <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 lg:px-12">
                <div className="relative flex flex-col gap-4 justify-center items-center">
                    <h1 className="absolute top-18 text-4xl font-text uppercase text-secondary z-10">Chocolaterie</h1>
                    <span className="font-title text-accent/70 text-9xl text-center drop-shadow-lg z-0">Chocolaterie</span>
                    <span className="absolute top-28 w-full h-0.5 bg-secondary/70 z-10" />
                </div>
                <div className="h-full mt-12 flex flex-col sm:flex-row gap-8 items-center justify-center">
                    <Image
                        src="/images/chocolaterie.jpg"
                        alt="Chocolaterie"
                        className="mx-auto rounded-lg shadow-lg aspect-square object-cover"
                        width={400}
                        height={200}
                    />
                    <div className="gap-3 flex flex-col">
                        <h2 className="text-2xl font-text text-secondary uppercase">Nos chocolats</h2>
                        <p className="text-base leading-6 text-foreground/80">
                            Bienvenue dans notre univers chocolaterie, un espace dédié à la gourmandise, au raffinement et à l’excellence du goût.
                            Afin de vous proposer des chocolats d’exception, nous avons choisi de travailler en partenariat avec Manufacture CLUIZEL, une maison française reconnue pour son savoir-faire artisanal et la qualité remarquable de ses chocolats.
                        </p>
                        <p className="text-base leading-6 text-foreground/80">
                            Entreprise familiale depuis plusieurs générations, CLUIZEL partage des valeurs qui nous tiennent particulièrement à cœur : la passion du produit, le respect des matières premières et la transmission d’un véritable savoir-faire chocolatier. La Manufacture sélectionne avec exigence des fèves de cacao traçables et travaille en relation durable avec ses planteurs afin de garantir des chocolats aux profils aromatiques riches, authentiques et naturels.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

