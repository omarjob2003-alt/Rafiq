import type { Product } from "../types";

export const products: Product[] = [
  {
    id: "desk-mat",
    name: "مفرش المكتب",
    description: "جلد صناعي فاخر يحمي مكتبك ويمنح مساحتك هدوءًا بصريًا.",
    price: 320,
    currency: "جنيه",
    image:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=900&q=80&auto=format&fit=crop",
    category: "مساحة العمل",
    categoryId: "workspace",
    colors: ["#700D32", "#1F1B19"],
    usage: ["office", "daily"],
  },
  {
    id: "pegboard",
    name: "لوحة رفيق",
    description: "لوحة تنظيم خشبية لتعليق أدواتك وسماعاتك وكابلاتك بأناقة.",
    price: 590,
    currency: "جنيه",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&q=80&auto=format&fit=crop",
    category: "التنظيم",
    categoryId: "organization",
    colors: ["#700D32", "#433E25", "#B9A895"],
    usage: ["office"],
  },
  {
    id: "weekly-calendar",
    name: "التقويم الأسبوعي",
    description: "قوّي تركيزك بتخطيط أسبوعي بسيط بتصميم عربي أنيق.",
    price: 180,
    currency: "جنيه",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80&auto=format&fit=crop",
    category: "الأساسيات",
    categoryId: "essentials",
    colors: ["#700D32", "#B9A895"],
    usage: ["office", "students"],
  },
  {
    id: "coaster",
    name: "طبق الكوب",
    description: "قطعة رخام صناعي صغيرة تكمل تفاصيل مكتبك اليومية.",
    price: 90,
    currency: "جنيه",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80&auto=format&fit=crop",
    category: "اليومي",
    categoryId: "everyday",
    colors: ["#D6A23C", "#1F1B19"],
    usage: ["daily"],
  },
  {
    id: "key-holder",
    name: "معلّق المفاتيح",
    description: "قطعة خشبية دافئة تنظم مفاتيحك عند مدخل مساحتك.",
    price: 140,
    currency: "جنيه",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=80&auto=format&fit=crop",
    category: "التنظيم",
    categoryId: "organization",
    colors: ["#700D32", "#B9A895"],
    usage: ["daily", "travel"],
  },
  {
    id: "notebook",
    name: "دفتر رفيق",
    description: "دفتر جلدي فاخر يحافظ على أفكارك مرتبة وقريبة منك.",
    price: 490,
    currency: "جنيه",
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=900&q=80&auto=format&fit=crop",
    category: "اليومي",
    categoryId: "everyday",
    colors: ["#700D32", "#D6A23C"],
    usage: ["students", "daily"],
  },
  {
    id: "pencil-case",
    name: "مقلمة رفيق",
    description: "مقلمة جلد طبيعي لأدوات الكتابة اليومية بتصميم أنيق.",
    price: 490,
    currency: "جنيه",
    image:
      "https://images.unsplash.com/photo-1568205612837-017257d2310a?w=900&q=80&auto=format&fit=crop",
    category: "اليومي",
    categoryId: "everyday",
    colors: ["#700D32", "#433E25"],
    usage: ["students", "daily"],
  },
  {
    id: "phone-stand",
    name: "ستاند الموبايل",
    description: "حامل خشبي ثابت يخلي موبايلك في مرمى نظرك بسهولة.",
    price: 390,
    currency: "جنيه",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=900&q=80&auto=format&fit=crop",
    category: "الأساسيات",
    categoryId: "essentials",
    colors: ["#1F1B19"],
    usage: ["office", "daily"],
  },
  {
    id: "tote-bag",
    name: "شنطة رفيق",
    description: "شنطة قماش وجلد واسعة تناسب يومك من المكتب للطريق.",
    price: 790,
    currency: "جنيه",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=80&auto=format&fit=crop",
    category: "اليومي",
    categoryId: "everyday",
    colors: ["#B9A895", "#700D32"],
    usage: ["travel", "students"],
  },
  {
    id: "cable-organizer",
    name: "منظم الكابلات",
    description: "يلف كابلاتك بترتيب ويخليها بعيدة عن الفوضى.",
    price: 290,
    currency: "جنيه",
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=900&q=80&auto=format&fit=crop",
    category: "التنظيم",
    categoryId: "organization",
    colors: ["#700D32", "#433E25"],
    usage: ["office", "travel"],
  },
  {
    id: "storage-box",
    name: "صندوق تنظيم",
    description: "صندوق مدمج يحافظ على أدواتك الصغيرة في مكان واحد.",
    price: 890,
    currency: "جنيه",
    image:
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=900&q=80&auto=format&fit=crop",
    category: "التنظيم",
    categoryId: "organization",
    colors: ["#D6A23C", "#B9A895", "#433E25"],
    usage: ["office"],
  },
  {
    id: "desk-organizer",
    name: "منظم المكتب",
    description: "حامل جلدي يخلي أقلامك ودفاترك واقفة وفي متناول يدك.",
    price: 890,
    currency: "جنيه",
    image:
      "https://images.unsplash.com/photo-1519219788971-8d9797e0dc4d?w=900&q=80&auto=format&fit=crop",
    category: "مساحة العمل",
    categoryId: "workspace",
    colors: ["#700D32", "#433E25", "#B9A895"],
    usage: ["office"],
  },
];

export const bestSellers: Product[] = products.filter((product) =>
  ["desk-mat", "pegboard", "weekly-calendar", "coaster", "key-holder"].includes(product.id)
);

export const productsEn: Record<string, { name: string; description: string }> = {
  "desk-mat": { name: "Desk mat", description: "Premium vegan leather for a calmer desk." },
  pegboard: { name: "Rafiq pegboard", description: "A refined place for tools, cables and ideas." },
  "weekly-calendar": { name: "Weekly calendar", description: "A simple weekly plan for clearer focus." },
  coaster: { name: "Cup coaster", description: "A small detail for your daily desk ritual." },
  "key-holder": { name: "Key holder", description: "A warm, simple home for your everyday keys." },
  notebook: { name: "Rafiq notebook", description: "A premium notebook that keeps your ideas close." },
  "pencil-case": { name: "Rafiq pencil case", description: "A leather pouch for your everyday writing tools." },
  "phone-stand": { name: "Phone stand", description: "A steady wooden stand that keeps your phone in view." },
  "tote-bag": { name: "Rafiq tote bag", description: "A spacious canvas and leather tote for everyday carry." },
  "cable-organizer": { name: "Cable organizer", description: "Keeps your cables coiled and out of sight." },
  "storage-box": { name: "Storage box", description: "A compact box that keeps small essentials in place." },
  "desk-organizer": { name: "Desk organizer", description: "A leather caddy that keeps pens and notebooks upright." },
};