import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search as SearchIcon } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { searchAll } from '../lib/search'
import { ProductCard } from '../components/products/ProductCard'
import { CollectionOverviewCard } from '../components/products/CollectionOverviewCard'
import { ArticleCard } from '../components/products/ArticleCard'
import { usePageTitle } from '../hooks/usePageTitle'

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useLocalized()
  usePageTitle(t('ابحث في رفيق', 'Search Rafiq'))
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const results = searchAll(searchParams.get('q') ?? '')
  const hasQuery = (searchParams.get('q') ?? '').trim().length > 0
  const hasResults = results.products.length || results.collections.length || results.articles.length

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setSearchParams(query.trim() ? { q: query.trim() } : {})
  }

  return <div className="pt-[108px]">
    <section className="border-b border-line dark:border-line-dark">
      <div className="mx-auto max-w-[900px] px-5 py-12 md:px-10 md:py-16">
        <h1 className="font-ar-heading text-3xl font-semibold text-ink dark:text-ink-dark md:text-4xl">{t('البحث', 'Search')}</h1>
        <form onSubmit={handleSubmit} className="mt-6 flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 dark:border-line-dark dark:bg-paper-dark">
          <SearchIcon size={18} className="text-muted dark:text-muted-dark" />
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder={t('دور على منتج، مجموعة، أو مقال...', 'Search for a product, collection, or article...')}
            className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted dark:text-ink-dark dark:placeholder:text-muted-dark"
          />
          <button type="submit" className="rounded-lg bg-burgundy px-4 py-2 text-sm font-medium text-cream">{t('بحث', 'Search')}</button>
        </form>
      </div>
    </section>

    <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20">
      {!hasQuery && <p className="text-center text-sm text-muted dark:text-muted-dark">{t('اكتب كلمة عشان تبدأ البحث', 'Type a word to start searching')}</p>}

      {hasQuery && !hasResults && <p className="text-center text-sm text-muted dark:text-muted-dark">{t(`مفيش نتائج لـ "${searchParams.get('q')}"`, `No results for "${searchParams.get('q')}"`)}</p>}

      {results.products.length > 0 && <section className="mb-16">
        <h2 className="mb-6 font-ar-heading text-xl font-semibold text-ink dark:text-ink-dark">{t('المنتجات', 'Products')} ({results.products.length})</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {results.products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>
      </section>}

      {results.collections.length > 0 && <section className="mb-16">
        <h2 className="mb-6 font-ar-heading text-xl font-semibold text-ink dark:text-ink-dark">{t('المجموعات', 'Collections')} ({results.collections.length})</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {results.collections.map((collection, index) => <CollectionOverviewCard key={collection.id} collection={collection} index={index} />)}
        </div>
      </section>}

      {results.articles.length > 0 && <section>
        <h2 className="mb-6 font-ar-heading text-xl font-semibold text-ink dark:text-ink-dark">{t('المجلة', 'Journal')} ({results.articles.length})</h2>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {results.articles.map((article, index) => <ArticleCard key={article.id} article={article} index={index} />)}
        </div>
      </section>}
    </div>
  </div>
}