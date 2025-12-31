import { Link } from 'react-router-dom';
import { ArrowRight, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&auto=format&fit=crop"
          alt="Cooking background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6 animate-slide-in-left">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="text-primary font-medium">Culinary Compass</span>
          </div>

          <h1
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-tight mb-6 animate-fade-in"
            style={{ animationDelay: '100ms' }}
          >
            Discover Recipes from
            <span className="block text-primary">Around the World</span>
          </h1>

          <p
            className="text-background/80 text-lg md:text-xl mb-8 animate-fade-in"
            style={{ animationDelay: '200ms' }}
          >
            Explore a curated collection of delicious recipes from every corner
            of the globe. From quick breakfasts to gourmet dinners, find your
            next culinary adventure.
          </p>

          <div
            className="flex flex-wrap gap-4 animate-fade-in"
            style={{ animationDelay: '300ms' }}
          >
            <Button asChild size="lg" className="gap-2">
              <Link to="/recipes">
                Browse Recipes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-background/30 text-background hover:bg-background/10 hover:text-background"
            >
              <Link to="/admin">Add Your Recipe</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
