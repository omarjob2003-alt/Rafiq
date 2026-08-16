import { useLocalized } from '../hooks/useLocalized'
import { collections } from '../data/collections'
import { CollectionOverviewCard } from '../components/products/CollectionOverviewCard'
import { NewsletterSection } from '../components/sections/NewsletterSection'
import { SectionHeading } from '../components/ui/SectionHeading'

export function Collections() {
  const { t } = useLocalized()

  return <div className="pt-[108px]">
    <section className="border-b border-line bg-gradient-to-b from-[#efe8da] to-cream dark:border-line-dark dark:from-[#241e1a] dark:to-cream-dark">
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20">
        <SectionHeading
          eyebrow={t('مجموعاتنا', 'OUR COLLECTIONS')}
          heading={t('مجموعات رفيق', 'Rafiq collections')}
          subtitle={t('اختر مجموعتك المفضلة واكتشف المنتجات المصممة لتكون رفيقك في كل جانب من يومك.', 'Choose your favourite collection and discover products designed to be your companion in every part of your day.')}
        />
      </div>
    </section>

    <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20">
      <div className="grid gap-6 sm:grid-cols-2">
        {collections.map((collection, index) => <CollectionOverviewCard key={collection.id} collection={collection} index={index} />)}
      </div>
    </section>

    <NewsletterSection />
  </div>
}