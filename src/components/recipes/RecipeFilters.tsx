import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cuisines, mealTypes, difficulties } from '@/lib/recipes';

interface RecipeFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCuisine: string;
  onCuisineChange: (value: string) => void;
  selectedMealType: string;
  onMealTypeChange: (value: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (value: string) => void;
  onClearFilters: () => void;
}

export function RecipeFilters({
  searchQuery,
  onSearchChange,
  selectedCuisine,
  onCuisineChange,
  selectedMealType,
  onMealTypeChange,
  selectedDifficulty,
  onDifficultyChange,
  onClearFilters,
}: RecipeFiltersProps) {
  const hasActiveFilters =
    searchQuery || selectedCuisine || selectedMealType || selectedDifficulty;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input pl-12"
        />
      </div>

      {/* Filter Groups */}
      <div className="space-y-4">
        {/* Cuisine Filter */}
        <div>
          <h3 className="text-sm font-medium mb-2 text-foreground">Cuisine</h3>
          <div className="flex flex-wrap gap-2">
            {cuisines.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() =>
                  onCuisineChange(selectedCuisine === cuisine ? '' : cuisine)
                }
                className={`category-badge ${
                  selectedCuisine === cuisine
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        {/* Meal Type Filter */}
        <div>
          <h3 className="text-sm font-medium mb-2 text-foreground">Meal Type</h3>
          <div className="flex flex-wrap gap-2">
            {mealTypes.map((mealType) => (
              <button
                key={mealType}
                onClick={() =>
                  onMealTypeChange(selectedMealType === mealType ? '' : mealType)
                }
                className={`category-badge ${
                  selectedMealType === mealType
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {mealType}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <h3 className="text-sm font-medium mb-2 text-foreground">Difficulty</h3>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() =>
                  onDifficultyChange(
                    selectedDifficulty === difficulty ? '' : difficulty
                  )
                }
                className={`category-badge ${
                  selectedDifficulty === difficulty
                    ? difficulty === 'Easy'
                      ? 'bg-accent text-accent-foreground'
                      : difficulty === 'Medium'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-destructive text-destructive-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="w-full gap-2"
        >
          <X className="h-4 w-4" />
          Clear All Filters
        </Button>
      )}
    </div>
  );
}
