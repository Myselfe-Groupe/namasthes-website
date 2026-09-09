"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    image_url: string;
    allergens: string[];
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

export default function ProductsPage() {
    const supabase = createClient();
    const productsPerPage = 8;

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        async function fetchProducts() {
            const from = (currentPage - 1) * productsPerPage;
            const to = from + productsPerPage - 1;
            const { data, count } = await supabase
                .from("products")
                .select("*", { count: "exact" })
                .order("created_at")
                .range(from, to);

            setProducts(
                (data ?? []).map((product) => ({
                    ...product,
                    allergens: normalizeAllergens(product.allergens),
                }))
            );
            setTotalProducts(count ?? 0);
            setLoading(false);
        }

        fetchProducts();
    }, [currentPage, refreshKey]);

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    async function deleteProduct(id: string) {
        const confirmed = confirm(
            "Êtes-vous sûr de vouloir supprimer ce produit ?"
        );

        if (!confirmed) return;

        try {
            // 1. Récupérer les infos du produit (notamment l'image) AVANT la suppression
            const { data: productData, error: fetchError } = await supabase
                .from("products")
                .select("image_url")
                .eq("id", id)
                .single();

            if (fetchError) {
                console.error("Erreur lors de la récupération du produit avant suppression:", fetchError);
            }

            // 2. Supprimer le produit de la base de données PostgreSQL
            const { error: deleteError } = await supabase
                .from("products")
                .delete()
                .eq("id", id);

            if (deleteError) throw deleteError;


            // 3. Si le produit avait une image, on le supprime du bucket Storage
            if (productData?.image_url) {
                // On nettoie l'URL des éventuels paramètres de cache (?v=...)
                const urlWithoutParams = productData.image_url.split("?")[0];
                const parts = urlWithoutParams.split("/");
                const fileNameToDelete = parts[parts.length - 1];

                if (fileNameToDelete) {
                    const { error: storageError } = await supabase.storage
                        .from("products")
                        .remove([fileNameToDelete]);

                    if (storageError) {
                        console.error("Erreur lors de la suppression de l'image du bucket:", storageError);
                    } else {
                        console.log("Image associée supprimée du bucket avec succès !");
                    }
                }
            }

            // 4. Rafraîchir la page courante
            setRefreshKey((key) => key + 1);

        } catch (error) {
            console.error("Erreur globale lors de la suppression:", error);
            alert("Une erreur est survenue lors de la suppression du produit.");
        }
    }

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Produits
                    </h1>

                    <p className="text-muted-foreground">
                        Gérez les produits
                    </p>
                </div>

                <Link href="/admin/products/create">
                    <Button variant="primary" size="lg">
                        Ajouter un produit
                    </Button>
                </Link>
            </div>

            <div className="overflow-hidden rounded-sm border">
                <table className="w-full">
                    <thead className="bg-muted">
                        <tr>
                            <th className="p-4 text-left">
                                Produit
                            </th>

                            <th className="p-4 text-left">
                                Catégorie
                            </th>

                            <th className="p-4 text-left">
                                Allergènes
                            </th>

                            <th className="p-4 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product.id}
                                className="border-t"
                            >
                                <td className="p-4">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={product.image_url}
                                            alt={product.name}
                                            width={80}
                                            height={80}
                                            className="rounded-sm object-cover"
                                        />
                                        <div className="space-y-1">
                                            <p className="font-semibold text-sm text-foreground">
                                                {product.name}
                                            </p>
                                            <p className="line-clamp-2 text-sm text-muted-foreground">
                                                {product.description}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="p-4 text-sm">
                                    {product.category}
                                </td>

                                <td className="p-4">
                                    <div className="flex flex-wrap gap-2">
                                        {product.allergens?.map((allergen) => (
                                            <span
                                                key={allergen}
                                                className="rounded-full bg-primary/80 text-background px-3 py-1 text-xs border border-border"
                                            >
                                                {allergen}
                                            </span>
                                        ))}
                                    </div>
                                </td>

                                <td className="p-4">
                                    <div className="flex flex-row justify-end gap-2">
                                        <Link
                                            href={`/admin/products/${product.id}`}
                                            className="cursor-pointer rounded-lg border border-primary hover:bg-primary/5 p-3 text-sm font-medium text-primary transition flex items-center justify-center gap-2"
                                        >
                                            <FaEdit />
                                        </Link>
                                        <button
                                            className="cursor-pointer rounded-lg border border-red-700 hover:bg-red-700/5 p-3 text-sm font-medium text-red-700 transition flex items-center justify-center gap-2"
                                            onClick={() =>
                                                deleteProduct(product.id)
                                            }
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <nav className="flex items-center justify-center gap-6" aria-label="Pagination des produits">
                    <button
                        type="button"
                        onClick={() => setCurrentPage((page) => page - 1)}
                        disabled={currentPage === 1}
                        className="cursor-pointer font-semibold text-primary underline underline-offset-4 disabled:text-foreground/40 disabled:no-underline"
                    >
                        Précédent
                    </button>

                    <span className="text-sm text-muted-foreground">
                        Page {currentPage} sur {totalPages}
                    </span>

                    <button
                        type="button"
                        onClick={() => setCurrentPage((page) => page + 1)}
                        disabled={currentPage === totalPages}
                        className="cursor-pointer font-semibold text-primary underline underline-offset-4 disabled:text-foreground/40 disabled:no-underline"
                    >
                        Suivant
                    </button>
                </nav>
            )}
        </div>
    );
}