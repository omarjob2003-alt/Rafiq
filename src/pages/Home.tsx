import { HeroSection } from "../components/sections/HeroSection";
import { ValueProps } from "../components/sections/ValueProps";
import { BrandIntro } from "../components/sections/BrandIntro";
import { CollectionsSection } from "../components/sections/CollectionsSection";
import { BestSellers } from "../components/sections/BestSellers";
import { BeforeAfterSection } from "../components/sections/BeforeAfterSection";
import { BrandStatement } from "../components/sections/BrandStatement";
import { InspirationSection } from "../components/sections/InspirationSection";
import { MagazineSection } from "../components/sections/MagazineSection";
import { NewsletterSection } from "../components/sections/NewsletterSection";

export function Home() {
  return (
    <>
      <HeroSection />
      <ValueProps />
      <BrandIntro />
      <CollectionsSection />
      <BestSellers />
      <BeforeAfterSection />
      <BrandStatement />
      <InspirationSection />
      <MagazineSection />
      <NewsletterSection />
    </>
  );
}
