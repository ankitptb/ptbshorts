"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar, SidebarContent } from "@/components/Sidebar";
import { NewsFeed } from "@/components/NewsFeed";
import { MobileHeader } from "@/components/MobileHeader";
import { Category, dummyNews } from "@/lib/data";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredNews =
    selectedCategory === "All"
      ? dummyNews
      : dummyNews.filter((item) => item.category === selectedCategory);

  return (
    <main className="flex h-screen overflow-hidden bg-[#F8F9FA]">
      <Sidebar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Mobile Sidebar Sheet */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 md:hidden"
            />
            {/* Sheet */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-[300px] bg-[#F7F8FA] p-4 shadow-2xl md:hidden"
            >
              <SidebarContent selectedCategory={selectedCategory} onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setIsMobileMenuOpen(false);
              }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <MobileHeader onMenuClick={() => setIsMobileMenuOpen(true)} />

        <section className="flex-1">
          <NewsFeed news={filteredNews} />
        </section>
      </div>
    </main>
  );
}
