import Image from "next/image";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

interface Partenaire {
    id: string;
    name: string;
    description: string;
    image_url: string | null;
}

export default async function PartnersSection() {
    const supabase = createClient(await cookies());
    const { data } = await supabase
        .from("partners")
        .select("id, name, description, image_url")
        .order("created_at", { ascending: false });
    const partenaires = (data ?? []) as Partenaire[];


    return (
        <section className="w-full bg-muted px-6 py-16 sm:px-10 lg:px-12">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex flex-col items-end justify-end gap-4">
                    <div className="items-end flex flex-col">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                            Partenaires
                        </p>
                        <h2 className="mt-3 text-3xl font-title text-secondary sm:text-4xl">
                            Découvrez nos partenaires
                        </h2>
                    </div>
                    <span className="h-0.5 w-3/4 sm:w-1/2 bg-accent"></span>
                </div>

                <div className="flex flex-col gap-6">
                    {partenaires.map((partenaire) => (
                        <div
                            key={partenaire.id}
                            className="flex flex-col items-center gap-8 p-6 sm:flex-row sm:even:flex-row-reverse"
                        >
                            <div className="relative">
                                {partenaire.image_url && (
                                    <Image
                                        src={partenaire.image_url}
                                        alt={partenaire.name}
                                        width={500}
                                        height={500}
                                        className="relative z-20 rounded-sm object-cover"
                                    />
                                )}
                                <div className="absolute w-full h-full bg-secondary rounded-sm -top-2 -left-2 z-0"></div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-semibold text-secondary">
                                    {partenaire.name}
                                </h3>
                                <p className="text-sm leading-7 text-foreground/80">
                                    {partenaire.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}