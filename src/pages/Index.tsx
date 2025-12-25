import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AdSpaces } from "@/components/AdSpaces";
import { ProductList } from "@/components/ProductList";
import { ProductReviewsSection } from "@/components/ProductReviewsSection";
import { MangoGame } from "@/components/MangoGame";
import { StatsSection } from "@/components/StatsSection";
import { LatestContentFeed } from "@/components/LatestContentFeed";
import { SocialSection } from "@/components/SocialSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen font-poppins">
      {/* Section 1: Navigation */}
      <Navbar />
      
      {/* Section 1: Hero */}
      <Hero />
      
      {/* Section 2: Ad Spaces */}
      <AdSpaces />
      
      {/* Section 3: Product List (2استكا / فاستكا) */}
      <ProductList />
      
      {/* Section 4: Product Reviews */}
      <ProductReviewsSection />
      
      {/* Section 5: Mango Game */}
      <MangoGame />
      
      {/* Section 6: Stats Section */}
      <StatsSection />
      
      {/* Section 7: Latest Content Feed */}
      <LatestContentFeed />
      
      {/* Section 8: Social Section */}
      <SocialSection />
      
      {/* Section 9: Footer */}
      <Footer />
    </div>
  );
};

export default Index;
