import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AdSpaces } from "@/components/AdSpaces";
import { ProductList } from "@/components/ProductList";
import { MangoGame } from "@/components/MangoGame";
import { StatsSection } from "@/components/StatsSection";
import { LatestContentFeed } from "@/components/LatestContentFeed";
import { SocialSection } from "@/components/SocialSection";
import { Footer } from "@/components/Footer";
import { BrandsSection } from "@/components/BrandsSection";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  const { data: showGameSection } = useSiteSettings('game_section_visible');

  useSEO({
    title: "أحمد مانجو | مراجعات سناكس ومنتجات - استكا ولا فاستكا",
    description: "أحمد مانجو - أكبر منصة مراجعات سناكس ومنتجات غذائية في مصر. شوف تقييمات صادقة لشيبسي، شوكولاتة، مشروبات، بسكويت وكل السناكس. استكا ولا فاستكا؟ العب واكسب جوائز حقيقية!",
    canonical: "/",
  });

  return (
    <div className="min-h-screen font-poppins">
      <Navbar />

      <main>
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Stats - Social proof right after hero */}
        <StatsSection />

        {/* Section 3: Latest Videos - Fans want content */}
        <LatestContentFeed />

        {/* Section 4: Product List (استكا / فاستكا) */}
        <ProductList />

        {/* Section 5: For Brands CTA */}
        <BrandsSection />

        {/* Section 6: Ad Spaces - Earned attention */}
        <AdSpaces />

        {/* Section 7: Mango Game - Only show if enabled */}
        {showGameSection && <MangoGame />}

        {/* Section 8: Social Section */}
        <SocialSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
