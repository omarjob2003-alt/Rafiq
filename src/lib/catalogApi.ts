import { api } from './apiClient'
import { products, productsEn } from '../data/products'
import { collections } from '../data/collections'
import type { Collection, Product } from '../types'

interface CategoryDto {
  id: string
  nameAr: string
  nameEn: string | null
  descriptionAr: string | null
  descriptionEn: string | null
  imageUrl: string
  href: string
}

interface ProductSummaryDto {
  id: string
  nameAr: string
  nameEn: string | null
  price: number
  currency: string
  imageUrl: string
  categoryId: string
  isBestSeller: boolean
  averageRating: number
  reviewCount: number
}

interface ProductDetailDto extends ProductSummaryDto {
  descriptionAr: string | null
  descriptionEn: string | null
  categoryNameAr: string
  categoryNameEn: string
  colors: { hex: string; nameAr: string; nameEn: string }[]
  usageTags: { id: string; nameAr: string; nameEn: string }[]
}

interface PagedResult<T> {
  items: T[]
  page: number
  pageSize: number
  totalCount: number
}

// الـ API لسه مفيهوش مخزون - قيمة مؤقتة لحد ما الـ Backend يضيفه
const DEFAULT_STOCK = 999

function mapCategory(dto: CategoryDto): Collection {
  return {
    id: dto.id,
    name: dto.nameAr,
    nameEn: dto.nameEn ?? dto.nameAr,
    description: dto.descriptionAr ?? '',
    image: dto.imageUrl,
    href: dto.href || `/collections/${dto.id}`,
  }
}

function mapProduct(summary: ProductSummaryDto, detail: ProductDetailDto | undefined, categoryNames: Map<string, string>): Product {
  return {
    id: summary.id,
    name: summary.nameAr,
    description: detail?.descriptionAr ?? '',
    price: summary.price,
    currency: summary.currency,
    image: summary.imageUrl,
    category: detail?.categoryNameAr ?? categoryNames.get(summary.categoryId) ?? '',
    categoryIds: [summary.categoryId],
    colors: detail?.colors.map(color => color.hex) ?? [],
    usage: detail?.usageTags.map(tag => tag.id) ?? [],
    stock: DEFAULT_STOCK,
    stockMode: 'stock',
    isBestSeller: summary.isBestSeller,
    averageRating: summary.averageRating,
    reviewCount: summary.reviewCount,
  }
}

async function fetchAllProductSummaries(): Promise<ProductSummaryDto[]> {
  const all: ProductSummaryDto[] = []
  let page = 1
  while (true) {
    const result = await api.get<PagedResult<ProductSummaryDto>>(`/products?page=${page}&pageSize=50`, false)
    all.push(...result.items)
    if (result.items.length === 0 || all.length >= result.totalCount) break
    page++
  }
  return all
}

export async function loadCatalog() {
  const [categoryDtos, summaries] = await Promise.all([
    api.get<CategoryDto[]>('/categories', false),
    fetchAllProductSummaries(),
  ])

  const details = await Promise.allSettled(
    summaries.map(summary => api.get<ProductDetailDto>(`/products/${summary.id}`, false))
  )

  const categoryNames = new Map(categoryDtos.map(category => [category.id, category.nameAr]))
  const mappedProducts: Product[] = []
  const english: Record<string, { name: string; description: string }> = {}

  summaries.forEach((summary, index) => {
    const result = details[index]
    const detail = result.status === 'fulfilled' ? result.value : undefined
    mappedProducts.push(mapProduct(summary, detail, categoryNames))
    english[summary.id] = {
      name: summary.nameEn ?? summary.nameAr,
      description: detail?.descriptionEn ?? detail?.descriptionAr ?? '',
    }
  })

  // نملا نفس المصفوفات اللي باقي الملفات مستوردها (in-place)، فمفيش ملف تاني محتاج يتعدّل
  collections.splice(0, collections.length, ...categoryDtos.map(mapCategory))
  products.splice(0, products.length, ...mappedProducts)
  Object.keys(productsEn).forEach(key => delete productsEn[key])
  Object.assign(productsEn, english)
}