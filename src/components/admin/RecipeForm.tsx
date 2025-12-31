import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cuisines, mealTypes, difficulties, Recipe } from '@/lib/recipes';

const recipeSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.string().url('Please enter a valid image URL'),
  cuisine: z.string().min(1, 'Please select a cuisine'),
  mealType: z.string().min(1, 'Please select a meal type'),
  prepTime: z.coerce.number().min(1, 'Prep time is required'),
  cookTime: z.coerce.number().min(0, 'Cook time is required'),
  servings: z.coerce.number().min(1, 'Servings is required'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

interface RecipeFormProps {
  recipe?: Recipe;
  onSubmit: (data: Omit<Recipe, 'id' | 'createdAt'>) => void;
  onCancel?: () => void;
}

export function RecipeForm({ recipe, onSubmit, onCancel }: RecipeFormProps) {
  const [ingredients, setIngredients] = useState<string[]>(
    recipe?.ingredients || ['']
  );
  const [instructions, setInstructions] = useState<string[]>(
    recipe?.instructions || ['']
  );

  const form = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: recipe?.title || '',
      description: recipe?.description || '',
      image: recipe?.image || '',
      cuisine: recipe?.cuisine || '',
      mealType: recipe?.mealType || '',
      prepTime: recipe?.prepTime || 15,
      cookTime: recipe?.cookTime || 30,
      servings: recipe?.servings || 4,
      difficulty: recipe?.difficulty || 'Medium',
    },
  });

  const handleFormSubmit = (data: RecipeFormData) => {
    const filteredIngredients = ingredients.filter((i) => i.trim() !== '');
    const filteredInstructions = instructions.filter((i) => i.trim() !== '');

    if (filteredIngredients.length === 0) {
      alert('Please add at least one ingredient');
      return;
    }

    if (filteredInstructions.length === 0) {
      alert('Please add at least one instruction');
      return;
    }

    const recipeData: Omit<Recipe, 'id' | 'createdAt'> = {
      title: data.title,
      description: data.description,
      image: data.image,
      cuisine: data.cuisine,
      mealType: data.mealType,
      prepTime: data.prepTime,
      cookTime: data.cookTime,
      servings: data.servings,
      difficulty: data.difficulty,
      ingredients: filteredIngredients,
      instructions: filteredInstructions,
    };
    
    onSubmit(recipeData);
  };

  const addIngredient = () => setIngredients([...ingredients, '']);
  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };
  const updateIngredient = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addInstruction = () => setInstructions([...instructions, '']);
  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };
  const updateInstruction = (index: number, value: string) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Recipe Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Classic Margherita Pizza" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A brief description of your recipe..."
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cuisine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuisine</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cuisine" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cuisines.map((cuisine) => (
                      <SelectItem key={cuisine} value={cuisine}>
                        {cuisine}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mealType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meal Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mealTypes.map((mealType) => (
                      <SelectItem key={mealType} value={mealType}>
                        {mealType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="servings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Servings</FormLabel>
                <FormControl>
                  <Input type="number" min="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prepTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prep Time (minutes)</FormLabel>
                <FormControl>
                  <Input type="number" min="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cookTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cook Time (minutes)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Ingredients */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Ingredients</h3>
            <Button type="button" variant="outline" size="sm" onClick={addIngredient}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  placeholder={`Ingredient ${index + 1}`}
                  className="flex-1"
                />
                {ingredients.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeIngredient(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Instructions</h3>
            <Button type="button" variant="outline" size="sm" onClick={addInstruction}>
              <Plus className="h-4 w-4 mr-1" />
              Add Step
            </Button>
          </div>
          <div className="space-y-2">
            {instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2">
                <span className="flex items-center justify-center w-8 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium shrink-0">
                  {index + 1}
                </span>
                <Textarea
                  value={instruction}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  placeholder={`Step ${index + 1} instructions...`}
                  rows={2}
                  className="flex-1"
                />
                {instructions.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeInstruction(index)}
                    className="shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4 border-t border-border">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" className="gap-2">
            <Save className="h-4 w-4" />
            {recipe ? 'Update Recipe' : 'Save Recipe'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
