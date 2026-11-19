import type { Metadata } from "next";
import { FaDownload, FaPhoneAlt } from "react-icons/fa";
import { pizzaCategories, pizzaServiceHours, pizzaSizes, pizzaToppings } from "@/data/pizza-menu";

export const metadata: Metadata = {
	title: "Carte des pizzas",
	description: "Découvrez nos pizzas, leurs ingrédients et leurs prix, les horaires du service et commandez par téléphone chez Namas'thés à Saint-Viance.",
	alternates: {
		canonical: "/carte-des-pizzas",
	},
};

const menuImage = "/images/carte-des-pizzas.png";
const formatPrice = (price: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price);

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
					<p className="mx-auto mt-4 max-w-2xl text-base leading-7">
						Sur place ou à emporter, choisissez votre pizza et commandez par téléphone ou directement au comptoir.
					</p>
				</div>

				<section aria-labelledby="service-title" className="my-10 rounded-lg border border-border bg-muted p-5 sm:p-8">
					<div className="grid gap-6 lg:grid-cols-2 lg:items-center">
						<div>
							<h2 id="service-title" className="text-xl font-semibold text-primary">Horaires du service pizzas</h2>
							<dl className="mt-4 space-y-3 text-base leading-7">
								{pizzaServiceHours.map(({ days, times }) => (
									<div key={days}><dt className="font-semibold">{days}</dt><dd>{times}</dd></div>
								))}
							</dl>
						</div>
						<div className="flex flex-col items-start gap-3">
							<p className="text-base leading-7">Une envie de pizza ? Appelez-nous pour commander.</p>
							<a href="tel:+33555231016" className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-primary px-5 py-4 text-center text-base font-semibold text-background transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:w-auto">
								<FaPhoneAlt aria-hidden="true" className="shrink-0" />
								Appeler le 05 55 23 10 16
							</a>
						</div>
					</div>
				</section>

				<p className="mb-8 text-base leading-7">Trois tailles : Enfant (20 cm), M (27 cm) et XL (34 cm). Les tailles disponibles et leurs prix sont indiqués pour chaque recette.</p>
				<div className="space-y-10">
					{pizzaCategories.map((category) => (
						<section key={category.title} aria-labelledby={`category-${category.title.replaceAll(" ", "-")}`}>
							<h2 id={`category-${category.title.replaceAll(" ", "-")}`} className="mb-4 border-b border-border pb-3 text-2xl font-semibold text-primary">{category.title}</h2>
							<ul className="grid gap-4 md:grid-cols-2">
								{category.pizzas.map((pizza) => (
									<li key={pizza.name} className="min-w-0 rounded-lg border border-accent bg-muted p-5 sm:p-6">
										<h3 className="text-xl font-semibold text-secondary">{pizza.name}</h3>
										{pizza.note && <p className="mt-2 text-base font-semibold text-primary">{pizza.note}</p>}
										<p className="mt-3 text-base leading-7">{pizza.ingredients}</p>
										<dl className="mt-4 space-y-2 border-t border-accent pt-4 text-base">
											{pizza.prices.map((price, index) => price !== null && (
												<div key={pizzaSizes[index]} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
													<dt>{pizzaSizes[index]}</dt>
													<dd className="whitespace-nowrap font-semibold tabular-nums text-primary">{formatPrice(price)}</dd>
												</div>
											))}
										</dl>
									</li>
								))}
							</ul>
						</section>
					))}
				</div>

				<section aria-labelledby="toppings-title" className="mt-10 rounded-lg border border-border p-5 sm:p-6">
					<h2 id="toppings-title" className="text-2xl font-semibold text-primary">Les suppléments</h2>
					<dl className="mt-5 grid gap-x-10 gap-y-3 text-base sm:grid-cols-2">
						{pizzaToppings.map(({ name, price }) => (
							<div key={name} className="flex justify-between gap-4"><dt>{name}</dt><dd className="whitespace-nowrap font-semibold tabular-nums">{formatPrice(price)}</dd></div>
						))}
					</dl>
				</section>

				<div className="mt-8 flex justify-center">
					<a
						href={menuImage}
						download="carte-pizzas-namasthes.png"
						className="inline-flex min-h-12 items-center gap-3 rounded-sm bg-primary px-5 py-3 text-base font-semibold text-background transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
					>
						<FaDownload aria-hidden="true" />
						Télécharger la carte
					</a>
				</div>
			</section>
		</main>
	);
}
