"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  subcategories: string[];
  selectedSubcategory: string;
  onSubcategorySelect: (subcategory: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({
  subcategories,
  selectedSubcategory,
  onSubcategorySelect,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <div
      className={`bg-wire-bg border-r-2 border-wire-stroke transition-all duration-300 ${
        isCollapsed ? "w-12" : "w-64"
      }`}
    >
      <div className="p-4 border-b-2 border-wire-stroke">
        <button
          onClick={onToggleCollapse}
          className="wire-button p-2 w-full flex items-center justify-center"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {!isCollapsed && (
        <div className="p-4">
          <h3 className="font-semibold text-wire-stroke mb-4">Subcategories</h3>
          <nav className="space-y-2">
            {subcategories.map((subcategory) => (
              <button
                key={subcategory}
                onClick={() => onSubcategorySelect(subcategory)}
                className={`w-full text-left px-3 py-2 border-2 transition-all duration-200 ${
                  selectedSubcategory === subcategory
                    ? "border-wire-accent bg-wire-accent/10 text-wire-accent"
                    : "border-wire-stroke/30 text-wire-stroke hover:border-wire-stroke"
                }`}
              >
                {subcategory}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
