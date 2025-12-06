import MainLayout from '@/components/layout/MainLayout';
import HeroSlider from '@/components/home/HeroSlider';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import FlashSale from '@/components/home/FlashSale';
import BrandPartners from '@/components/home/BrandPartners';
import Testimonials from '@/components/home/Testimonials';

const Index = () => {
  return (
    <MainLayout>
      <HeroSlider />
      <CategoryGrid />
      <FeaturedProducts />
      <FlashSale />
      <BrandPartners />
      <Testimonials />
    </MainLayout>
  );
};

export default Index;
