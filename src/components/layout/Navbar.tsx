"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuPhone } from "react-icons/lu";
import styles from "./Navbar.module.css";

// Structure des sous-catégories de produits
const productCategories = [
    { label: "Boulangerie", href: "/produits/boulangerie" },
    { label: "Pâtisserie", href: "/produits/patisserie" },
    { label: "Pizzeria", href: "/produits/pizzeria" },
    { label: "Snacking", href: "/produits/snacking" },
    { label: "Salon de thé", href: "/produits/salon-de-the" },
    { label: "Chocolaterie", href: "/produits/chocolaterie" },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const mobileDialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!isMobileMenuOpen) return;
        const dialog = mobileDialogRef.current;
        if (!dialog) return;

        dialog.showModal();
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const desktop = window.matchMedia("(min-width: 1024px)");
        const closeOnDesktop = () => {
            if (desktop.matches) dialog.close();
        };
        desktop.addEventListener("change", closeOnDesktop);

        return () => {
            desktop.removeEventListener("change", closeOnDesktop);
            if (dialog.open) dialog.close();
            document.body.style.overflow = previousOverflow;
        };
    }, [isMobileMenuOpen]);

    const handleCloseMenu = () => {
        setIsMobileMenuOpen(false);
        setIsProductsOpen(false);
    };

    return (
        <header className="sticky top-0 z-30 bg-primary shadow-[inset_0_-1px_0_0_var(--border)] backdrop-blur-md">
            <div className="relative">
                <nav aria-label="Présentation et réseaux sociaux" className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-10 lg:px-12">
                    <p className={`${styles.announcement} min-w-0 text-xs leading-6 text-background`} tabIndex={0}>
                        <span className={styles.announcementTrack}>
                            {[0, 1].map((copy) => (
                                <span key={copy} className={styles.announcementCopy} aria-hidden={copy === 1 ? true : undefined}>
                                    À Saint-Viance, vos envies gourmandes ont une adresse
                                    <span aria-hidden="true" className="mx-2 inline-block h-1 w-1 rounded-full bg-border align-middle" />
                                    Boulangerie, salon de thé &amp; pizzeria
                                </span>
                            ))}
                        </span>
                    </p>

                    <div className="flex shrink-0 items-center justify-end gap-4 text-border">
                        <a
                            href="https://www.instagram.com/namas.thes/"
                            aria-label="Instagram"
                            target="_blank"
                            rel="noreferrer"
                            className="transition-transform hover:-translate-y-0.5"
                        >
                            <InstagramIcon />
                        </a>
                        <a
                            href="https://www.tiktok.com/@namas.thes"
                            aria-label="TikTok"
                            target="_blank"
                            rel="noreferrer"
                            className="transition-transform hover:-translate-y-0.5"
                        >
                            <TikTokIcon />
                        </a>
                    </div>
                </nav>

                {/* Bandeau solidaire de la navigation lors du défilement */}
                <div className="bg-background border-b border-accent text-[#1E2538] py-2 text-sm">
                    <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:gap-x-6 sm:px-10 lg:grid-cols-[auto_1fr_auto] lg:px-12">
                        <button
                            type="button"
                            className="col-start-1 row-start-1 inline-flex min-h-12 min-w-12 justify-self-start cursor-pointer items-center justify-center rounded-full border border-border bg-transparent p-3 text-primary transition-colors hover:bg-primary hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:hidden"
                            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                            aria-controls="mobile-navigation"
                            aria-expanded={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((value) => !value)}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M4 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                <path d="M4 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                        </button>
                        <Link href="/" onClick={handleCloseMenu} aria-label="Namas’Thés, accueil" className="col-start-2 row-start-1 justify-self-center p-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:col-start-1">
                            <Image
                                src="/logo/logo_namasthes_stretch.png"
                                alt="Logo de Namas'thé"
                                width={80}
                                height={64}
                                className="h-auto w-14 object-contain sm:w-20"
                            />
                        </Link>
                        <nav aria-label="Navigation principale" className="hidden items-center justify-end gap-10 text-sm text-primary lg:col-start-2 lg:row-start-1 lg:flex">
                            <Link href="/" className="py-3 hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-primary">Accueil</Link>
                            <details
                                className="relative"
                                onPointerEnter={(event) => {
                                    if (event.pointerType === "mouse") event.currentTarget.open = true;
                                }}
                                onPointerLeave={(event) => {
                                    if (event.pointerType === "mouse" && !event.currentTarget.contains(document.activeElement)) {
                                        event.currentTarget.open = false;
                                    }
                                }}
                                onBlur={(event) => {
                                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                                        event.currentTarget.open = false;
                                    }
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === "Escape") {
                                        event.preventDefault();
                                        event.currentTarget.open = false;
                                        event.currentTarget.querySelector("summary")?.focus();
                                    }
                                }}
                            >
                                <summary className="cursor-pointer py-3 hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-primary">Nos produits</summary>
                                <div className="absolute left-0 top-full z-50 flex w-56 flex-col rounded-lg border border-border/60 bg-primary p-2 text-background shadow-xl">
                                    {productCategories.map((category) => (
                                        <Link
                                            key={category.href}
                                            href={category.href}
                                            onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}
                                            className="rounded-md px-3 py-3 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-border"
                                        >
                                            {category.label}
                                        </Link>
                                    ))}
                                </div>
                            </details>
                            <Link href="/carte-des-pizzas" className="py-3 hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-primary">Carte des pizzas</Link>
                            <Link href="/contact" className="py-3 hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-primary">Horaires et accès</Link>
                        </nav>
                        <a
                            href="tel:+33555231016"
                            aria-label="Appeler le 05 55 23 10 16"
                            className="col-start-3 row-start-1 inline-flex min-h-12 min-w-12 items-center justify-center justify-self-end gap-2 whitespace-nowrap rounded-full border border-border bg-transparent px-3 py-3 text-primary transition-colors hover:bg-primary hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:px-5"
                        >
                            <LuPhone className="h-5 w-5" aria-hidden="true" />
                            <span className="hidden sm:inline">05 55 23 10 16</span>
                        </a>
                    </div>
                </div>

                {/* Panneau mobile superposé à la page et au bouton du menu */}
                <dialog
                    ref={mobileDialogRef}
                    id="mobile-navigation"
                    aria-labelledby="mobile-menu-title"
                    onClose={handleCloseMenu}
                    onCancel={handleCloseMenu}
                    onClick={(event) => {
                        if (event.target !== event.currentTarget) return;
                        const bounds = event.currentTarget.getBoundingClientRect();
                        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
                            handleCloseMenu();
                        }
                    }}
                    className={`${styles.mobileMenu} fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-[min(90vw,24rem)] max-w-none overflow-y-auto border-0 bg-background p-0 text-primary shadow-2xl backdrop:bg-black/45 backdrop:backdrop-blur-sm`}
                >
                    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-accent bg-background px-6 py-4">
                        <Link href="/" onClick={handleCloseMenu} aria-label="Namas’Thés, accueil" className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                            <Image
                                src="/logo/logo_namasthes_stretch.png"
                                alt="Logo de Namas'thé"
                                width={80}
                                height={64}
                                className="h-auto w-20 object-contain"
                            />
                        </Link>
                        <h2 id="mobile-menu-title" className="sr-only">Menu de navigation</h2>
                        <button type="button" onClick={handleCloseMenu} aria-label="Fermer le menu" className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-primary/25 text-primary transition-colors hover:bg-primary hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                    <nav className="flex flex-col gap-2 px-6 py-6 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-primary [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-2 [&_button:focus-visible]:outline-primary" aria-label="Navigation mobile">

                        {/* Lien Accueil */}
                        <Link
                            href="/"
                            onClick={handleCloseMenu}
                            className="rounded-xl px-4 py-4 text-base font-medium text-primary transition-colors hover:bg-muted"
                        >
                            Accueil
                        </Link>

                        <Link
                            href="/carte-des-pizzas"
                            onClick={handleCloseMenu}
                            className="rounded-xl px-4 py-4 text-base font-medium text-primary transition-colors hover:bg-muted"
                        >
                            Carte des pizzas
                        </Link>

                        {/* Accordéon "Nos produits" */}
                        <div className="flex flex-col">
                            <button
                                type="button"
                                aria-expanded={isProductsOpen}
                                aria-controls="mobile-product-categories"
                                onClick={() => setIsProductsOpen((prev) => !prev)}
                                className="cursor-pointer flex items-center justify-between rounded-xl px-4 py-4 text-base font-medium text-primary transition-colors hover:bg-muted"
                            >
                                <span>Nos produits</span>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className={`transition-transform duration-200 ${isProductsOpen ? "rotate-180" : ""}`}
                                >
                                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            {/* Sous-menu des catégories */}
                            {isProductsOpen && (
                                <div id="mobile-product-categories" className="ml-4 my-2 flex flex-col gap-1 border-l border-border pl-3">
                                    {productCategories.map((cat) => (
                                        <Link
                                            key={cat.label}
                                            href={cat.href}
                                            onClick={handleCloseMenu}
                                            className="flex min-h-12 items-center rounded-lg px-3 py-3 text-base text-secondary transition-colors hover:bg-muted hover:text-primary"
                                        >
                                            {cat.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Lien Contact */}
                        <Link
                            href="/contact"
                            onClick={handleCloseMenu}
                            className="rounded-xl px-4 py-4 text-base font-medium text-primary transition-colors hover:bg-muted"
                        >
                            Horaires et accès
                        </Link>
                    </nav>
                </dialog>
            </div>
        </header>
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
