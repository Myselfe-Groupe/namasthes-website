import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import ProductSearch from "@/components/sections/ProductSearch";

interface Product {
	id: string;
	name: string;
	category: string;
	description: string;
	image_url: string | null;
}

export const categoryLabels: Record<string, string> = {
	boulangerie: "Boulangerie",
	patisserie: "Pâtisserie",
	pizzeria: "Pizzeria",
	snacking: "Snacking",
	"salon-de-the": "Salon de thé",
	chocolaterie: "Chocolaterie",
};

interface NewProductsSectionProps {
	category?: string;
	page?: number;
	query?: string;
}

const PRODUCTS_PER_PAGE = 8;

export default async function ProductsSection({ category, page = 1, query = "" }: NewProductsSectionProps) {
	const supabase = createClient(await cookies());
	const searchQuery = query.trim();
	let productsQuery = supabase
		.from("products")
		.select("id, name, category, description, image_url", { count: "exact" });

	if (category) {
		productsQuery = productsQuery.eq("category", category);
	}

	if (searchQuery) {
		productsQuery = productsQuery.ilike("name", `%${searchQuery}%`);
	}

	const currentPage = Math.max(1, page);
	const from = (currentPage - 1) * PRODUCTS_PER_PAGE;
	const to = from + PRODUCTS_PER_PAGE - 1;
	const { data, count } = category
		? await productsQuery.order("created_at", { ascending: false }).range(from, to)
		: await productsQuery.order("created_at", { ascending: false }).limit(4);

	const products = (data ?? []) as Product[];
	const totalPages = category ? Math.ceil((count ?? 0) / PRODUCTS_PER_PAGE) : 1;

	return (
		<section className="w-full bg-muted px-6 py-16 sm:px-10 lg:px-12">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 flex flex-col sm:flex-row items-start justify-between gap-4">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
							{category ? categoryLabels[category] : "Nouveautés"}
						</p>
						<h2 className="mt-3 text-3xl font-title text-secondary sm:text-4xl">
							{category ? `Nos produits de ${categoryLabels[category] ?? category}` : "Nos derniers produits"}
						</h2>
					</div>
					{category && (
						<ProductSearch category={category} initialQuery={searchQuery} />
					)}
				</div>


				{products.length > 0 ? (
					<div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
						{products.map((product) => (
							<Link
								key={product.id}
								href={`/produits/${product.id}`}
								className="overflow-hidden"
							>
								{product.image_url ? (
									<Image
										src={product.image_url}
										alt={product.name}
										width={500}
										height={500}
										className="aspect-square w-full object-cover rounded-sm"
									/>
								) : (
									<div className="flex aspect-square items-center justify-center bg-accent text-sm text-secondary">
										Image indisponible
									</div>
								)}
								<div className="space-y-3 p-5 flex flex-col items-center justify-center w-full text-center">
									<p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
										{categoryLabels[product.category] ?? product.category}
									</p>
									<h3 className="text-xl font-semibold text-secondary">
										{product.name}
									</h3>
									<p className="line-clamp-2 text-sm leading-6 text-foreground/75">
										{product.description}
									</p>
								</div>
							</Link>
						))}
					</div>
				) : (
					<p className="text-foreground/70">Aucun produit ne correspond à votre recherche.</p>
				)}

				{category && totalPages > 1 && (
					<nav className="mt-10 flex items-center justify-center gap-6" aria-label="Pagination des produits">
						{currentPage > 1 ? (
							<Link
								href={`/produits/${category}?page=${currentPage - 1}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""}`}
								scroll={false}
								className="font-semibold text-primary underline underline-offset-4"
							>
								Précédent
							</Link>
						) : (
							<span className="text-foreground/40">Précédent</span>
						)}

						<span className="text-sm text-foreground/70">
							Page {currentPage} sur {totalPages}
						</span>

						{currentPage < totalPages ? (
							<Link
								href={`/produits/${category}?page=${currentPage + 1}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""}`}
								scroll={false}
								className="font-semibold text-primary underline underline-offset-4"
							>
								Suivant
							</Link>
						) : (
							<span className="text-foreground/40">Suivant</span>
						)}
					</nav>
				)}
			</div>
		</section>
	);
}
