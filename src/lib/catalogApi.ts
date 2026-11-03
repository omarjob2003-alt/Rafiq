import { api } from './apiClient'
import { products, productsEn } from '../data/products'
import { collections } from '../data/collections'
import { usageTags, colorOptions } from '../data/filters'
import { articles, articlesEn, inspirationImages } from '../data/content'
import { journalContent, type JournalBlock } from '../data/journalContent'
import { collectionStories } from '../data/collectionStories'
import type { Article, Collection, InspirationImage, Product } from '../types'

interface CategoryDto {
  id: string
  nameAr: string
  nameEn: string | null
  descriptionAr: string | null
  descriptionEn: string | null
  imageUrl: string
  href: string
}

interface StoryDto {
  categoryId: string
  titleAr: string
  titleEn: string | null
  textAr: string
  textEn: string | null
  imageUrl: string
}

interface CategoryDetailDto {
  category: CategoryDto
  story: StoryDto | null
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

interface UsageTagDto { id: string; nameAr: string; nameEn: string }
interface ColorDto { hex: string; nameAr: string; nameEn: string }

interface ArticleDto {
  id: string
  titleAr: string
  titleEn: string | null
  descriptionAr: string
  descriptionEn: string | null
  categoryAr: string
  categoryEn: string | null
  imageUrl: string
  readTime: string
  publishedAt: string
}

interface ArticleDetailDto {
  meta: ArticleDto
  contentBlocks: { type: string; textAr: string; textEn: string | null; orderIndex: number }[]
}

interface InspirationDto {
  id: number
  categoryLabel: string
  imageUrl: string
  size: string
}

// الـ API لسه مفيهوش مخزون - قيمة مؤقتة لحد ما الـ Backend يضيفه
const DEFAULT_STOCK = 999

const blockTypes: Record<string, JournalBlock['type']> = { Paragraph: 'paragraph', Heading: 'heading', Image: 'image' }
const inspirationSizes = ['tall', 'wide', 'square']

function settle<T>(promise: Promise<T>): Promise<T | undefined> {
  return promise.catch(() => undefined)
}

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

// الـ API بيرجّع مدة القراءة بالعربي بس ("٤ دقائق")، فبنطلّع منها النسخة الإنجليزية
function toEnglishReadTime(arabic: string): string {
  const digits = arabic.replace(/[٠-٩]/g, digit => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
  const match = digits.match(/\d+/)
  return match ? `${match[0]} min` : arabic
}

function mapArticle(dto: ArticleDto): Article {
  return {
    id: dto.id,
    title: dto.titleAr,
    description: dto.descriptionAr,
    category: dto.categoryAr,
    image: dto.imageUrl,
    readTime: dto.readTime,
    date: dto.publishedAt.slice(0, 10),
  }
}

function mapInspiration(dto: InspirationDto): InspirationImage {
  const size = dto.size.toLowerCase()
  return {
    id: String(dto.id),
    category: dto.categoryLabel,
    image: dto.imageUrl,
    size: (inspirationSizes.includes(size) ? size : 'square') as InspirationImage['size'],
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
  // المرحلة الأولى: الأساسي (لازم ينجح) + الثانوي (لو فشل نكمل بالمحتوى الاحتياطي)
  const [categoryDtos, summaries, tagDtos, colorDtos, articleDtos, inspirationDtos] = await Promise.all([
    api.get<CategoryDto[]>('/categories', false),
    fetchAllProductSummaries(),
    settle(api.get<UsageTagDto[]>('/filters/usage-tags', false)),
    settle(api.get<ColorDto[]>('/filters/colors', false)),
    settle(api.get<ArticleDto[]>('/articles', false)),
    settle(api.get<InspirationDto[]>('/inspiration', false)),
  ])

  // المرحلة التانية: التفاصيل
  const articleIds = articleDtos?.map(article => article.id) ?? []
  const [productDetails, categoryDetails, articleDetails] = await Promise.all([
    Promise.allSettled(summaries.map(summary => api.get<ProductDetailDto>(`/products/${summary.id}`, false))),
    Promise.allSettled(categoryDtos.map(category => api.get<CategoryDetailDto>(`/categories/${category.id}`, false))),
    Promise.allSettled(articleIds.map(id => api.get<ArticleDetailDto>(`/articles/${id}`, false))),
  ])

  // المنتجات والفئات
  const categoryNames = new Map(categoryDtos.map(category => [category.id, category.nameAr]))
  const mappedProducts: Product[] = []
  const english: Record<string, { name: string; description: string }> = {}

  summaries.forEach((summary, index) => {
    const result = productDetails[index]
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

  // قصص الفئات
  categoryDetails.forEach(result => {
    if (result.status !== 'fulfilled' || !result.value.story) return
    const story = result.value.story
    collectionStories[story.categoryId] = {
      titleAr: story.titleAr,
      titleEn: story.titleEn ?? story.titleAr,
      textAr: story.textAr,
      textEn: story.textEn ?? story.textAr,
      image: story.imageUrl,
    }
  })

  // الفلاتر
  if (tagDtos) usageTags.splice(0, usageTags.length, ...tagDtos.map(tag => ({ id: tag.id, ar: tag.nameAr, en: tag.nameEn })))
  if (colorDtos) colorOptions.splice(0, colorOptions.length, ...colorDtos.map(color => ({ hex: color.hex, ar: color.nameAr, en: color.nameEn })))

  // المقالات
  if (articleDtos) {
    articles.splice(0, articles.length, ...articleDtos.map(mapArticle))
    Object.keys(articlesEn).forEach(key => delete articlesEn[key])
    articleDtos.forEach(dto => {
      articlesEn[dto.id] = {
        title: dto.titleEn ?? dto.titleAr,
        description: dto.descriptionEn ?? dto.descriptionAr,
        category: dto.categoryEn ?? dto.categoryAr,
        readTime: toEnglishReadTime(dto.readTime),
      }
    })
  }

  // محتوى المقالات
  articleDetails.forEach((result, index) => {
    if (result.status !== 'fulfilled') return
    journalContent[articleIds[index]] = result.value.contentBlocks
      .slice()
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map(block => ({ type: blockTypes[block.type] ?? 'paragraph', ar: block.textAr, en: block.textEn ?? block.textAr }))
  })

  // الإلهام
  if (inspirationDtos) inspirationImages.splice(0, inspirationImages.length, ...inspirationDtos.map(mapInspiration))
}









// import { api } from './apiClient'
// import { products, productsEn } from '../data/products'
// import { collections } from '../data/collections'
// import type { Collection, Product } from '../types'

// interface CategoryDto {
//   id: string
//   nameAr: string
//   nameEn: string | null
//   descriptionAr: string | null
//   descriptionEn: string | null
//   imageUrl: string
//   href: string
// }

// interface ProductSummaryDto {
//   id: string
//   nameAr: string
//   nameEn: string | null
//   price: number
//   currency: string
//   imageUrl: string
//   categoryId: string
//   isBestSeller: boolean
//   averageRating: number
//   reviewCount: number
// }

// interface ProductDetailDto extends ProductSummaryDto {
//   descriptionAr: string | null
//   descriptionEn: string | null
//   categoryNameAr: string
//   categoryNameEn: string
//   colors: { hex: string; nameAr: string; nameEn: string }[]
//   usageTags: { id: string; nameAr: string; nameEn: string }[]
// }

// interface PagedResult<T> {
//   items: T[]
//   page: number
//   pageSize: number
//   totalCount: number
// }

// // الـ API لسه مفيهوش مخزون - قيمة مؤقتة لحد ما الـ Backend يضيفه
// const DEFAULT_STOCK = 999

// function mapCategory(dto: CategoryDto): Collection {
//   return {
//     id: dto.id,
//     name: dto.nameAr,
//     nameEn: dto.nameEn ?? dto.nameAr,
//     description: dto.descriptionAr ?? '',
//     image: dto.imageUrl,
//     href: dto.href || `/collections/${dto.id}`,
//   }
// }

// function mapProduct(summary: ProductSummaryDto, detail: ProductDetailDto | undefined, categoryNames: Map<string, string>): Product {
//   return {
//     id: summary.id,
//     name: summary.nameAr,
//     description: detail?.descriptionAr ?? '',
//     price: summary.price,
//     currency: summary.currency,
//     image: summary.imageUrl,
//     category: detail?.categoryNameAr ?? categoryNames.get(summary.categoryId) ?? '',
//     categoryIds: [summary.categoryId],
//     colors: detail?.colors.map(color => color.hex) ?? [],
//     usage: detail?.usageTags.map(tag => tag.id) ?? [],
//     stock: DEFAULT_STOCK,
//     stockMode: 'stock',
//     isBestSeller: summary.isBestSeller,
//     averageRating: summary.averageRating,
//     reviewCount: summary.reviewCount,
//   }
// }

// async function fetchAllProductSummaries(): Promise<ProductSummaryDto[]> {
//   const all: ProductSummaryDto[] = []
//   let page = 1
//   while (true) {
//     const result = await api.get<PagedResult<ProductSummaryDto>>(`/products?page=${page}&pageSize=50`, false)
//     all.push(...result.items)
//     if (result.items.length === 0 || all.length >= result.totalCount) break
//     page++
//   }
//   return all
// }

// export async function loadCatalog() {
//   const [categoryDtos, summaries] = await Promise.all([
//     api.get<CategoryDto[]>('/categories', false),
//     fetchAllProductSummaries(),
//   ])

//   const details = await Promise.allSettled(
//     summaries.map(summary => api.get<ProductDetailDto>(`/products/${summary.id}`, false))
//   )

//   const categoryNames = new Map(categoryDtos.map(category => [category.id, category.nameAr]))
//   const mappedProducts: Product[] = []
//   const english: Record<string, { name: string; description: string }> = {}

//   summaries.forEach((summary, index) => {
//     const result = details[index]
//     const detail = result.status === 'fulfilled' ? result.value : undefined
//     mappedProducts.push(mapProduct(summary, detail, categoryNames))
//     english[summary.id] = {
//       name: summary.nameEn ?? summary.nameAr,
//       description: detail?.descriptionEn ?? detail?.descriptionAr ?? '',
//     }
//   })

//   // نملا نفس المصفوفات اللي باقي الملفات مستوردها (in-place)، فمفيش ملف تاني محتاج يتعدّل
//   collections.splice(0, collections.length, ...categoryDtos.map(mapCategory))
//   products.splice(0, products.length, ...mappedProducts)
//   Object.keys(productsEn).forEach(key => delete productsEn[key])
//   Object.assign(productsEn, english)
// }