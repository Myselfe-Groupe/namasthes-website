import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
    title: "Allergènes",
    description: "Consultez les allergènes présents dans nos produits.",
    alternates: {
        canonical: "/allergenes",
    },
};

interface Product {
    id: string;
    name: string;
    category: string;
    image_url: string | null;
    allergens: unknown;
}

const PRODUCTS_PER_PAGE = 10;
const ALLERGENS = [
    "Gluten",
    "Crustacés",
    "Œufs",
    "Poissons",
    "Arachides",
    "Soja",
    "Lait",
    "Fruits à coque",
    "Céleri",
    "Moutarde",
    "Graines de sésame",
    "Sulfites",
    "Lupin",
    "Mollusques",
];

function normalizeAllergens(value: unknown): string[] {
    if (Array.isArray(value)) {
        return value.filter((allergen): allergen is string => typeof allergen === "string");
    }

    if (typeof value !== "string" || !value.trim()) {
        return [];
    }

    try {
        const parsed = JSON.parse(value);

        if (Array.isArray(parsed)) {
            return parsed.filter(
                (allergen): allergen is string => typeof allergen === "string"
            );
        }
    } catch {
        return value.split(",").map((allergen) => allergen.trim()).filter(Boolean);
    }

    return [];
}

export default async function AllergensPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; q?: string }>;
}) {
    const params = await searchParams;
    const searchQuery = params.q?.trim() ?? "";
    const requestedPage = Number.parseInt(params.page ?? "1", 10);
    const currentPage = Number.isNaN(requestedPage) ? 1 : Math.max(1, requestedPage);
    const from = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const to = from + PRODUCTS_PER_PAGE - 1;

    const supabase = createClient(await cookies());
    let productsQuery = supabase
        .from("products")
        .select("id, name, category, image_url, allergens", { count: "exact" });

    if (searchQuery) {
        productsQuery = productsQuery.ilike("name", `%${searchQuery}%`);
    }

    const { data, count } = await productsQuery
        .order("created_at", { ascending: false })
        .range(from, to);

    const products = (data ?? []) as Product[];
    const totalPages = Math.ceil((count ?? 0) / PRODUCTS_PER_PAGE);

    return (
        <main className="bg-background text-foreground">
            <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-10 sm:py-20 lg:px-12">
                <div className="mb-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                        Informations alimentaires
                    </p>
                    <h1 className="mt-3 text-4xl font-title text-secondary sm:text-5xl">
                        Allergènes de nos produits
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-foreground/80">
                        Retrouvez les allergènes déclarés pour chaque produit. <br />
                        En cas de doute, n'hésitez pas à nous contacter.
                    </p>
                </div>

                <form method="get" action="/allergenes" className="mb-8 flex max-w-xl gap-3">
                    <label htmlFor="product-search" className="sr-only">
                        Rechercher un produit
                    </label>
                    <input
                        id="product-search"
                        name="q"
                        type="search"
                        defaultValue={searchQuery}
                        placeholder="Rechercher un produit"
                        className="min-w-0 flex-1 rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                    />
                    <button
                        type="submit"
                        className="cursor-pointer rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-background"
                    >
                        Rechercher
                    </button>
                </form>

                {products.length === 0 ? (
                    <p className="text-foreground/70">Aucun produit disponible.</p>
                ) : (
                    <div className="overflow-x-auto rounded-sm border border-border/70">
                        <table className="w-full min-w-275 border-collapse text-xs">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="sticky left-0 z-10 border-b border-border/70 bg-muted p-4 text-left font-semibold">
                                        Produit
                                    </th>
                                    {ALLERGENS.map((allergen) => (
                                        <th
                                            key={allergen}
                                            className="border-b border-border/70 p-3 text-center font-semibold"
                                            title={allergen}
                                        >
                                            {allergen}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => {
                                    const allergens = normalizeAllergens(product.allergens);

                                    return (
                                        <tr key={product.id} className="border-b border-border/50 last:border-b-0">
                                            <th className="sticky left-0 z-10 bg-background p-4 text-left font-semibold">
                                                <Link
                                                    href={`/produits/${product.id}`}
                                                    className="text-secondary underline underline-offset-4"
                                                >
                                                    {product.name}
                                                </Link>
                                            </th>
                                            {ALLERGENS.map((allergen) => (
                                                <td key={allergen} className="p-3 text-center">
                                                    {allergens.includes(allergen) ? (
                                                        <span className="font-bold text-primary" aria-label={`Contient ${allergen}`}>
                                                            ✓
                                                        </span>
                                                    ) : (
                                                        <span className="text-foreground/20" aria-hidden="true">-</span>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {totalPages > 1 && (
                    <nav
                        className="mt-10 flex items-center justify-center gap-6"
                        aria-label="Pagination des allergènes"
                    >
                        {currentPage > 1 ? (
                            <Link
                                href={`/allergenes?page=${currentPage - 1}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""}`}
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
                                href={`/allergenes?page=${currentPage + 1}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""}`}
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
        </main>
    );
}
