import { Link } from 'react-router-dom';
import { Clock, Users, ChefHat } from 'lucide-react';
import { Recipe } from '@/lib/recipes';
import { Badge } from '@/components/ui/badge';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Link to={`/recipes/${recipe.id}`} className="recipe-card group block">
      <div className="relative overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="recipe-card-image"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&auto=format&fit=crop';
          }}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
            {recipe.cuisine}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge
            variant="outline"
            className={`backdrop-blur-sm ${
              recipe.difficulty === 'Easy'
                ? 'bg-accent/90 text-accent-foreground border-accent'
                : recipe.difficulty === 'Medium'
                ? 'bg-primary/90 text-primary-foreground border-primary'
                : 'bg-destructive/90 text-destructive-foreground border-destructive'
            }`}
          >
            {recipe.difficulty}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <Badge variant="outline" className="text-xs mb-2">
            {recipe.mealType}
          </Badge>
          <h3 className="font-display text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
            {recipe.description}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{totalTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{recipe.servings}</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="h-4 w-4" />
            <span>{recipe.ingredients.length} items</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
