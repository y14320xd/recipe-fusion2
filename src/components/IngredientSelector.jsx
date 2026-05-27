import React from 'react';
import { X } from 'lucide-react';
import { ingredientsData } from '../data/recipes'; 

const IngredientSelector = ({ selectedIngredients, onToggleIngredient, onClearAll }) => {
  return (
    <div className="space-y-12 w-full">
      {ingredientsData.map((group) => (
        <div key={group.category} className="flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6 w-full justify-center opacity-60">
            <div className="h-[1px] w-12 bg-zinc-700"></div>
            <span className="text-xs font-bold text-zinc-400 tracking-[0.2em] uppercase">
              {group.category}
            </span>
            <div className="h-[1px] w-12 bg-zinc-700"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {group.items.map(ingredient => (
              <button
                key={ingredient}
                onClick={() => onToggleIngredient(ingredient)}
                className={`
                  px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform active:scale-95
                  ${selectedIngredients.includes(ingredient)
                    ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] scale-110'
                    : 'bg-zinc-800/40 text-zinc-400 border border-white/5 hover:border-indigo-500/30 hover:text-zinc-100'}
                `}
              >
                {ingredient}
              </button>
            ))}
          </div>
        </div>
      ))}

      {selectedIngredients.length > 0 && (
        <div className="pt-8 border-t border-white/5 flex justify-center">
          <button 
            onClick={onClearAll}
            className="flex items-center gap-2 text-xs text-zinc-500 hover:text-indigo-400 transition-colors group"
          >
            <X size={14} className="group-hover:rotate-90 transition-transform" />
            清除已選 ({selectedIngredients.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default IngredientSelector;