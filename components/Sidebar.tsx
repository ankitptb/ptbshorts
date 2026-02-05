
"use client";

import { Category, categories, currentUser } from "@/lib/data";
import { cn } from "@/lib/utils";
import { LayoutGrid, ChevronRight, Hash, TrendingUp, DollarSign, Building2, Leaf, Cpu, Hammer, LogOut } from "lucide-react";

interface SidebarProps {
    selectedCategory: Category;
    onSelectCategory: (category: Category) => void;
}

// Helper to map categories to icons
const getCategoryIcon = (category: string) => {
    switch (category) {
        case "Real Estate": return <Building2 size={20} className="text-blue-500" />;
        case "Sustainability": return <Leaf size={20} className="text-green-500" />;
        case "Artificial Intelligence": return <Cpu size={20} className="text-purple-500" />;
        case "Construction": return <Hammer size={20} className="text-orange-500" />;
        case "Market Trends": return <TrendingUp size={20} className="text-red-500" />;
        case "Finance": return <DollarSign size={20} className="text-yellow-600" />;
        default: return <Hash size={20} className="text-gray-500" />;
    }
}


export function Sidebar({ selectedCategory, onSelectCategory }: SidebarProps) {
    return (
        <aside className="hidden h-screen w-[340px] flex-col bg-[#F7F8FA] p-4 md:flex shrink-0 border-r border-gray-200">
            <SidebarContent selectedCategory={selectedCategory} onSelectCategory={onSelectCategory} />
        </aside>
    );
}

export function SidebarContent({ selectedCategory, onSelectCategory }: SidebarProps) {
    return (
        <div className="flex h-full flex-col">
            {/* 1. Header with Logo */}
            <div className="mb-8 flex items-center gap-3 px-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md shadow-blue-600/20">
                    <span className="font-bold text-lg">P</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-gray-900">
                    PTB Shorts
                </h1>
            </div>

            {/* 2. Navigation / Categories */}
            <div className="flex-1 overflow-y-auto scrollbar-none space-y-8 px-1">

                <nav className="space-y-2">
                    <div className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Feeds
                    </div>

                    {/* All News Item */}
                    <button
                        onClick={() => onSelectCategory("All")}
                        className={cn(
                            "flex w-full items-center gap-4 rounded-full px-4 py-3 text-left transition-all cursor-pointer select-none",
                            selectedCategory === "All"
                                ? "bg-white ring-1 ring-gray-200"
                                : "text-gray-100 hover:bg-gray-200/60"
                        )}
                    >
                        <div className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                            selectedCategory === "All" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600"
                        )}>
                            <LayoutGrid size={20} />
                        </div>
                        <span className={cn(
                            "text-[15px] font-medium transition-colors",
                            selectedCategory === "All" ? "text-blue-700" : "text-gray-600 group-hover:text-gray-900"
                        )}>
                            All News
                        </span>
                        {selectedCategory === "All" && (
                            <div className="ml-auto text-blue-600">
                                <ChevronRight size={16} />
                            </div>
                        )}
                    </button>

                    {/* Dynamic Categories */}
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onSelectCategory(category)}
                            className={cn(
                                "flex w-full items-center gap-4 rounded-full px-4 py-3 text-left transition-all cursor-pointer select-none",
                                selectedCategory === category
                                    ? "bg-white ring-1 ring-gray-200"
                                    : "text-gray-100 hover:bg-gray-200/60"
                            )}
                        >
                            <div className={cn(
                                "flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 group-hover:border-blue-100",
                            )}>
                                {getCategoryIcon(category)}
                            </div>
                            <span className={cn(
                                "text-[15px] font-medium transition-colors",
                                selectedCategory === category ? "text-blue-700" : "text-gray-600 group-hover:text-gray-900"
                            )}>
                                {category}
                            </span>
                            {selectedCategory === category && (
                                <div className="ml-auto text-blue-600">
                                    <ChevronRight size={16} />
                                </div>
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            {/* 3. User Profile at Bottom */}
            <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex items-center gap-3 rounded-full p-2 pr-4 cursor-pointer transition-all hover:bg-gray-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white font-bold text-sm">
                        {currentUser.avatar}
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-sm font-bold text-gray-900 truncate">{currentUser.name}</span>
                        <span className="text-xs text-gray-500 truncate">{currentUser.email}</span>
                    </div>
                    <div className="text-gray-400">
                        <LogOut size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
}
