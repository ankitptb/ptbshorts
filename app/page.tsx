"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar, SidebarContent } from "@/components/Sidebar";
import { NewsFeed } from "@/components/NewsFeed";
import { MobileHeader } from "@/components/MobileHeader";
import { Category, dummyNews, fetchNews, NewsItem } from "@/lib/data";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNews() {
      const fetched = await fetchNews();
      if (fetched.length > 0) {
        setNews(fetched);
      } else {
        setNews(dummyNews); // Fallback to dummy data if fetch fails or empty
      }
      setLoading(false);
    }
    getNews();
  }, []);

  const displayedNews = news.length > 0 ? news : dummyNews;

  const filteredNews =
    selectedCategory === "All"
      ? displayedNews
      : displayedNews.filter((item) => item.category === selectedCategory);

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
          {loading ? (
            <div className="flex h-full w-full items-center justify-center">
              <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-100">
                <div className="p-6 pb-4">
                  <div className="h-7 w-3/4 rounded-md bg-gray-200 animate-pulse" />
                </div>
                <div className="relative aspect-video w-full px-5">
                  <div className="h-full w-full rounded-2xl bg-gray-200 animate-pulse" />
                </div>
                <div className="p-6 pt-4">
                  <div className="mb-4 flex gap-2">
                    <div className="h-4 w-16 rounded bg-gray-200 animate-pulse" />
                    <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
                    <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
                    <div className="h-4 w-2/3 rounded bg-gray-200 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <NewsFeed
              news={filteredNews}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          )}
        </section>
      </div>
    </main>
  );
}
