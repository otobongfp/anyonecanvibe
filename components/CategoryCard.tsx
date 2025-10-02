"use client";

import { Category } from "@/types";
import { ArrowRight, Lock } from "lucide-react";

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  const isDisabled = !category.active;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`wire-card w-full text-left transition-all duration-200 ${
        isDisabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:scale-105 cursor-pointer"
      }`}
      aria-label={`${category.name} category`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold text-wire-stroke">
          {category.name}
        </h3>
        {isDisabled ? (
          <Lock className="h-5 w-5 text-wire-stroke/50" />
        ) : (
          <ArrowRight className="h-5 w-5 text-wire-accent" />
        )}
      </div>

      <p className="text-wire-stroke/70 mb-4">{category.description}</p>

      <div className="flex flex-wrap gap-2">
        {category.subcategories.slice(0, 3).map((subcategory) => (
          <span
            key={subcategory}
            className="px-2 py-1 text-xs border border-wire-stroke/30 text-wire-stroke/70"
          >
            {subcategory}
          </span>
        ))}
        {category.subcategories.length > 3 && (
          <span className="px-2 py-1 text-xs border border-wire-stroke/30 text-wire-stroke/70">
            +{category.subcategories.length - 3} more
          </span>
        )}
      </div>
    </button>
  );
}
