import { useState } from "react";
import { NewsItem } from "@/lib/data";
import { ArrowUpRight, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface NewsCardProps {
    news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    // Parse description for bullet points
    const formattedDescription = news.description.split('\n').map((line, index) => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('*')) {
            return (
                <li key={index} className="ml-4 list-disc pl-1 mb-2">
                    {trimmedLine.replace(/^\*\s*/, '')}
                </li>
            );
        }
        if (trimmedLine === '') return null;
        return <p key={index} className="mb-2">{trimmedLine}</p>;
    });

    return (
        <div className="flex flex-col w-full max-w-md max-h-[75vh] md:max-h-[600px] overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-100">
            {/* Title Section */}
            <div className="flex-shrink-0 p-6 pb-4">
                <h2 className="text-xl/tight font-bold text-gray-900 line-clamp-3">
                    {news.title}
                </h2>
            </div>

            {/* Image Section */}
            <div className="relative flex-shrink-0 aspect-video w-full overflow-hidden">
                {!imageLoaded && (
                    <div className="absolute inset-0 mx-5 bg-gray-200 animate-pulse flex items-center justify-center">
                        <ImageIcon className="text-gray-400 w-10 h-10" />
                    </div>
                )}
                <img
                    src={news.imageUrl}
                    alt={news.title}
                    className={`h-full w-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1 p-6 pt-4 min-h-0">
                {/* Meta */}
                <div className="flex-shrink-0 mb-4 flex items-center gap-2 text-xs font-medium text-gray-500">
                    <span>{news.date}</span>
                    <span>|</span>
                    <span>{news.source}</span>
                </div>

                {/* Description - Scrollable container */}
                <div
                    className="flex-1 overflow-y-auto mb-4 text-sm leading-relaxed text-gray-600 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                    onTouchStart={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                    onTouchEnd={(e) => e.stopPropagation()}
                >
                    {formattedDescription}
                </div>

                {/* Footer / Hashtags */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {news.hashtags.map((tag) => (
                            <span key={tag} className="text-xs font-medium text-gray-400">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <a
                        href={news.articleUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 hover:text-black"
                    >
                        <ArrowUpRight size={18} />
                    </a>
                </div>
            </div>
        </div>
    );
}
