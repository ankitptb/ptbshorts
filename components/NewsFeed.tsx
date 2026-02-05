
"use client";

import { useState, useEffect } from "react";
import { NewsItem } from "@/lib/data";
import { NewsCard } from "./NewsCard";
import { ArrowUp, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsFeedProps {
    news: NewsItem[];
}

// ... (imports)

export function NewsFeed({ news }: NewsFeedProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Swipe state
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientY);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientY);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isSwipeUp = distance > minSwipeDistance;
        const isSwipeDown = distance < -minSwipeDistance;

        if (isSwipeUp) {
            handleNext(); // Swipe UP means content moves UP (Next Item)
        }
        if (isSwipeDown) {
            handlePrev(); // Swipe DOWN means content moves DOWN (Prev Item)
        }
    };

    const handleNext = () => {
        if (currentIndex < news.length - 1) {
            setDirection(1);
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const variants = {
        enter: (direction: number) => ({
            y: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
        }),
        center: {
            zIndex: 10, // Ensure main card is above stack
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4 }
        },
        exit: (direction: number) => ({
            zIndex: 10,
            y: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.4 }
        }),
    };

    // Safety check: If no news, show empty state immediately
    if (!news || news.length === 0) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-zinc-50 dark:bg-zinc-50">
                <p className="text-gray-500">No news in this category.</p>
            </div>
        );
    }

    // Safety check: If index is out of bounds
    const currentItem = news[currentIndex];
    if (!currentItem) return null;


    return (
        <div
            className="flex h-full w-full items-start md:items-center justify-center bg-zinc-50 px-4 md:p-6 relative overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Navigation Buttons - Right Side (Desktop Only) */}
            <div className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col gap-4 z-50">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white text-gray-700 shadow-sm border border-gray-200 transition-all hover:border-gray-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowUp size={20} className="transition-transform group-hover:-translate-y-0.5" />
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentIndex === news.length - 1}
                    className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white text-gray-700 shadow-sm border border-gray-200 transition-all hover:border-gray-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowDown size={20} className="transition-transform group-hover:translate-y-0.5" />
                </button>
            </div>

            {/* Card Carousel */}
            <div className="relative h-full max-h-[700px] w-full max-w-md perspective-1000">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={currentItem.id}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0 flex items-start md:items-center justify-center z-10 pt-6 md:pt-0"
                    >
                        <NewsCard news={currentItem} />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
