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
    <>
      {/* Mobile Toggle Button - Only visible when collapsed on mobile */}
      {isCollapsed && (
        <button
          onClick={onToggleCollapse}
          className="fixed top-20 left-4 z-40 wire-button p-2 sm:hidden"
          aria-label="Open sidebar"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      {/* Mobile Backdrop - Only visible when sidebar is open on mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/20 z-20 sm:hidden"
          onClick={onToggleCollapse}
          aria-hidden="true"
        />
      )}

      <div
        className={`bg-wire-bg border-r-2 border-wire-stroke transition-all duration-300 relative z-30 h-full flex flex-col ${
          isCollapsed
            ? "w-0 sm:w-12" // Hidden on mobile, narrow on desktop
            : "w-64 sm:w-64" // Full width on both mobile and desktop when expanded
        }`}
      >
        <div
          className={`border-b-2 border-wire-stroke ${
            isCollapsed ? "p-2 sm:p-4" : "p-4"
          }`}
        >
          <button
            onClick={onToggleCollapse}
            className={`wire-button p-2 flex items-center justify-center ${
              isCollapsed ? "w-8 sm:w-full" : "w-full"
            }`}
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
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 pb-2">
              <h3 className="font-semibold text-wire-stroke mb-4">
                Subcategories
              </h3>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
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
    </>
  );
}
