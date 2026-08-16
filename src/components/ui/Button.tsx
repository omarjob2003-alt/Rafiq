import { type ReactNode } from "react";
import { cn } from "../../lib/cn";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  href,
  onClick,
  className,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out";

  const sizes = {
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-[15px]",
  };

  const variants = {
    primary:
      "bg-burgundy text-cream hover:bg-burgundy-dark hover:shadow-lg hover:shadow-burgundy/20 active:scale-[0.98]",
    secondary:
      "bg-transparent text-ink border border-ink/20 hover:border-burgundy hover:text-burgundy active:scale-[0.98]",
    ghost: "bg-white/90 text-burgundy hover:bg-white active:scale-[0.98]",
  };

  const classes = cn(base, sizes[size], variants[variant], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
      {icon}
    </button>
  );
}
