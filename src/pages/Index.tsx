import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedRecipes } from '@/components/home/FeaturedRecipes';
import { CuisineCategories } from '@/components/home/CuisineCategories';
import { MealTypeSection } from '@/components/home/MealTypeSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedRecipes />
      <CuisineCategories />
      <MealTypeSection />
    </Layout>
  );
};

export default Index;
