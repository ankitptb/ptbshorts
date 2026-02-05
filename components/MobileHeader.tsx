"use client";

import { Menu } from "lucide-react";

interface MobileHeaderProps {
    onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
    return (
        <div className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-[#F7F8FA] px-4 md:hidden z-50 relative">
            <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-md shadow-blue-600/20">
                    <span className="font-bold text-sm">P</span>
                </div>
                <h1 className="text-lg font-bold tracking-tight text-gray-900">
                    PTB Shorts
                </h1>
            </div>
            <button
                onClick={onMenuClick}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm ring-1 ring-gray-200 active:scale-95"
            >
                <Menu size={24} />
            </button>
        </div>
    );
}
