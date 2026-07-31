import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
    title: "MySelfe Groupe - Contact",
    description: "Contactez-nous pour toute question ou demande d'information.",
};

export default function ContactPage() {
    return (
        <main className="bg-background text-foreground">
            <div className="mx-auto w-full max-w-4xl px-6 py-20 sm:px-10 lg:px-12">
                <h2 className="text-5xl font-title text-secondary">Contact</h2>
                <p className="mt-4 text-base sm:text-lg text-secondary">Entrons en contact — envoyez-nous un message.</p>
                <div className="mt-6">
                    <ContactForm />
                </div>
            </div>
        </main>
    );
}