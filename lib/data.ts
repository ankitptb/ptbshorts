
export interface User {
  name: string;
  email: string;
  avatar: string; // Initials or image URL
}

export type Category =
  | "All"
  | "Real Estate Tech"
  | "PropTech"
  | "Finance";

export interface NewsItem {
  id: string;
  title: string;
  description: string; // Short bullets or text
  imageUrl: string;
  date: string;
  source: string;
  category: Category;
  hashtags: string[];
  articleUrl?: string;
}

export const currentUser: User = {
  name: "Ankit Yadav",
  email: "ankit@proptechbuzz.com",
  avatar: "A",
};

export const categories: Category[] = [
  "Real Estate Tech",
  "PropTech",
  "Finance",
];

export async function fetchNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch("/api/news");
    if (!res.ok) throw new Error("Failed to fetch news");
    const data = await res.json();
    return data.news || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

const generateNews = (id: string, category: Category, title: string, desc: string, img: string, date: string, url?: string): NewsItem => ({
  id,
  title,
  description: desc,
  imageUrl: img,
  date,
  source: "PropTechBuzz",
  category,
  hashtags: ["#" + category.replace(/\s+/g, "").toLowerCase(), "#news"],
  articleUrl: url,
});

export const dummyNews: NewsItem[] = [
  // Keeping a few dummy items for fallback if needed, but updating categories to match
  generateNews("1", "PropTech", "The Future of Real Estate: How Proptech and Broker Networks Are Changing the Market?", "The global PropTech market is projected to grow from $27.3 billion (2023) to $119.9 billion by 2032.", "https://cms.proptechbuzz.com/assets/8066545c-7018-4f88-afd1-8e1072db9e40", "2025-05-14", "https://proptechbuzz.com/article/future-of-real-estate"),
  generateNews("2", "PropTech", "5 Ways 3D Virtual Tours Are Reshaping the Future of Real Estate", "3D virtual tours enable immersive online exploration of properties. They save time and travel costs for both buyers and sellers.", "https://cms.proptechbuzz.com/assets/ae14d4f7-9363-4980-b854-7c4267270d44", "2025-03-21", "https://proptechbuzz.com/article/3d-virtual-tours"),
];
