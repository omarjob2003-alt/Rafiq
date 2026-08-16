import type { Article, InspirationImage, NavLink } from "../types";

export const navLinks: NavLink[] = [
  { label: "المنتجات", href: "/products" },
  { label: "المجموعات", href: "/collections" },
  { label: "ابنِ مساحتك", href: "/builder" },
  { label: "الإلهام", href: "/inspiration" },
  { label: "المجلة", href: "/magazine" },
  { label: "عن رفيق", href: "/about" },
];

export const footerLinks: NavLink[] = navLinks;

export const supportLinks: NavLink[] = [
  { label: "الشحن والتوصيل", href: "/shipping" },
  { label: "الاستبدال والاسترجاع", href: "/returns" },
  { label: "الأسئلة الشائعة", href: "/faq" },
  { label: "تواصل معنا", href: "/contact" },
];

export const articles: Article[] = [
  {
    id: "small-space",
    title: "كيف ترتب مكتبك في مساحة صغيرة؟",
    description: "أفكار عملية تستغل كل سنتيمتر في مكتبك من غير ما تحس بالزحمة.",
    category: "تنظيم",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80&auto=format&fit=crop",
    readTime: "٤ دقائق",
  },
  {
    id: "focus",
    title: "لماذا يؤثر تنظيم المكتب على تركيزك؟",
    description: "العلاقة بين المساحة من حولك ووضوح تفكيرك أقوى مما تتخيل.",
    category: "إنتاجية",
    image:
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&q=80&auto=format&fit=crop",
    readTime: "٦ دقائق",
  },
  {
    id: "build-workspace",
    title: "كيف تبني Workspace عملي؟",
    description: "دليل خطوة بخطوة لبناء مساحة عمل تدوم معاك لسنين.",
    category: "دليل",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80&auto=format&fit=crop",
    readTime: "٨ دقائق",
  },
];

export const inspirationImages: InspirationImage[] = [
  {
    id: "1",
    category: "مكتب صغير",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=700&q=80&auto=format&fit=crop",
    size: "tall",
  },
  {
    id: "2",
    category: "مكتب منزلي",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=700&q=80&auto=format&fit=crop",
    size: "wide",
  },
  {
    id: "3",
    category: "للدراسة",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=80&auto=format&fit=crop",
    size: "square",
  },
  {
    id: "4",
    category: "للمبدعين",
    image:
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=700&q=80&auto=format&fit=crop",
    size: "square",
  },
  {
    id: "5",
    category: "Minimal",
    image:
      "https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=700&q=80&auto=format&fit=crop",
    size: "wide",
  },
];

export const articlesEn: Record<string, { title: string; description: string; category: string; readTime: string }> = {
  "small-space": { title: "How to organize a small desk?", description: "Practical ideas that use every centimeter without feeling cluttered.", category: "Organization", readTime: "4 min" },
  focus: { title: "Why does a tidy desk affect your focus?", description: "The link between your surroundings and clarity of mind is stronger than you think.", category: "Productivity", readTime: "6 min" },
  "build-workspace": { title: "How to build a practical workspace?", description: "A step-by-step guide to a workspace that lasts for years.", category: "Guide", readTime: "8 min" },
};
