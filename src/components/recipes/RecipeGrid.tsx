import { Recipe } from '@/lib/recipes';
import { RecipeCard } from './RecipeCard';
import { ChefHat } from 'lucide-react';

interface RecipeGridProps {
  recipes: Recipe[];
}

export function RecipeGrid({ recipes }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <ChefHat className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          No Recipes Found
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe, index) => (
        <div
          key={recipe.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
}
