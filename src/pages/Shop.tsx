import { useMemo, useState } from 'react'
import { Grid2x2, List } from 'lucide-react'
import { useLocalized } from '../hooks/useLocalized'
import { products } from '../data/products'
import { ProductCard } from '../components/products/ProductCard'
import { FilterSidebar, createDefaultFilters, type FiltersState } from '../components/products/FilterSidebar'
import { SortDropdown, type SortValue } from '../components/products/SortDropdown'
import { Pagination } from '../components/products/Pagination'
import { cn } from '../lib/cn'
import { useSearchParams } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'


const PAGE_SIZE = 8

export function Shop() {
    const { t } = useLocalized()
    usePageTitle(t('المتجر', 'Shop'))

    const [searchParams] = useSearchParams()
    const [filters, setFilters] = useState<FiltersState>(() => {
        const category = searchParams.get('category')
        return { ...createDefaultFilters(), categoryId: category }
    })
    const [sort, setSort] = useState<SortValue>('newest')
    const [view, setView] = useState<'grid' | 'list'>('grid')
    const [page, setPage] = useState(1)

    const filtered = useMemo(() => {
        let result = products.filter(product => {
            if (filters.categoryId && product.categoryId !== filters.categoryId) return false
            if (filters.usage.length && !filters.usage.some(tag => product.usage.includes(tag))) return false
            if (filters.colors.length && !filters.colors.some(color => product.colors.includes(color))) return false
            if (product.price > filters.maxPrice) return false
            return true
        })
        if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
        if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)
        return result
    }, [filters, sort])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const currentPage = Math.min(page, totalPages)
    const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

    const updateFilters = (next: FiltersState) => { setFilters(next); setPage(1) }
    const updateSort = (next: SortValue) => { setSort(next); setPage(1) }

    return <div className="pt-[108px]">
        <section className="border-b border-line bg-gradient-to-b from-[#efe8da] to-cream dark:border-line-dark dark:from-[#241e1a] dark:to-cream-dark">
            <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-14 md:grid-cols-[1fr_1fr] md:px-10 md:py-20">
                <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1100&q=80&auto=format&fit=crop" alt="" className="aspect-[4/3] w-full rounded-2xl object-cover md:rounded-[26px]" />
                <div>
                    <h1 className="font-ar-heading text-4xl font-semibold leading-tight text-ink dark:text-ink-dark md:text-5xl">{t('المتجر', 'Shop')}</h1>
                    <p className="mt-4 max-w-md text-sm leading-8 text-muted dark:text-muted-dark">{t('منتجات عملية وبسيطة تساعدك تنظم يومك، وتُركز على اللي يهمك.', 'Simple, practical products that help you organize your day and focus on what matters.')}</p>
                </div>
            </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 md:py-14">
            <div className="flex flex-col gap-9 lg:flex-row lg:gap-12">
                <FilterSidebar filters={filters} onChange={updateFilters} />

                <div className="min-w-0 flex-1">
                    <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                        <div className="lg:hidden"><FilterSidebar filters={filters} onChange={updateFilters} /></div>
                        <p className="text-sm text-muted dark:text-muted-dark">
                            {t(`عرض ${pageItems.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0}–${(currentPage - 1) * PAGE_SIZE + pageItems.length} من ${filtered.length} منتج`, `Showing ${pageItems.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0}–${(currentPage - 1) * PAGE_SIZE + pageItems.length} of ${filtered.length} products`)}
                        </p>
                        <div className="flex items-center gap-3">
                            <SortDropdown value={sort} onChange={updateSort} />
                            <div className="hidden items-center gap-1 rounded-lg border border-line p-1 dark:border-line-dark sm:flex">
                                <button onClick={() => setView('grid')} aria-label={t('عرض شبكي', 'Grid view')} className={cn('grid size-8 place-items-center rounded-md', view === 'grid' ? 'bg-burgundy text-cream' : 'text-ink dark:text-ink-dark')}><Grid2x2 size={15} /></button>
                                <button onClick={() => setView('list')} aria-label={t('عرض قائمة', 'List view')} className={cn('grid size-8 place-items-center rounded-md', view === 'list' ? 'bg-burgundy text-cream' : 'text-ink dark:text-ink-dark')}><List size={15} /></button>
                            </div>
                        </div>
                    </div>

                    {pageItems.length === 0
                        ? <div className="rounded-2xl border border-dashed border-line py-24 text-center text-sm text-muted dark:border-line-dark dark:text-muted-dark">{t('مفيش منتجات مطابقة للفلاتر دي.', 'No products match these filters.')}</div>
                        : <div className={cn('grid gap-x-4 gap-y-9 md:gap-x-6', view === 'grid' ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2')}>
                            {pageItems.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
                        </div>}

                    <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
                </div>
            </div>
        </section>
    </div>
}

