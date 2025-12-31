import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Recipe, sampleRecipes } from '@/lib/recipes';

interface RecipeContextType {
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt'>) => void;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
  getRecipeById: (id: string) => Recipe | undefined;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

const STORAGE_KEY = 'culinary-compass-recipes';

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : sampleRecipes;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipeData: Omit<Recipe, 'id' | 'createdAt'>) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setRecipes((prev) => [newRecipe, ...prev]);
  };

  const updateRecipe = (id: string, recipeData: Partial<Recipe>) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === id ? { ...recipe, ...recipeData } : recipe
      )
    );
  };

  const deleteRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  const getRecipeById = (id: string) => {
    return recipes.find((recipe) => recipe.id === id);
  };

  return (
    <RecipeContext.Provider
      value={{ recipes, addRecipe, updateRecipe, deleteRecipe, getRecipeById }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
}
