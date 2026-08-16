import { cn } from "../../lib/cn";
import logoSvg from "../../assets/logo.svg";

interface LogoProps {
  tone?: "dark" | "light";
  className?: string;
}

export function Logo({ tone = "dark", className }: LogoProps) {
  const toneClass = tone === "light" ? "brightness-0 invert" : "";

  return (
    <a
      href="/"
      className={cn("select-none -translate-y-4", toneClass, className)}
      style={{ direction: "ltr" }}
      aria-label="RAFIQ — رفيق"
    >
      <img
        src={logoSvg}
        alt="RAFIQ Logo"
        className="h-20 w-auto"
      />
    </a>
  );
}
