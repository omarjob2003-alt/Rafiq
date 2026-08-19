import { useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { Check, ChevronLeft, Heart, Minus, Plus, ShoppingBag, Truck, Undo2 } from "lucide-react";
import { ProductCard } from "../components/products/ProductCard";
import { products, productsEn } from "../data/products";
import { useLocalized } from "../hooks/useLocalized";
import { useLanguage } from "../context/LanguageContext";
import { cn } from "../lib/cn";
import { useCart } from "../context/CartContext";
import { usePageTitle } from '../hooks/usePageTitle'
import { StarRating } from '../components/ui/StarRating'
import { getProductRating, getProductReviews } from '../data/reviews'
import { useTrackRecentlyViewed } from '../hooks/useRecentlyViewed'
import { RecentlyViewedSection } from '../components/products/RecentlyViewedSection'
import { MobileStickyBuyBar } from '../components/products/MobileStickyBuyBar'
import { ZoomIn } from 'lucide-react'
import { ImageLightbox } from '../components/ui/ImageLightbox'
import { useScrolled } from '../hooks/useScrolled'

const galleryImages = [
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=1200&q=85&auto=format&fit=crop",
];

const colorOptions = [
  { id: "black", hex: "#191615", ar: "أسود", en: "Black" },
  { id: "ivory", hex: "#ded8c9", ar: "عاجي", en: "Ivory" },
  { id: "olive", hex: "#303a2f", ar: "أخضر داكن", en: "Dark olive" },
];

const sizeOptions = [
  { ar: "30 × 40 سم", en: "30 × 40 cm" },
  { ar: "40 × 60 سم", en: "40 × 60 cm" },
  { ar: "60 × 80 سم", en: "60 × 80 cm" },
];

const tabs = [
  { id: "story", ar: "القصة", en: "Story" },
  { id: "details", ar: "التفاصيل", en: "Details" },
  { id: "specs", ar: "المواصفات", en: "Specifications" },
  { id: "reviews", ar: "التقييمات", en: "Reviews" },
  { id: "shipping", ar: "الشحن والإرجاع", en: "Shipping & returns" },
];

const specs = [
  { ar: ["الخامة", "معدن مطلي ببودرة حرارية"], en: ["Material", "Powder-coated metal"] },
  { ar: ["المحتويات", "لوح، رفّان، حامل أقلام، 4 خطافات"], en: ["Includes", "Board, 2 shelves, pen holder, 4 hooks"] },
  { ar: ["التركيب", "يثبّت على الحائط بسهولة"], en: ["Installation", "Easy wall mounting"] },
];


export function Product() {
  const { addItem } = useCart();
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [added, setAdded] = useState(false);
  const { productId } = useParams();
  const { isArabic, t } = useLocalized();
  usePageTitle(t('تفاصيل المنتج', 'Product Details'))

  const { dir } = useLanguage();
  const product = products.find((item) => item.id === productId) ?? products[0];
  const copy = productsEn[product.id];
  useTrackRecentlyViewed(product.id)
  const rating = getProductRating(product.id)
  const reviews = getProductReviews(product.id)


  const name = isArabic ? product.name : copy.name;
  const description = isArabic ? product.description : copy.description;

  const images = [product.image, ...galleryImages];
  const [activeImage, setActiveImage] = useState(0);
  const [colorId, setColorId] = useState(colorOptions[0].id);
  const [sizeIndex, setSizeIndex] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [tab, setTab] = useState(tabs[0].id);

  const activeColor = colorOptions.find((item) => item.id === colorId) ?? colorOptions[0];
  const activeTab = tabs.find((item) => item.id === tab) ?? tabs[0];

 const showStickyBar = useScrolled(560)

  return (
    <div dir={dir} className="pt-[108px] pb-20 md:pb-0">
      <div className="mx-auto max-w-[1440px] px-5 py-7 md:px-10 md:py-10">
        <nav className="mb-7 flex items-center gap-2 text-xs text-muted dark:text-muted-dark md:mb-10">
          <Link to="/" className="hover:text-burgundy">{t("الرئيسية", "Home")}</Link>
          <ChevronLeft size={13} className={isArabic ? "" : "rotate-180"} />
          <Link to="/shop" className="hover:text-burgundy">{t("المتجر", "Shop")}</Link>
          <ChevronLeft size={13} className={isArabic ? "" : "rotate-180"} />
          <span className="text-ink dark:text-ink-dark">{name}</span>
        </nav>
       


        <section className="grid gap-9 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,.85fr)] lg:gap-16">
          <div className="lg:order-2">
            <button onClick={() => setLightboxOpen(true)} className="group relative aspect-[1.08/1] w-full overflow-hidden rounded-2xl bg-[#e7dfd5] dark:bg-paper-dark md:rounded-[26px]">
              <img src={images[activeImage]} alt={name} className="h-full w-full object-cover" />
              <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-cream/90 px-3 py-1.5 text-xs font-medium text-ink opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100 dark:bg-cream-dark/90 dark:text-ink-dark">
                <ZoomIn size={13} /> {t('تكبير', 'Zoom')}
              </span>
            </button>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button key={image + index} onClick={() => setActiveImage(index)} aria-label={t(`صورة ${index + 1}`, `Image ${index + 1}`)} className={cn("aspect-square overflow-hidden rounded-xl border-2 bg-white transition dark:bg-paper-dark", activeImage === index ? "border-burgundy" : "border-transparent hover:border-burgundy/35")}>
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:order-1 lg:pt-4">
            <span className="inline-flex rounded-full border border-burgundy/20 bg-burgundy/[.04] px-3 py-1 text-xs text-burgundy dark:bg-burgundy/10">{t("الأكثر مبيعًا", "Best seller")}</span>
            <h1 className="mt-4 font-ar-heading text-4xl font-semibold leading-tight text-ink dark:text-ink-dark md:text-5xl">{name}</h1>
            <button onClick={() => setTab('reviews')} className="mt-2 flex items-center gap-2 text-sm text-muted transition hover:text-burgundy dark:text-muted-dark">
              <StarRating rating={rating.average} />
              <span>{rating.average}</span>
              <span className="underline underline-offset-2">({rating.count} {t('تقييم', 'reviews')})</span>
            </button>
            <p className="mt-1 font-en-heading text-lg tracking-wide text-muted dark:text-muted-dark">{isArabic ? product.category : product.categoryId}</p>
            <p className="mt-6 max-w-md text-sm leading-8 text-muted dark:text-muted-dark">{description}</p>
            <p className="mt-5 text-2xl font-semibold text-burgundy">{product.price} <span className="text-base">{isArabic ? product.currency : "EGP"}</span></p>

            <div className="mt-7 space-y-6 border-y border-line py-6 dark:border-line-dark">
              <div>
                <div className="mb-3 flex justify-between text-sm text-ink dark:text-ink-dark"><span>{t("اللون", "Color")}</span><span className="text-muted dark:text-muted-dark">{isArabic ? activeColor.ar : activeColor.en}</span></div>
                <div className="flex gap-3">
                  {colorOptions.map((item) => (
                    <button key={item.id} onClick={() => setColorId(item.id)} aria-label={isArabic ? item.ar : item.en} style={{ backgroundColor: item.hex }} className={cn("h-8 w-8 rounded-full border-[3px] border-cream ring-1 transition dark:border-cream-dark", colorId === item.id ? "ring-burgundy scale-110" : "ring-transparent hover:scale-105")} />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm text-ink dark:text-ink-dark">{t("المقاس", "Size")}</p>
                <div className="grid grid-cols-3 gap-2">
                  {sizeOptions.map((item, index) => (
                    <button key={item.ar} onClick={() => setSizeIndex(index)} className={cn("rounded-lg border px-2 py-3 text-xs transition dark:border-line-dark dark:text-ink-dark", sizeIndex === index ? "border-burgundy bg-burgundy/[.03] text-burgundy dark:bg-burgundy/10" : "hover:border-burgundy/40")}>{isArabic ? item.ar : item.en}</button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink dark:text-ink-dark">{t("الكمية", "Quantity")}</span>
                <div className="flex items-center rounded-lg border bg-paper dark:border-line-dark dark:bg-paper-dark">
                  <button onClick={() => setQuantity((v) => Math.max(1, v - 1))} aria-label={t("تقليل الكمية", "Decrease quantity")} className="p-2.5 text-muted hover:text-burgundy dark:text-muted-dark"><Minus size={15} /></button>
                  <span className="w-8 text-center text-sm text-ink dark:text-ink-dark">{quantity}</span>
                  <button onClick={() => setQuantity((v) => v + 1)} aria-label={t("زيادة الكمية", "Increase quantity")} className="p-2.5 text-muted hover:text-burgundy dark:text-muted-dark"><Plus size={15} /></button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => { addItem(product.id, quantity); setAdded(true); setTimeout(() => setAdded(false), 1800) }} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-burgundy px-5 py-4 text-sm font-medium text-cream transition hover:bg-burgundy-dark">
                {added ? <Check size={18} /> : <ShoppingBag size={18} />}
                {added ? t("تمت الإضافة", "Added") : t("أضف إلى السلة", "Add to cart")}
              </button>
              <button onClick={() => setWishlisted((value) => !value)} aria-label={t("إضافة للمفضلة", "Add to wishlist")} className="grid w-14 place-items-center rounded-lg border border-burgundy text-burgundy"><Heart size={19} className={wishlisted ? "fill-burgundy" : ""} /></button>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3 text-center text-[11px] leading-5 text-muted dark:text-muted-dark">
              <div className="flex flex-col items-center gap-1"><Truck size={20} className="text-ink dark:text-ink-dark" />{t("شحن سريع", "Fast shipping")}<br />{t("خلال 2–4 أيام", "Within 2–4 days")}</div>
              <div className="flex flex-col items-center gap-1"><Undo2 size={20} className="text-ink dark:text-ink-dark" />{t("استبدال سهل", "Easy returns")}<br />{t("خلال 14 يوم", "Within 14 days")}</div>
              <div className="flex flex-col items-center gap-1"><Check size={20} className="text-ink dark:text-ink-dark" />{t("جودة مضمونة", "Guaranteed quality")}<br />{t("صُنعت بعناية", "Thoughtfully made")}</div>
            </div>
          </div>
        </section>

        <section className="mt-16 border-t border-line pt-1 dark:border-line-dark md:mt-24">
          <div className="flex overflow-x-auto border-b border-line dark:border-line-dark">
            {tabs.map((item) => (
              <button key={item.id} onClick={() => setTab(item.id)} className={cn("shrink-0 border-b-2 px-6 py-4 text-sm transition", tab === item.id ? "border-burgundy text-burgundy" : "border-transparent text-muted hover:text-ink dark:text-muted-dark dark:hover:text-ink-dark")}>{isArabic ? item.ar : item.en}</button>
            ))}
          </div>
          <div className="grid gap-8 py-10 md:grid-cols-2 md:items-center md:py-14">
            <div>
              <h2 className="font-ar-heading text-2xl font-semibold text-ink dark:text-ink-dark">{tab === "story" ? t("فكرة بسيطة تصنع فرقًا كبيرًا.", "A simple idea that makes a big difference.") : isArabic ? activeTab.ar : activeTab.en}</h2>
              <p className="mt-4 max-w-xl text-sm leading-8 text-muted dark:text-muted-dark">{t("صُمم هذا المنتج ليجعل أدواتك قريبة وواضحة من دون أن يزاحم مكتبك. أضِف إليه كما تحب، واصنع نظامًا يشبه طريقتك في العمل.", "This product is designed to keep your tools close and visible without crowding your desk. Add to it as you like and build a system that fits how you work.")}</p>
              {tab === "specs" && (
                <dl className="mt-6 space-y-3 text-sm">
                  {specs.map((item) => (
                    <div key={item.ar[0]} className="flex justify-between border-b border-line pb-3 dark:border-line-dark">
                      <dt className="text-muted dark:text-muted-dark">{isArabic ? item.ar[0] : item.en[0]}</dt>
                      <dd className="text-ink dark:text-ink-dark">{isArabic ? item.ar[1] : item.en[1]}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {tab === "reviews" && (
                <div className="mt-6 space-y-5">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b border-line pb-5 dark:border-line-dark">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-ink dark:text-ink-dark">{isArabic ? review.nameAr : review.nameEn}</p>
                        <StarRating rating={review.rating} size={12} />
                      </div>
                      <p className="mt-2 text-sm leading-7 text-muted dark:text-muted-dark">{isArabic ? review.commentAr : review.commentEn}</p>
                      <p className="mt-1 text-xs text-muted/70 dark:text-muted-dark/70">{new Date(review.date).toLocaleDateString(isArabic ? 'ar-EG' : 'en-GB')}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <img src={product.image} alt={name} className="aspect-[1.45/1] w-full rounded-2xl object-cover" />
            
          </div>
             
        </section>
       <RecentlyViewedSection excludeId={product.id} />

        <section className="border-t border-line pt-10 dark:border-line-dark md:pt-14">
          <div className="mb-7 flex items-end justify-between">
            <h2 className="font-ar-heading text-2xl font-semibold text-ink dark:text-ink-dark">{t("منتجات تكمل تجربتك", "Products that complete your setup")}</h2>
            <Link to="/shop" className="text-sm text-burgundy hover:underline">{t("عرض الكل", "View all")}</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {products.filter((item) => item.id !== product.id).slice(0, 4).map((item, index) => <ProductCard key={item.id} product={item} index={index} />)}
          </div>
        </section>
      </div>
     
      <MobileStickyBuyBar
        show={showStickyBar}
        name={name}
        price={product.price}
        currency={isArabic ? product.currency : 'EGP'}
        image={product.image}
        onAdd={() => { addItem(product.id, quantity); setAdded(true); setTimeout(() => setAdded(false), 1800) }}
      />
      <ImageLightbox open={lightboxOpen} images={images} activeIndex={activeImage} alt={name} onClose={() => setLightboxOpen(false)} onIndexChange={setActiveImage} />
    </div>
  );
}