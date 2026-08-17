import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLocalized } from "../../hooks/useLocalized";
import { articlesEn } from "../../data/content";
import type { Article } from "../../types";

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const { isArabic, t } = useLocalized();
  const copy = articlesEn[article.id];
  const title = isArabic ? article.title : copy.title;

  return (
    <motion.a
      href={`/journal/${article.id}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <img src={article.image} alt={title} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
        <span className="absolute top-4 right-4 rounded-full bg-cream/95 px-3 py-1 text-xs font-medium text-burgundy dark:bg-cream-dark/95">{isArabic ? article.category : copy.category}</span>
      </div>
      <h3 className="font-ar-heading text-lg font-semibold text-ink mt-5 leading-snug group-hover:text-burgundy transition-colors dark:text-ink-dark">{title}</h3>
      <p className="text-[14px] text-muted mt-2 leading-relaxed dark:text-muted-dark">{isArabic ? article.description : copy.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-muted dark:text-muted-dark">{isArabic ? article.readTime : copy.readTime} {t('قراءة', 'read')}</span>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-burgundy transition-colors dark:text-ink-dark">
          {t('اقرأ المزيد', 'Read more')}
          <ArrowLeft size={14} className={isArabic ? 'transition-transform duration-300 group-hover:-translate-x-1' : 'rotate-180 transition-transform duration-300 group-hover:translate-x-1'} />
        </span>
      </div>
    </motion.a>
  );
}