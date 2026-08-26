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
        description: 'lundi - jeudi : 06:00 - 21:00\nvendredi - samedi : 06:00 - 21:30\ndimanche : 07:00 - 13:00 / 19:00 - 21:00',
        link: '/produits/boulangerie',
        buttonText: 'Voir les produits',
        image: '/images/vitrine-contrast.jpeg',
    },
    {
        id: 2,
        title: 'Pizzeria',
        description: 'Lundi - Jeudi : 11:30 - 14:00 / 19:00 - 21:00\nVendredi - Samedi : 11:30 - 14:00 / 19:00 - 21:30\nDimanche : 11:30 - 13:00 / 19:00 - 21:00',
        link: '/produits/pizzeria',
        buttonText: 'Découvrir',
        image: '/images/vitrine-contrast.jpeg',
    },
    {
        id: 3,
        title: 'Pâtisserie',
        description: 'lundi - jeudi : 06:00 - 21:00\nvendredi - samedi : 06:00 - 21:30\ndimanche : 07:00 - 13:00 / 19:00 - 21:00',
        link: '/produits/patisserie',
        buttonText: 'Découvrir',
        image: '/images/patisserie.jpg',
    },
    {
        id: 4,
        title: 'Snacking',
        description: 'lundi - jeudi : 06:00 - 21:00\nvendredi - samedi : 06:00 - 21:30\ndimanche : 07:00 - 13:00 / 19:00 - 21:00',
        link: '/produits/snacking',
        buttonText: 'Découvrir',
        image: '/images/snacking.jpg',
    },
    {
        id: 5,
        title: 'Chocolaterie',
        description: 'lundi - jeudi : 06:00 - 21:00\nvendredi - samedi : 06:00 - 21:30\ndimanche : 07:00 - 13:00 / 19:00 - 21:00',
        link: '/produits/chocolaterie',
        buttonText: 'Découvrir',
        image: '/images/chocolaterie.jpg',
    },
    {
        id: 6,
        title: 'Salon de thé',
        description: 'lundi - jeudi : 06:00 - 21:00\nvendredi - samedi : 06:00 - 21:30\ndimanche : 07:00 - 13:00 / 19:00 - 21:00',
        link: '/produits/salon-de-the',
        buttonText: 'Découvrir',
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
                        <div className="absolute inset-0 bg-black/30" />
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
                            className="text-white space-y-3 mb-6 md:mb-0"
                        >
                            <h1 className="text-5xl md:text-9xl font-title underline decoration-2 underline-offset-10">
                                {currentSlide.title}
                            </h1>
                            <p className="text-sm sm:text-base font-text whitespace-pre-line text-background leading-relaxed">
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
                    <div className="absolute sm:bottom-28 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
                        {slides.map((_, index) => (
                            <button
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