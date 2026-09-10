import type { Metadata } from "next";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";

export const metadata: Metadata = {
	title: "Carte des pizzas",
	description: "Consultez et téléchargez la carte des pizzas de Namas'thés.",
	alternates: {
		canonical: "/carte-des-pizzas",
	},
};

const menuImage = "/images/carte-des-pizzas.png";

export default function MenuPage() {
	return (
		<main className="bg-background text-foreground">
			<section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 sm:py-20 lg:px-12">
				<div className="mb-10 text-center">
					<p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
						Namas'thés
					</p>
					<h1 className="mt-3 font-title text-4xl text-secondary sm:text-5xl">
						Carte des pizzas
					</h1>
					<p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-foreground/75 sm:text-base">
						Consultez notre carte et téléchargez-la pour la garder avec vous.
					</p>
				</div>

				<div className="mx-auto max-w-5xl overflow-hidden rounded-sm border border-accent bg-muted shadow-lg sm:p-5">
					<Image
						src={menuImage}
						alt="Carte des pizzas de Namas'thés"
						width={2000}
						height={1400}
						className="h-auto w-full rounded-sm object-contain"
						priority
					/>
				</div>

				<div className="mt-8 flex justify-center">
					<a
						href={menuImage}
						download="carte-pizzas-namasthes.jpg"
						className="inline-flex items-center gap-3 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
					>
						<FaDownload aria-hidden="true" />
						Télécharger la carte
					</a>
				</div>
			</section>
		</main>
	);
}
