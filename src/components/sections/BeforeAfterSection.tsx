import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

const BEFORE_IMG =
  "https://images.unsplash.com/photo-1587613864411-cee1fda9c169?w=1400&q=80&auto=format&fit=crop";
const AFTER_IMG =
  "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=1400&q=80&auto=format&fit=crop";

export function BeforeAfterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const x = useMotionValue(50); // percentage 0–100
  const clipPath = useTransform(x, (v) => `inset(0 ${100 - v}% 0 0)`);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // RTL-aware: "before" revealed from the right edge
      const pct = ((clientX - rect.left) / rect.width) * 100;
      x.set(Math.min(100, Math.max(0, pct)));
    },
    [x]
  );

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = () => setDragging(false);

  const nudge = (dir: -1 | 1) => {
    animate(x, Math.min(100, Math.max(0, x.get() + dir * 12)), {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    });
  };

  return (
    <section className="bg-cream border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-28">
        <SectionHeading
          align="center"
          heading={"من الفوضى...\nإلى مساحة تريحك."}
        />

        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative mt-12 aspect-[16/10] md:aspect-[16/8] w-full select-none overflow-hidden rounded-2xl cursor-ew-resize touch-none"
        >
          {/* After (base layer, fully visible) */}
          <img
            src={AFTER_IMG}
            alt="مساحة عمل رفيق منظمة: مفرش مكتب، لوحة تعليق، تقويم أسبوعي ودفتر"
            className="absolute inset-0 h-full w-full object-cover pointer-events-none"
            draggable={false}
          />
          <span className="absolute bottom-5 left-5 z-10 rounded-full bg-cream/90 px-4 py-1.5 text-xs font-medium text-ink">
            بعد
          </span>

          {/* Before (clipped layer, revealed from right) */}
          <motion.div
            style={{ clipPath }}
            className="absolute inset-0 pointer-events-none"
          >
            <img
              src={BEFORE_IMG}
              alt="مكتب فوضوي: كابلات متشابكة، دفاتر متناثرة وأغراض عشوائية"
              className="h-full w-full object-cover"
              draggable={false}
            />
            <span className="absolute bottom-5 right-5 rounded-full bg-ink/80 px-4 py-1.5 text-xs font-medium text-cream">
              قبل
            </span>
          </motion.div>

          {/* Divider handle */}
          <motion.div
            style={{ right: useTransform(x, (v) => `${v}%`) }}
            className="absolute inset-y-0 z-20 flex items-center"
          >
            <div className="absolute inset-y-0 w-0.5 bg-cream/90 -translate-x-1/2" />
            <button
              aria-label="حرّك للمقارنة بين قبل وبعد"
              onPointerDown={handlePointerDown}
              className="relative -translate-x-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink shadow-xl active:scale-95 transition-transform"
            >
              <MoveHorizontal size={18} />
            </button>
          </motion.div>
        </div>

        {/* Mobile-friendly nudge controls */}
        <div className="mt-5 flex justify-center gap-3 md:hidden">
          <button
            onClick={() => nudge(-1)}
            className="rounded-full border border-line px-5 py-2 text-sm text-ink/80"
          >
            قبل
          </button>
          <button
            onClick={() => nudge(1)}
            className="rounded-full border border-line px-5 py-2 text-sm text-ink/80"
          >
            بعد
          </button>
        </div>
      </div>
    </section>
  );
}
