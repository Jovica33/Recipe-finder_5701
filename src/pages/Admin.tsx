import { useState } from 'react';
import { Plus, ChefHat } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { RecipeForm } from '@/components/admin/RecipeForm';
import { RecipeTable } from '@/components/admin/RecipeTable';
import { useRecipes } from '@/context/RecipeContext';
import { Recipe } from '@/lib/recipes';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function Admin() {
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipes();
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  const handleAddRecipe = (data: Omit<Recipe, 'id' | 'createdAt'>) => {
    addRecipe(data);
    setIsFormOpen(false);
    toast({
      title: 'Recipe Added',
      description: 'Your new recipe has been successfully added.',
    });
  };

  const handleUpdateRecipe = (data: Omit<Recipe, 'id' | 'createdAt'>) => {
    if (editingRecipe) {
      updateRecipe(editingRecipe.id, data);
      setEditingRecipe(null);
      toast({
        title: 'Recipe Updated',
        description: 'Your recipe has been successfully updated.',
      });
    }
  };

  const handleDeleteRecipe = (id: string) => {
    deleteRecipe(id);
    toast({
      title: 'Recipe Deleted',
      description: 'The recipe has been removed.',
      variant: 'destructive',
    });
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-secondary/30 border-b border-border">
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
                  <ChefHat className="h-8 w-8 text-primary" />
                  Admin Panel
                </h1>
                <p className="text-muted-foreground mt-2">
                  Manage your recipes collection
                </p>
              </div>
              <Button onClick={() => setIsFormOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Recipe
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          {recipes.length === 0 ? (
            <div className="text-center py-16">
              <ChefHat className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">
                No Recipes Yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start by adding your first recipe to the collection.
              </p>
              <Button onClick={() => setIsFormOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Recipe
              </Button>
            </div>
          ) : (
            <RecipeTable
              recipes={recipes}
              onEdit={handleEdit}
              onDelete={handleDeleteRecipe}
            />
          )}
        </div>

        {/* Add Recipe Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">
                Add New Recipe
              </DialogTitle>
            </DialogHeader>
            <RecipeForm
              onSubmit={handleAddRecipe}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Recipe Dialog */}
        <Dialog open={!!editingRecipe} onOpenChange={() => setEditingRecipe(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">
                Edit Recipe
              </DialogTitle>
            </DialogHeader>
            {editingRecipe && (
              <RecipeForm
                recipe={editingRecipe}
                onSubmit={handleUpdateRecipe}
                onCancel={() => setEditingRecipe(null)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
