import { Link } from 'react-router-dom';
import { cuisines } from '@/lib/recipes';

const cuisineImages: Record<string, string> = {
  Italian: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=400&auto=format&fit=crop',
  Mexican: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&auto=format&fit=crop',
  Japanese: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&auto=format&fit=crop',
  Indian: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&auto=format&fit=crop',
  French: 'https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?w=400&auto=format&fit=crop',
  Thai: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&auto=format&fit=crop',
  Mediterranean: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop',
  American: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop',
  Chinese: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&auto=format&fit=crop',
  'Middle Eastern': 'https://images.unsplash.com/photo-1547424850-a5b24e5c214d?w=400&auto=format&fit=crop',
};

export function CuisineCategories() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Explore by Region
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            World Cuisines
          </h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Embark on a culinary journey across different cultures and flavors.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cuisines.map((cuisine, index) => (
            <Link
              key={cuisine}
              to={`/recipes?cuisine=${cuisine}`}
              className="group relative aspect-square rounded-xl overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <img
                src={cuisineImages[cuisine]}
                alt={cuisine}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute inset-0 flex items-end p-4">
                <h3 className="font-display text-lg font-semibold text-background group-hover:text-primary transition-colors">
                  {cuisine}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
