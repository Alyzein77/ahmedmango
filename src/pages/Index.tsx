import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AdSpaces } from "@/components/AdSpaces";
import { ProductList } from "@/components/ProductList";
import { MangoGame } from "@/components/MangoGame";
import { StatsSection } from "@/components/StatsSection";
import { RecentVideos } from "@/components/RecentVideos";
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
      
      {/* Section 4: Mango Game */}
      <MangoGame />
      
      {/* Section 5: Stats Section */}
      <StatsSection />
      
      {/* Section 6: Recent Videos */}
      <RecentVideos />
      
      {/* Section 7: Social Section */}
      <SocialSection />
      
      {/* Section 8: Footer */}
      <Footer />
    </div>
  );
};

export default Index;
