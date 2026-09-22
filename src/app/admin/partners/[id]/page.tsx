"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function EditPartnerPage() {
    const supabase = createClient();
    const router = useRouter();
    const params = useParams();

    const partnerId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [image, setImage] = useState<File | null>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(
        null
    );

    useEffect(() => {
        fetchPartner();
    }, []);

    async function fetchPartner() {
        const { data, error } = await supabase
            .from("partners")
            .select("*")
            .eq("id", partnerId)
            .single();

        if (error) {
            console.error(error);
            return;
        }

        setName(data.name);
        setDescription(data.description);
        setImageUrl(data.image_url ?? "");

        setLoading(false);
    }

    const handleFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            return;
        }

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        try {
            setSaving(true);

            let finalImageUrl = imageUrl;

            if (image) {
                if (imageUrl) {
                    const parts = imageUrl.split("/");
                    const fileNameToDelete = parts[parts.length - 1];

                    if (fileNameToDelete) {
                        const { error: deleteError } = await supabase.storage
                            .from("partners")
                            .remove([fileNameToDelete]);

                        if (deleteError) {
                            console.error(
                                "Détails de l'erreur de suppression :",
                                deleteError
                            );
                        } else {
                            console.log("Ancien image supprimé avec succès du bucket");
                        }
                    }
                }

                const extension = image.name.split(".").pop();

                const fileName =
                    crypto.randomUUID() + "." + extension;

                const { error: uploadError } =
                    await supabase.storage
                        .from("partners")
                        .upload(fileName, image);

                if (uploadError) {
                    throw uploadError;
                }

                const {
                    data: { publicUrl },
                } = supabase.storage
                    .from("partners")
                    .getPublicUrl(fileName);

                finalImageUrl = publicUrl;
            }

            const { error } = await supabase
                .from("partners")
                .update({
                    name,
                    description,
                    image_url: finalImageUrl,
                })
                .eq("id", partnerId);

            if (error) {
                throw error;
            }

            router.push("/admin/partners");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la mise à jour");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div>
                Chargement...
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl relative">
            <div className="mb-8 space-y-2">
                <h1 className="text-3xl uppercase tracking-[0.15em] underline underline-offset-3">
                    Modifier le partenaire
                </h1>

                <p className="text-muted-foreground">
                    Mettre à jour les informations.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <div>
                    <label className="mb-2 block">
                        Nom
                    </label>

                    <input
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block">
                        Description
                    </label>

                    <textarea
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        rows={8}
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block">
                        Remplacer l'image
                    </label>

                    <div
                        onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                        }}
                        onDragLeave={() => {
                            setIsDragging(false);
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            setIsDragging(false);

                            const file =
                                e.dataTransfer.files?.[0];

                            if (file) {
                                handleFile(file);
                            }
                        }}
                        className={`
            flex h-52 cursor-pointer items-center justify-center
            rounded-lg border-2 border-dashed transition-colors
            ${isDragging
                                ? "border-primary bg-primary/5"
                                : "border-muted-foreground/25"
                            }
        `}
                    >
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file =
                                    e.target.files?.[0];

                                if (file) {
                                    handleFile(file);
                                }
                            }}
                        />

                        <label
                            htmlFor="image-upload"
                            className="flex h-full w-full cursor-pointer items-center justify-center"
                        >
                            {preview ? (
                                <div className="text-center space-y-2">
                                    <Image
                                        src={preview}
                                        alt="Prévisualisation"
                                        width={120}
                                        height={120}
                                        className="mx-auto rounded-lg object-cover"
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        Cliquez ou déposez une autre image
                                    </p>
                                </div>
                            ) : imageUrl ? (
                                <div className="text-center space-y-2">
                                    <Image
                                        src={imageUrl}
                                        alt={name}
                                        width={120}
                                        height={120}
                                        className="mx-auto rounded-lg object-cover opacity-70"
                                    />

                                    <p className="text-sm text-muted-foreground">
                                        Cliquez ou déposez une autre image
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <p className="font-medium">
                                        Glissez-déposez votre image ici
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        ou cliquez pour sélectionner un fichier
                                    </p>
                                </div>
                            )}
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={() =>
                            router.push("/admin/partners")
                        }
                        className=""
                    >
                        Annuler
                    </Button>

                    <Button
                        disabled={saving}
                    >
                        {saving
                            ? "Enregistrement..."
                            : "Enregistrer"}
                    </Button>
                </div>
            </form>
        </div>
    );
}