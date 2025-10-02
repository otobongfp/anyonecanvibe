"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Fuse from "fuse.js";
import { PromptItem } from "@/types";

interface SearchBarProps {
  items: PromptItem[];
  onSearchResults: (results: PromptItem[]) => void;
  placeholder?: string;
}

export default function SearchBar({
  items,
  onSearchResults,
  placeholder = "Search components...",
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [fuse, setFuse] = useState<Fuse<PromptItem> | null>(null);

  // Initialize Fuse.js
  useEffect(() => {
    const fuseOptions = {
      keys: [
        { name: "title", weight: 0.4 },
        { name: "description", weight: 0.3 },
        { name: "subcategory", weight: 0.2 },
        { name: "category", weight: 0.1 },
      ],
      threshold: 0.3, // Lower = more strict matching
      includeScore: true,
      includeMatches: true,
    };

    setFuse(new Fuse(items, fuseOptions));
  }, [items]);

  // Handle search
  useEffect(() => {
    if (!fuse) return;

    if (searchTerm.trim() === "") {
      onSearchResults(items);
      return;
    }

    const results = fuse.search(searchTerm);
    const searchResults = results.map((result) => result.item);
    onSearchResults(searchResults);
  }, [searchTerm, fuse, items, onSearchResults]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="wire-input w-full px-4 py-3 text-sm"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-wire-stroke/10 rounded"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-wire-stroke/60" />
          </button>
        )}
      </div>

      {searchTerm && (
        <div className="mt-2 text-sm text-wire-stroke/60">
          {searchTerm.trim() === "" ? (
            <span>Showing all components</span>
          ) : (
            <span>Search results for "{searchTerm}"</span>
          )}
        </div>
      )}
    </div>
  );
}
