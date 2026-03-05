import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, selectedIngredients }) => {
  // 嚴格合成邏輯：選中的標籤必須「包含」食譜要求的所有食材
  const filteredRecipes = recipes.filter(recipe => {
    if (selectedIngredients.length === 0) return false;
    return recipe.ingredients.every(ing => selectedIngredients.includes(ing));
  });

  return (
    <div className="w-full">
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center bg-zinc-900/20 border border-dashed border-zinc-800 rounded-[2.5rem]">
          <div className="text-5xl mb-6 opacity-30">✨</div>
          <p className="text-zinc-500 font-light tracking-[0.2em]">
            {selectedIngredients.length === 0 
              ? "點擊上方食材來合成料理" 
              : "還差一點點就能合成出新料理了！"}
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipeList;