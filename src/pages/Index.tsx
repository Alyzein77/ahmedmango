import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { RatingSystem } from "@/components/RatingSystem";
import { MangoApproachSection } from "@/components/MangoApproachSection";
import { SponsorBanner } from "@/components/SponsorBanner";
import { RewardsSection } from "@/components/RewardsSection";
import { SponsorsShowcase } from "@/components/SponsorsShowcase";
import { WinnersSection } from "@/components/WinnersSection";
import { SocialSection } from "@/components/SocialSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Sponsor Banner after Hero */}
      <div className="container mx-auto px-4">
        <SponsorBanner
          sponsorName="مساحة إعلانية متاحة"
          sponsorTagline="روج لعلامتك التجارية أمام آلاف المتابعين"
          ctaText="احجز الآن"
          ctaLink="mailto:business@ahmadmango.com"
        />
      </div>
      
      <RatingSystem />
      <MangoApproachSection />
      <RewardsSection />
      
      {/* Sponsors Showcase Section */}
      <SponsorsShowcase />
      
      <WinnersSection />
      <SocialSection />
      <Footer />
    </div>
  );
};

export default Index;
