import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Minus, Plus, X } from 'lucide-react'
import { useLocalized } from '../../hooks/useLocalized'
import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../lib/cn'

interface ImageLightboxProps {
  open: boolean
  images: string[]
  activeIndex: number
  alt: string
  onClose: () => void
  onIndexChange: (index: number) => void
}

export function ImageLightbox({ open, images, activeIndex, alt, onClose, onIndexChange }: ImageLightboxProps) {
  const { t } = useLocalized()
  const { dir } = useLanguage()
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const dragState = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null)

  useEffect(() => {
    if (open) { setZoom(1); setPan({ x: 0, y: 0 }) }
  }, [open, activeIndex])

  const goPrev = () => onIndexChange(activeIndex === 0 ? images.length - 1 : activeIndex - 1)
  const goNext = () => onIndexChange(activeIndex === images.length - 1 ? 0 : activeIndex + 1)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') dir === 'rtl' ? goPrev() : goNext()
      if (event.key === 'ArrowLeft') dir === 'rtl' ? goNext() : goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, activeIndex, dir])

  const toggleZoom = () => {
    if (zoom > 1) { setZoom(1); setPan({ x: 0, y: 0 }) }
    else setZoom(2.2)
  }

  const onPointerDown = (event: React.PointerEvent) => {
    if (zoom <= 1) return
    dragState.current = { startX: event.clientX, startY: event.clientY, panX: pan.x, panY: pan.y }
  }
  const onPointerMove = (event: React.PointerEvent) => {
    if (!dragState.current) return
    const dx = event.clientX - dragState.current.startX
    const dy = event.clientY - dragState.current.startY
    setPan({ x: dragState.current.panX + dx, y: dragState.current.panY + dy })
  }
  const onPointerUp = () => { dragState.current = null }

  return <AnimatePresence>
    {open && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm">
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <button onClick={() => setZoom(z => Math.max(1, z - .5))} aria-label={t('تصغير', 'Zoom out')} className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"><Minus size={18} /></button>
            <button onClick={() => setZoom(z => Math.min(3, z + .5))} aria-label={t('تكبير', 'Zoom in')} className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"><Plus size={18} /></button>
          </div>
          {images.length > 1 && <p className="text-xs text-white/70">{activeIndex + 1} / {images.length}</p>}
          <button onClick={onClose} aria-label={t('إغلاق', 'Close')} className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"><X size={20} /></button>
        </div>

        {images.length > 1 && zoom === 1 && <>
          <button onClick={goPrev} aria-label={t('الصورة السابقة', 'Previous image')} className="absolute inset-y-0 start-2 z-10 my-auto grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:start-5">
            <ChevronRight size={22} className={dir === 'rtl' ? '' : 'rotate-180'} />
          </button>
          <button onClick={goNext} aria-label={t('الصورة التالية', 'Next image')} className="absolute inset-y-0 end-2 z-10 my-auto grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:end-5">
            <ChevronLeft size={22} className={dir === 'rtl' ? '' : 'rotate-180'} />
          </button>
        </>}

        <div
          className="flex h-full w-full items-center justify-center overflow-hidden touch-none select-none"
          style={{ cursor: zoom > 1 ? 'grab' : 'zoom-in' }}
          onClick={event => { if (event.target === event.currentTarget || (event.target as HTMLElement).tagName === 'IMG') toggleZoom() }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt={alt}
            draggable={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: zoom, x: pan.x, y: pan.y }}
            transition={{ duration: zoom === 1 ? .3 : 0 }}
            className="max-h-[85vh] max-w-[92vw] object-contain"
          />
        </div>

        {images.length > 1 && <div className="absolute bottom-12 inset-x-0 flex justify-center gap-2">
          {images.map((_, index) => <button key={index} onClick={() => onIndexChange(index)} aria-label={`${index + 1}`} className={cn('size-1.5 rounded-full transition-all', index === activeIndex ? 'w-5 bg-white' : 'bg-white/40')} />)}
        </div>}

        <p className="absolute bottom-5 inset-x-0 text-center text-xs text-white/60">{t('دوس على الصورة للتكبير، واسحب للتحريك', 'Tap the image to zoom, and drag to pan')}</p>
      </motion.div>
    )}
  </AnimatePresence>
}