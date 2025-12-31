import { Link } from 'react-router-dom';
import { Sunrise, Sun, Moon, Cake, Salad, Cookie, UtensilsCrossed } from 'lucide-react';
import { mealTypes } from '@/lib/recipes';

const mealTypeIcons: Record<string, React.ReactNode> = {
  Breakfast: <Sunrise className="h-8 w-8" />,
  Lunch: <Sun className="h-8 w-8" />,
  Dinner: <Moon className="h-8 w-8" />,
  Dessert: <Cake className="h-8 w-8" />,
  Appetizer: <UtensilsCrossed className="h-8 w-8" />,
  Snack: <Cookie className="h-8 w-8" />,
  'Side Dish': <Salad className="h-8 w-8" />,
};

export function MealTypeSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            What's Cooking?
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Browse by Meal Type
          </h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Find the perfect recipe for any time of day.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {mealTypes.map((mealType, index) => (
            <Link
              key={mealType}
              to={`/recipes?mealType=${mealType}`}
              className="group p-6 rounded-xl bg-card border border-border text-center card-hover animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {mealTypeIcons[mealType]}
              </div>
              <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                {mealType}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
