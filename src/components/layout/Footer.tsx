import { ChefHat, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-foreground">
              <ChefHat className="h-6 w-6 text-primary" />
              <span className="font-display text-lg font-semibold">
                Culinary Compass
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Discover delicious recipes from around the world. Your journey to
              culinary excellence starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/recipes"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  All Recipes
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes?mealType=Breakfast"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Breakfast Ideas
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes?mealType=Dessert"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Desserts
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">
              Popular Cuisines
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/recipes?cuisine=Italian"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Italian
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes?cuisine=Japanese"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Japanese
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes?cuisine=Indian"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Indian
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes?cuisine=Mexican"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Mexican
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-primary fill-primary" /> for
            food lovers everywhere
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            © {new Date().getFullYear()} Culinary Compass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
