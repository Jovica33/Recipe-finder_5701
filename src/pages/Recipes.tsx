import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { RecipeFilters } from '@/components/recipes/RecipeFilters';
import { RecipeGrid } from '@/components/recipes/RecipeGrid';
import { useRecipes } from '@/context/RecipeContext';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Recipes() {
  const { recipes } = useRecipes();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState(
    searchParams.get('cuisine') || ''
  );
  const [selectedMealType, setSelectedMealType] = useState(
    searchParams.get('mealType') || ''
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCuisine) params.set('cuisine', selectedCuisine);
    if (selectedMealType) params.set('mealType', selectedMealType);
    setSearchParams(params);
  }, [selectedCuisine, selectedMealType, setSearchParams]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCuisine =
        !selectedCuisine || recipe.cuisine === selectedCuisine;
      const matchesMealType =
        !selectedMealType || recipe.mealType === selectedMealType;
      const matchesDifficulty =
        !selectedDifficulty || recipe.difficulty === selectedDifficulty;

      return matchesSearch && matchesCuisine && matchesMealType && matchesDifficulty;
    });
  }, [recipes, searchQuery, selectedCuisine, selectedMealType, selectedDifficulty]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCuisine('');
    setSelectedMealType('');
    setSelectedDifficulty('');
  };

  const activeFilterCount = [
    searchQuery,
    selectedCuisine,
    selectedMealType,
    selectedDifficulty,
  ].filter(Boolean).length;

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-secondary/30 border-b border-border">
          <div className="container mx-auto px-4 py-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              All Recipes
            </h1>
            <p className="text-muted-foreground mt-2">
              Discover {recipes.length} delicious recipes from around the world
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 bg-card rounded-xl border border-border p-6">
                <h2 className="font-display text-lg font-semibold mb-6">
                  Filters
                </h2>
                <RecipeFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCuisine={selectedCuisine}
                  onCuisineChange={setSelectedCuisine}
                  selectedMealType={selectedMealType}
                  onMealTypeChange={setSelectedMealType}
                  selectedDifficulty={selectedDifficulty}
                  onDifficultyChange={setSelectedDifficulty}
                  onClearFilters={clearFilters}
                />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filters Button */}
              <div className="lg:hidden mb-6 flex items-center justify-between gap-4">
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                      {activeFilterCount > 0 && (
                        <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                          {activeFilterCount}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:max-w-md">
                    <SheetHeader>
                      <SheetTitle className="font-display">Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <RecipeFilters
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        selectedCuisine={selectedCuisine}
                        onCuisineChange={setSelectedCuisine}
                        selectedMealType={selectedMealType}
                        onMealTypeChange={setSelectedMealType}
                        selectedDifficulty={selectedDifficulty}
                        onDifficultyChange={setSelectedDifficulty}
                        onClearFilters={clearFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                <p className="text-sm text-muted-foreground">
                  {filteredRecipes.length} recipe{filteredRecipes.length !== 1 && 's'}
                </p>
              </div>

              {/* Results Count - Desktop */}
              <div className="hidden lg:flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredRecipes.length} of {recipes.length} recipes
                </p>
                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="gap-1"
                  >
                    <X className="h-4 w-4" />
                    Clear filters
                  </Button>
                )}
              </div>

              {/* Recipe Grid */}
              <RecipeGrid recipes={filteredRecipes} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
