"use client";

import { useState } from "react";
import { PromptItem } from "@/types";
import { Plus, Check, Eye } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface PromptCardProps {
  item: PromptItem;
  onAdd: (itemId: string, intent: string) => void;
  isAdded?: boolean;
  onPreview?: (item: PromptItem) => void;
}

export default function PromptCard({
  item,
  onAdd,
  isAdded = false,
  onPreview,
}: PromptCardProps) {
  const [showIntentInput, setShowIntentInput] = useState(false);
  const [intent, setIntent] = useState("");

  const IconComponent = item.icon ? (LucideIcons as any)[item.icon] : Plus;

  const handleAdd = () => {
    if (intent.trim()) {
      onAdd(item.id, intent.trim());
      setIntent("");
      setShowIntentInput(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    } else if (e.key === "Escape") {
      setShowIntentInput(false);
      setIntent("");
    }
  };

  return (
    <div className="wire-card relative">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 border-2 border-wire-stroke">
            <IconComponent className="h-5 w-5 text-wire-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-wire-stroke">{item.title}</h3>
            <p className="text-sm text-wire-stroke/70">{item.subcategory}</p>
          </div>
        </div>

        {!isAdded && (
          <button
            onClick={() => setShowIntentInput(true)}
            className="bg-wire-accent text-wire-bg border-2 border-wire-accent p-2 hover:bg-wire-accent/80 transition-all duration-200"
            aria-label={`Add ${item.title} to bucket`}
            title="Add to bucket"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}

        {isAdded && (
          <div
            className="p-2 border-2 border-wire-accent bg-wire-accent/10"
            title="Added to bucket"
          >
            <Check className="h-4 w-4 text-wire-accent" />
          </div>
        )}
      </div>

      <p className="text-wire-stroke/80 text-sm mb-4">{item.description}</p>

      {/* Action Buttons */}
      <div className="flex justify-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onPreview?.(item);
          }}
          className="wire-button p-2"
          aria-label="Show preview"
          title="Preview component"
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>

      {showIntentInput && (
        <div className="absolute inset-0 bg-wire-bg border-2 border-wire-stroke p-4 z-10">
          <h4 className="font-semibold mb-2">
            How will you use this component?
          </h4>
          <input
            type="text"
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="e.g., Showing testimonials on product page"
            className="wire-input w-full mb-3"
            autoFocus
          />
          <div className="flex space-x-2">
            <button
              onClick={handleAdd}
              disabled={!intent.trim()}
              className="wire-button flex-1"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setShowIntentInput(false);
                setIntent("");
              }}
              className="wire-button flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
