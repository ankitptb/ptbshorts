
"use client";

import { NewsItem } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface NewsCardProps {
    news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
    return (
        <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-100">
            {/* Title Section */}
            <div className="p-6 pb-4">
                <h2 className="text-xl/tight font-bold text-gray-900">
                    {news.title}
                </h2>
            </div>

            {/* Image Section */}
            <div className="relative aspect-video w-full overflow-hidden px-5">
                <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="h-full w-full rounded-2xl object-cover"
                />
            </div>

            {/* Content Section */}
            <div className="p-6 pt-4">
                {/* Meta */}
                <div className="mb-4 flex items-center gap-2 text-xs font-medium text-gray-500">
                    <span>{news.date}</span>
                    <span>|</span>
                    <span>{news.source}</span>
                </div>

                {/* Description */}
                <p className="mb-6 text-sm leading-relaxed text-gray-600">
                    {news.description}
                </p>

                {/* Footer / Hashtags */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {news.hashtags.map((tag) => (
                            <span key={tag} className="text-xs font-medium text-gray-400">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 hover:text-black">
                        <ArrowUpRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
