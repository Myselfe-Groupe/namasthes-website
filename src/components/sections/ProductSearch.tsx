"use client";

import { FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

interface ProductSearchProps {
	category: string;
	initialQuery: string;
}

export default function ProductSearch({ category, initialQuery }: ProductSearchProps) {
	const router = useRouter();
	const pathname = usePathname();
	const [value, setValue] = useState(initialQuery);

	useEffect(() => {
		setValue(initialQuery);
	}, [initialQuery]);

	useEffect(() => {
		const timeout = window.setTimeout(() => {
			const params = new URLSearchParams();
			const trimmedValue = value.trim();

			if (trimmedValue) {
				params.set("q", trimmedValue);
			}

			const queryString = params.toString();
			router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, { scroll: false });
		}, 500);

		return () => window.clearTimeout(timeout);
	}, [pathname, router, value]);

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
	}

	return (
		<form method="get" action={`/produits/${category}`} onSubmit={handleSubmit} className="relative flex w-full self-center md:max-w-md">
			<label htmlFor="product-search" className="sr-only">
				Rechercher un produit
			</label>
			<input
				id="product-search"
				name="q"
				type="search"
				value={value}
				onChange={(event) => setValue(event.target.value)}
				placeholder="Rechercher un produit"
				className="min-w-0 flex-1 rounded-sm border border-border bg-background px-4 py-3 pr-10 text-sm outline-none focus:border-primary"
			/>
			<FaSearch
				aria-hidden="true"
				className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary"
			/>
		</form>
	);
}