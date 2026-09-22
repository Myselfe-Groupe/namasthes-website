"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

interface Partner {
    id: string;
    name: string;
    description: string;
    image_url: string;
}

export default function PartnersPage() {
    const supabase = createClient();
    const partnersPerPage = 8;

    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPartners, setTotalPartners] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        async function fetchPartners() {
            const from = (currentPage - 1) * partnersPerPage;
            const to = from + partnersPerPage - 1;
            const { data, count } = await supabase
                .from("partners")
                .select("*", { count: "exact" })
                .order("created_at")
                .range(from, to);

            setPartners(
                (data ?? []).map((partner) => ({
                    ...partner,
                }))
            );
            setTotalPartners(count ?? 0);
            setLoading(false);
        }

        fetchPartners();
    }, [currentPage, refreshKey]);

    const totalPages = Math.ceil(totalPartners / partnersPerPage);

    async function deletePartner(id: string) {
        const confirmed = confirm(
            "Êtes-vous sûr de vouloir supprimer ce partenaire ?"
        );

        if (!confirmed) return;

        try {
            // 1. Récupérer les infos du partenaire (notamment l'image) AVANT la suppression
            const { data: partnerData, error: fetchError } = await supabase
                .from("partners")
                .select("image_url")
                .eq("id", id)
                .single();

            if (fetchError) {
                console.error("Erreur lors de la récupération du partenaire avant suppression:", fetchError);
            }

            // 2. Supprimer le partenaire de la base de données PostgreSQL
            const { error: deleteError } = await supabase
                .from("partners")
                .delete()
                .eq("id", id);

            if (deleteError) throw deleteError;


            // 3. Si le partenaire avait une image, on le supprime du bucket Storage
            if (partnerData?.image_url) {
                // On nettoie l'URL des éventuels paramètres de cache (?v=...)
                const urlWithoutParams = partnerData.image_url.split("?")[0];
                const parts = urlWithoutParams.split("/");
                const fileNameToDelete = parts[parts.length - 1];

                if (fileNameToDelete) {
                    const { error: storageError } = await supabase.storage
                        .from("partners")
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
            alert("Une erreur est survenue lors de la suppression du partenaire.");
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
                        Partenaires
                    </h1>

                    <p className="text-muted-foreground">
                        Gérez les partenaires
                    </p>
                </div>

                <Link href="/admin/partners/create">
                    <Button variant="primary" size="lg">
                        Ajouter un partenaire
                    </Button>
                </Link>
            </div>

            <div className="overflow-hidden rounded-sm border">
                <table className="w-full">
                    <thead className="bg-muted">
                        <tr>
                            <th className="p-4 text-left">
                                Partenaire
                            </th>

                            <th className="p-4 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {partners.map((partner) => (
                            <tr
                                key={partner.id}
                                className="border-t"
                            >
                                <td className="p-4">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={partner.image_url}
                                            alt={partner.name}
                                            width={80}
                                            height={80}
                                            className="rounded-sm object-cover"
                                        />
                                        <div className="space-y-1">
                                            <p className="font-semibold text-sm text-foreground">
                                                {partner.name}
                                            </p>
                                            <p className="line-clamp-2 text-sm text-muted-foreground">
                                                {partner.description}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="p-4">
                                    <div className="flex flex-row justify-end gap-2">
                                        <Link
                                            href={`/admin/partners/${partner.id}`}
                                            className="cursor-pointer rounded-lg border border-primary hover:bg-primary/5 p-3 text-sm font-medium text-primary transition flex items-center justify-center gap-2"
                                        >
                                            <FaEdit />
                                        </Link>
                                        <button
                                            className="cursor-pointer rounded-lg border border-red-700 hover:bg-red-700/5 p-3 text-sm font-medium text-red-700 transition flex items-center justify-center gap-2"
                                            onClick={() =>
                                                deletePartner(partner.id)
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
                <nav className="flex items-center justify-center gap-6" aria-label="Pagination des partners">
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