import HeroSection from './components/home/HeroSection';
import FeaturedProperties from './components/home/FeaturedProperties';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProperties />
      {/* More sections will be added here */}
    </div>
  );
}