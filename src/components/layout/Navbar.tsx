"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
	{ label: "Accueil", href: "/" },
	{ label: "Nos produits", href: "/products" },
	{ label: "Notre histoire", href: "/about" },
	{ label: "Contact", href: "/contact" },
];

export default function Navbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-30 bg-primary shadow-[inset_0_-1px_0_0_var(--border)] backdrop-blur-md">
			<div className="relative">
				<div className="z-50 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-12">
					<nav className="justify-center items-center gap-8 flex" aria-label="Navigation principale">
						<button
							type="button"
							className="cursor-pointer inline-flex items-center justify-center rounded-full border border-border bg-primary p-2 text-background transition-colors hover:opacity-90"
							aria-label="Ouvrir le menu"
							aria-expanded={isMobileMenuOpen}
							onClick={() => setIsMobileMenuOpen((value) => !value)}
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
								<path d="M4 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
								<path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
								<path d="M4 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
							</svg>
						</button>
					</nav>

					<Link href="/" className="relative flex flex-col leading-none text-foreground items-center justify-center h-full">
						<Image
							src="/logo/logo_namasthes_stretch.png"
							alt="Logo de Namas'thé"
							width={80}
							height={80}
							className=""
						/>
					</Link>

					<div className="flex items-center gap-4 text-border">
						<a
							href="https://www.instagram.com/grp.myselfe/"
							aria-label="Instagram"
							target="_blank"
							rel="noreferrer"
							className="transition-transform hover:-translate-y-0.5"
						>
							<InstagramIcon />
						</a>
						<a
							href="https://www.tiktok.com/@grp.myselfe"
							aria-label="TikTok"
							target="_blank"
							rel="noreferrer"
							className="transition-transform hover:-translate-y-0.5"
						>
							<TikTokIcon />
						</a>
					</div>
				</div>

				<div
					className={`fixed left-0 top-23.1 h-[calc(100dvh-5.75rem)] w-72 border-r border-border/60 bg-primary/60 transition-transform duration-300 ease-out sm:w-80 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
				>
					<nav className="flex h-full flex-col gap-1 overflow-y-auto px-6 py-6" aria-label="Navigation mobile">
						<Link href="/" className="relative flex flex-col leading-none text-foreground items-center justify-center">
							<Image
								src="/logo/logo_namasthes.png"
								alt="Logo de Namas'thé"
								width={160}
								height={160}
							/>
						</Link>
						{navLinks.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								onClick={() => setIsMobileMenuOpen(false)}
								className="rounded-xl px-3 py-3 text-sm text-center font-medium text-background transition-colors hover:bg-white/5"
							>
								{link.label}
							</Link>
						))}
					</nav>
				</div>
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
