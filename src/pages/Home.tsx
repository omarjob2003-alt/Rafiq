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
import { usePageTitle } from '../hooks/usePageTitle'
import { useLocalized } from "../hooks/useLocalized";
import { RecentlyViewedHomeSection } from "../components/sections/RecentlyViewedHomeSection";


export function Home() {
  const { t } = useLocalized()
  usePageTitle(t('رفيق | Rafiq — مساحة عمل تساعدك تنجز', 'Rafiq — a workspace that helps you get things done'))
  return (
    
    <>
      <HeroSection />
      <ValueProps />
      <BrandIntro />
      <CollectionsSection />
      <BestSellers />
      <RecentlyViewedHomeSection />
      <BeforeAfterSection />
      <BrandStatement />
      <InspirationSection />
      <MagazineSection />
      <NewsletterSection />
    </>
  );
}
