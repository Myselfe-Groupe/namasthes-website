'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

interface Slide {
    id: number;
    title: string;
    description: string;
    link: string;
    buttonText: string;
    image: string;
}

const slides: Slide[] = [
    {
        id: 1,
        title: 'Boulangerie',
        description: 'Lundi - samedi : 6h30 - 19h\nDimanche : 7h - 13h',
        link: '/boulangerie',
        buttonText: 'Voir les produits',
        image: '/images/vitrine-contrast.jpeg',
    },
    {
        id: 2,
        title: 'Pizzeria',
        description: 'Lundi - Jeudi : 11h30 - 14h / 19h - 21h\nVendredi - Samedi : 11h30 - 14h / 19h - 21h30\nDimanche : 11h30 - 14h / 19h - 21h',
        link: '/pizzeria',
        buttonText: 'Découvrir',
        image: '/images/vitrine-contrast.jpeg',
    },
    {
        id: 3,
        title: 'Pâtisserie',
        description: 'Lundi - samedi : 6h30 - 19h\nDimanche : 7h - 13h',
        link: '/patisserie',
        buttonText: 'Découvrir',
        image: '/images/vitrine-contrast.jpeg',
    },
    {
        id: 4,
        title: 'Snacking',
        description: 'Nos créations artisanales du jour',
        link: '/snacking',
        buttonText: 'Découvrir',
        image: '/images/vitrine-contrast.jpeg',
    },
    {
        id: 5,
        title: 'Chocolaterie',
        description: 'Nos créations artisanales du jour',
        link: '/chocolaterie',
        buttonText: 'Découvrir',
        image: '/images/vitrine-contrast.jpeg',
    },
    {
        id: 6,
        title: 'Salon de thé',
        description: 'Nos créations artisanales du jour',
        link: '/salon-de-the',
        buttonText: 'Découvrir',
        image: '/images/vitrine-contrast.jpeg',
    },
    // Ajoute tes autres slides ici...
];

export default function HeroSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Défilement automatique toutes les 6 secondes
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const currentSlide = slides[currentIndex];

    return (
        <section className="relative w-full overflow-hidden select-none">
            {/* Bandeau d'annonce supérieur */}
            <div className="bg-border text-[#1E2538] text-center py-2 text-sm md:text-base font-semibold tracking-wider uppercase">
                Restauration sur place / À emporter
            </div>

            {/* Conteneur principal du Slider */}
            <div className="relative h-137.5 md:h-162.5 w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* Image de fond */}
                        <Image
                            src={currentSlide.image}
                            alt={currentSlide.title}
                            fill
                            priority
                            className="object-cover object-center"
                        />
                        {/* Dark Overlay pour assurer la lisibilité du texte */}
                        <div className="absolute inset-0 bg-black/40" />
                    </motion.div>
                </AnimatePresence>

                {/* Contenu superposé (Titre, Description, Bouton) */}
                <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-12 flex flex-col justify-end pb-16 md:pb-40">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        {/* Texte à gauche */}
                        <motion.div
                            key={`text-${currentSlide.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-white space-y-3"
                        >
                            <h1 className="text-5xl md:text-9xl font-title tracking-wide underline decoration-2 underline-offset-10">
                                {currentSlide.title}
                            </h1>
                            <p className="text-base md:text-xl font-text whitespace-pre-line text-background leading-relaxed">
                                {currentSlide.description}
                            </p>
                        </motion.div>

                        {/* Bouton d'action à droite */}
                        <motion.div
                            key={`btn-${currentSlide.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Link
                                href={currentSlide.link}
                                className="inline-flex items-center"
                            >
                                <Button variant="primary" size="lg">   
                                    <span>{currentSlide.buttonText}</span>
                                    <span className="text-lg ml-2">→</span>
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Indicators / Dots au centre bas */}
                    <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                aria-label={`Aller à la slide ${index + 1}`}
                                className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'w-7 bg-[#D8B76E]'
                                    : 'w-2.5 bg-white/50 hover:bg-white/80'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}