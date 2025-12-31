import { useRecipes } from '@/context/RecipeContext';
import { RecipeCard } from '@/components/recipes/RecipeCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FeaturedRecipes() {
  const { recipes } = useRecipes();
  const featuredRecipes = recipes.slice(0, 3);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Chef's Picks
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              Featured Recipes
            </h2>
            <p className="text-muted-foreground mt-2 max-w-md">
              Hand-picked recipes that our community loves the most.
            </p>
          </div>
          <Button asChild variant="ghost" className="gap-2 mt-4 md:mt-0">
            <Link to="/recipes">
              View All Recipes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe, index) => (
            <div
              key={recipe.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
