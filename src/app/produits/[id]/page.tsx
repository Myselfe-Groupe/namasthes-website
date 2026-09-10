import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { categoryLabels } from "@/components/sections/ProductsSection";
import { GoArrowLeft } from "react-icons/go";

interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    image_url: string | null;
    website: string | null;
    allergens: unknown;
}

function normalizeAllergens(value: unknown): string[] {
    if (Array.isArray(value)) {
        return value.filter((allergen): allergen is string => typeof allergen === "string");
    }

    if (typeof value !== "string" || !value.trim()) {
        return [];
    }

    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed)
            ? parsed.filter((allergen): allergen is string => typeof allergen === "string")
            : [];
    } catch {
        return value.split(",").map((allergen) => allergen.trim()).filter(Boolean);
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const supabase = createClient(await cookies());
    const { data } = await supabase.from("products").select("name, description").eq("id", id).single();

    return {
        title: data?.name ?? "Produit",
        description: data?.description ?? "Découvrez ce produit Namas'thés.",
    };
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = createClient(await cookies());
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

    if (error || !data) {
        notFound();
    }

    const product = data as Product;
    const allergens = normalizeAllergens(product.allergens);
    const categoryName = categoryLabels[product.category] ?? product.category;

    return (
        <main className="bg-background text-foreground">
            <div className="relative mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 sm:py-10 md:px-12">
                <Link
                    href={`/produits/${product.category}`}
                    className="absolute xl:-left-10 xl:top-18 flex flex-row items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4"
                >
                    <GoArrowLeft />
                    Retour
                </Link>

                <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-start">
                    {product.image_url ? (
                        <Image
                            src={product.image_url}
                            alt={product.name}
                            width={800}
                            height={800}
                            className="aspect-square w-full rounded-sm object-cover"
                        />
                    ) : (
                        <div className="flex aspect-square items-center justify-center rounded-sm bg-accent text-secondary">
                            Image indisponible
                        </div>
                    )}

                    <div className="space-y-6">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                                {categoryName}
                            </p>
                            <h1 className="mt-3 text-4xl font-title text-secondary sm:text-5xl">
                                {product.name}
                            </h1>
                        </div>

                        <p className="text-base leading-8 text-foreground/80">
                            {product.description}
                        </p>

                        {allergens.length > 0 && (
                            <div>
                                <h2 className="text-lg font-semibold text-secondary">Allergènes</h2>
                                <ul className="mt-3 flex flex-wrap gap-2">
                                    {allergens.map((allergen) => (
                                        <li
                                            key={allergen}
                                            className="rounded-full border border-border bg-muted px-3 py-1 text-sm"
                                        >
                                            {allergen}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
