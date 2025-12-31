import { useState } from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Recipe } from '@/lib/recipes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface RecipeTableProps {
  recipes: Recipe[];
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
}

export function RecipeTable({ recipes, onEdit, onDelete }: RecipeTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Cuisine</TableHead>
              <TableHead className="hidden md:table-cell">Meal Type</TableHead>
              <TableHead className="hidden sm:table-cell">Difficulty</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipes.map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-16 h-12 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=100&auto=format&fit=crop';
                    }}
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground line-clamp-1">
                      {recipe.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {recipe.prepTime + recipe.cookTime} min • {recipe.servings} servings
                    </p>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="secondary">{recipe.cuisine}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline">{recipe.mealType}</Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
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
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button asChild variant="ghost" size="icon">
                      <Link to={`/recipes/${recipe.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(recipe)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(recipe.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Recipe</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this recipe? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
