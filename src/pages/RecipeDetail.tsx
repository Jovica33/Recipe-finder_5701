import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, ChefHat, Printer } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useRecipes } from '@/context/RecipeContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipeById } = useRecipes();

  const recipe = id ? getRecipeById(id) : undefined;

  if (!recipe) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-4">
              Recipe Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The recipe you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/recipes">Browse All Recipes</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Layout>
      <article className="min-h-screen bg-background">
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1920&auto=format&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

          {/* Back Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 gap-2 glass-effect"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 -mt-24 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header Card */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg animate-fade-in">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{recipe.cuisine}</Badge>
                <Badge variant="outline">{recipe.mealType}</Badge>
                <Badge
                  variant="outline"
                  className={
                    recipe.difficulty === 'Easy'
                      ? 'border-accent text-accent'
                      : recipe.difficulty === 'Medium'
                      ? 'border-primary text-primary'
                      : 'border-destructive text-destructive'
                  }
                >
                  {recipe.difficulty}
                </Badge>
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {recipe.title}
              </h1>

              <p className="text-muted-foreground text-lg mb-6">
                {recipe.description}
              </p>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Time</p>
                    <p className="font-medium text-foreground">{totalTime} min</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">Servings</p>
                    <p className="font-medium text-foreground">{recipe.servings} people</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <ChefHat className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">Prep / Cook</p>
                    <p className="font-medium text-foreground">
                      {recipe.prepTime} / {recipe.cookTime} min
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                  className="gap-2"
                >
                  <Printer className="h-4 w-4" />
                  Print Recipe
                </Button>
              </div>
            </div>

            {/* Recipe Details */}
            <div className="grid md:grid-cols-3 gap-8 mt-8 pb-16">
              {/* Ingredients */}
              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm">
                      {recipe.ingredients.length}
                    </span>
                    Ingredients
                  </h2>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-foreground animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Instructions */}
              <div className="md:col-span-2">
                <h2 className="font-display text-xl font-semibold mb-6">
                  Instructions
                </h2>
                <ol className="space-y-6">
                  {recipe.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-4 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-foreground pt-1">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
