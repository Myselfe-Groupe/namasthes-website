'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Slide {
    id: number;
    title: string;
    description: string;
    link: string;
    image: string;
}

const slides: Slide[] = [
    {
        id: 1,
        title: 'Boulangerie',
        description: 'Des pains dorés et des viennoiseries gourmandes pour bien commencer la journée.',
        link: '/produits/boulangerie',
        image: '/images/vitrine-contrast.jpeg',
    },
    {
        id: 2,
        title: 'Pizzeria',
        description: 'Des pizzas généreuses à partager, sur place ou à emporter.',
        link: '/produits/pizzeria',
        image: '/images/pizzeria.jpg',
    },
    {
        id: 3,
        title: 'Pâtisserie',
        description: 'Des créations gourmandes pour vos petites envies et vos grandes occasions.',
        link: '/produits/patisserie',
        image: '/images/patisserie.jpg',
    },
    {
        id: 4,
        title: 'Snacking',
        description: 'Sandwichs frais et plats maison pour une pause déjeuner pleine de saveurs.',
        link: '/produits/snacking',
        image: '/images/snacking.jpg',
    },
    {
        id: 5,
        title: 'Chocolaterie',
        description: 'Découvrez les chocolats de la Manufacture CLUIZEL, à offrir ou à savourer.',
        link: '/produits/chocolaterie',
        image: '/images/chocolaterie.jpg',
    },
    {
        id: 6,
        title: 'Salon de thé',
        description: 'Un thé, une douceur et un moment de détente dans un cadre chaleureux.',
        link: '/produits/salon-de-the',
        image: '/images/salon-de-the.jpg',
    },
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
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            priority
                            className="object-cover object-center"
                        />
                        {/* Dark Overlay pour assurer la lisibilité du texte */}
                        <div className="absolute inset-0 bg-black/30" />
                    </motion.div>
                </AnimatePresence>

                {/* Lien sur toute la slide, avec les commandes au-dessus */}
                <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-12 flex flex-col justify-end py-16">
                    <Link
                        href={currentSlide.link}
                        aria-label={`Découvrir : ${currentSlide.title}`}
                        className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-border"
                    />
                    <div className="mb-6 flex flex-col items-start justify-between gap-6">
                        {/* Texte à gauche */}
                        <motion.div
                            key={`text-${currentSlide.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="min-w-0 space-y-3 text-white"
                        >
                            <h2 className="text-5xl sm:text-6xl xl:text-7xl font-title underline decoration-2 underline-offset-10">
                                {currentSlide.title}
                            </h2>
                            <p className="max-w-xl text-sm sm:text-base font-text text-background leading-relaxed">
                                {currentSlide.description}
                            </p>
                        </motion.div>

                    </div>

                    {/* Indicators / Dots au centre bas */}
                    <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex items-center gap-2.5">
                        {slides.map((_, index) => (
                            <button
                                type="button"
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                aria-label={`Aller à la slide ${index + 1}`}
                                className={`cursor-pointer h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
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
