import React from 'react';
import { Clock, ChefHat, Sparkles } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
  // 根據難度決定顏色
  const difficultyColor = recipe.difficulty === '簡單' ? 'text-green-400 bg-green-400/10' : 
                         recipe.difficulty === '中等' ? 'text-orange-400 bg-orange-400/10' : 'text-red-400 bg-red-400/10';

  return (
    <div className="group relative overflow-hidden bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] transition-all duration-500 hover:border-indigo-500/50 hover:translate-y-[-8px]">
      {/* 裝飾性背景光暈 */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">
            {recipe.name}
          </h3>
          <Sparkles className="text-indigo-500/40 group-hover:text-indigo-400 group-hover:rotate-12 transition-all" size={20} />
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
            <Clock size={14} /> {recipe.time}
          </div>
          <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter ${difficultyColor}`}>
            {recipe.difficulty}
          </div>
        </div>

        <p className="text-zinc-500 text-sm leading-relaxed mb-8 line-clamp-2 italic">
          "{recipe.description}"
        </p>

        <div className="flex flex-wrap gap-2">
          {recipe.ingredients.map(i => (
            <span key={i} className="px-3 py-1 bg-zinc-800/50 text-zinc-400 text-[10px] rounded-lg border border-white/5">
              {i}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;