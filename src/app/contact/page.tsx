import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
    title: "Contact",
    description: "Contactez Namas'thés pour réserver, poser une question ou venir nous rendre visite à Saint-Viance.",
    alternates: {
        canonical: "/contact"
    }
};

export default function ContactPage() {
    return (
        <main className="bg-background text-foreground">
            <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-20 sm:px-10 lg:px-12">
                <h2 className="text-5xl font-title text-secondary">Horaires</h2>
                <div className="flex flex-col md:flex-row gap-3 mt-4 text-xs sm:text-sm text-secondary">
                    <div className="w-full flex flex-col gap-1 border border-secondary/20 p-4 rounded-lg bg-muted">
                        <h3 className="text-base md:text-lg font-bold">Boulangerie</h3>
                        <p>Lun-Sam : 06:30 - 21:00</p>
                        <p>Dim : 07:00 - 13:00</p>
                    </div>
                    <div className="w-full flex flex-col gap-1 border border-secondary/20 p-4 rounded-lg bg-muted">
                        <h3 className="text-base md:text-lg font-bold">Pizzeria</h3>
                        <p>Lun-Sam : 11:30 - 14:00 / 19:00 - 21:00</p>
                        <p>Dim : 11:30 - 13:00 / 19:00 - 21:00</p>
                    </div>
                </div>
            </div>
            <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-20 sm:px-10 lg:px-12">
                <h2 className="text-5xl font-title text-secondary">Informations</h2>
                <div className="w-full flex flex-col md:flex-row gap-3 mt-4 text-sm text-secondary">
                    <div className="w-full md:w-2/5 flex flex-col gap-3">
                        <div className="h-full flex flex-col justify-between gap-3 border border-secondary/20 p-4 rounded-lg bg-muted">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg font-bold">Réseaux sociaux</h3>
                                <p>Suivez-nous !</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <a
                                    href="https://www.instagram.com/namas.thes/"
                                    aria-label="Instagram"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="transition-transform hover:-translate-y-0.5 flex items-center gap-2"
                                >
                                    <InstagramIcon />
                                    <span>namas.thes</span>
                                </a>
                                <a
                                    href="https://www.tiktok.com/@namas.thes"
                                    aria-label="TikTok"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="transition-transform hover:-translate-y-0.5 flex items-center gap-2"
                                >
                                    <TikTokIcon />
                                    <span>@namas.thes</span>
                                </a>
                            </div>
                        </div>
                        <div className="h-full flex flex-col justify-between gap-3 border border-secondary/20 p-4 rounded-lg bg-muted">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg font-bold">Email</h3>
                                <p>Notre adresse e-mail</p>
                            </div>
                            <p><a href="mailto:sas.namasthes@gmail.com" className="text-foreground hover:underline">sas.namasthes@gmail.com</a></p>
                        </div>
                        <div className="h-full flex flex-col justify-between gap-3 border border-secondary/20 p-4 rounded-lg bg-muted">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg font-bold">Téléphone</h3>
                                <p>Notre numéro de téléphone</p>
                            </div>
                            <p>05 55 23 10 16</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-3 border border-secondary/20 p-4 rounded-lg bg-muted">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-bold">Notre adresse</h3>
                            <p>1 Place du Commerce, 19240 Saint-Viance</p>
                        </div>
                        <div className="relative w-full overflow-hidden rounded-lg border border-secondary/20 h-full">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2810.521081807078!2d1.4512155757455674!3d45.21702594989742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f8b9004225b8e5%3A0x1f06cfe0a2da494e!2sNamas'th%C3%A9s!5e0!3m2!1sfr!2sfr!4v1786025487643!5m2!1sfr!2sfr"
                                className="inset-0 h-full w-full border-0"
                                loading="lazy"
                                title="Carte Google Maps de Namas'thés"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-auto w-full max-w-4xl px-6 py-10 sm:py-20 sm:px-10 lg:px-12">
                <h2 className="text-5xl font-title text-secondary">Contact</h2>
                <p className="mt-4 text-base sm:text-lg text-secondary">Entrons en contact — envoyez-nous un message.</p>
                <div className="mt-6">
                    <ContactForm />
                </div>
            </div>
        </main>
    );
}

function InstagramIcon() {
    return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
    );
}

function TikTokIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M14 4V13.4C14 15.4 12.4 17 10.4 17C8.63 17 7.2 15.57 7.2 13.8C7.2 12.03 8.63 10.6 10.4 10.6C10.84 10.6 11.26 10.69 11.64 10.85V7.68C11.24 7.62 10.83 7.59 10.4 7.59C6.97 7.59 4.2 10.36 4.2 13.8C4.2 17.24 6.97 20 10.4 20C13.84 20 16.6 17.24 16.6 13.8V9.66C17.67 10.53 19.02 11 20.4 11V8.02C18.16 8.02 16.32 6.2 16.32 3.95V4H14Z"
                fill="currentColor"
            />
        </svg>
    );
}