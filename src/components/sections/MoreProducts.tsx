import Image from "next/image";
import Link from "next/link";

// Structure des sous-catégories de produits
const productCategories = [
    { label: "Boulangerie", href: "/produits/boulangerie", image: "/images/vitrine-contrast.jpeg" },
    { label: "Pâtisserie", href: "/produits/patisserie", image: "/images/patisserie.jpg" },
    { label: "Pizzeria", href: "/produits/pizzeria", image: "/images/pizzeria.jpg" },
    { label: "Snacking", href: "/produits/snacking", image: "/images/snacking.jpg" },
    { label: "Salon de thé", href: "/produits/salon-de-the", image: "/images/salon-de-the.jpg" },
    { label: "Chocolaterie", href: "/produits/chocolaterie", image: "/images/chocolaterie.jpg" },
];

export default function MoreProducts() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 bg-muted w-full px-6 pb-16 sm:px-10 lg:pb-12">
            <h4>Voir plus de produits</h4>
            <div className="grid grid-cols-2 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {productCategories.map((category) => (
                    <Link
                        key={category.href}
                        href={category.href}
                        className="relative bg-primary p-8 sm:p-10 text-xs sm:text-sm font-semibold text-background flex items-center justify-center text-center underline underline-offset-4"
                    >
                        <Image
                            src={category.image}
                            alt={category.label}
                            width={100}
                            height={100}
                            className="absolute h-full w-full object-cover opacity-10"
                        />
                        {category.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}