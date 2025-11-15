import { Hero } from "@/components/Hero";
import { RatingSystem } from "@/components/RatingSystem";
import { RewardsSection } from "@/components/RewardsSection";
import { WinnersSection } from "@/components/WinnersSection";
import { SocialSection } from "@/components/SocialSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <RatingSystem />
      <RewardsSection />
      <WinnersSection />
      <SocialSection />
      <Footer />
    </div>
  );
};

export default Index;
