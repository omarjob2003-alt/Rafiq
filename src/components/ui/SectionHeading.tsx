import { motion } from "framer-motion";
import { cn } from "../../lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subtitle?: string;
  align?: "start" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  subtitle,
  align = "start",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isLight = tone === "light";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col gap-4",
        isCenter && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "text-xs tracking-[0.2em] font-medium uppercase",
            isLight ? "text-gold" : "text-burgundy"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-ar-heading text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.25] font-semibold max-w-xl whitespace-pre-line",
          isLight ? "text-cream" : "text-ink",
          isCenter && "max-w-2xl"
        )}
      >
        {heading}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-base md:text-lg leading-relaxed max-w-md",
            isLight ? "text-cream/70" : "text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
