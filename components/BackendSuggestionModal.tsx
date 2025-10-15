"use client";

import { useState } from "react";
import { X, Search, Lightbulb, CheckCircle } from "lucide-react";
import { PromptItem } from "@/types";
import { findMatchingBackendComponents, getComponentDescription } from "@/utils/backendMatching";

interface BackendSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToBucket: (item: PromptItem, intent: string) => void;
  promptItems: PromptItem[];
}

export default function BackendSuggestionModal({
  isOpen,
  onClose,
  onAddToBucket,
  promptItems,
}: BackendSuggestionModalProps) {
  const [userIntent, setUserIntent] = useState("");
  const [suggestedComponents, setSuggestedComponents] = useState<PromptItem[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const handleSearch = () => {
    if (userIntent.trim()) {
      const matches = findMatchingBackendComponents(userIntent, promptItems);
      setSuggestedComponents(matches);
    }
  };

  const handleComponentToggle = (componentId: string) => {
    const newSelected = new Set(selectedComponents);
    if (newSelected.has(componentId)) {
      newSelected.delete(componentId);
    } else {
      newSelected.add(componentId);
    }
    setSelectedComponents(newSelected);
  };

  const handleAddSelected = () => {
    selectedComponents.forEach((componentId) => {
      const component = suggestedComponents.find((c) => c.id === componentId);
      if (component) {
        onAddToBucket(component, userIntent);
      }
    });
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[90] p-2 sm:p-4">
      <div className="bg-wire-bg border-2 border-wire-stroke max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-3 sm:p-4 border-b-2 border-wire-stroke flex items-center justify-between">
          <h2 className="text-xl font-semibold text-wire-stroke flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-wire-accent" />
            <span>What do you want to build?</span>
          </h2>
          <button
            onClick={onClose}
            className="wire-button p-2"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-6">
            {/* Search Input */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-wire-stroke mb-2">
                  Describe what you want to build
                </h3>
                <p className="text-wire-stroke/70 text-sm mb-4">
                  Tell us about your project in plain English. We'll suggest the right backend components for you.
                </p>
              </div>

              <div className="flex space-x-3">
                <input
                  type="text"
                  value={userIntent}
                  onChange={(e) => setUserIntent(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., 'I want to build an e-commerce site where users can register, browse products, and make purchases'"
                  className="wire-input flex-1"
                />
                <button
                  onClick={handleSearch}
                  className="wire-button flex items-center space-x-2 px-4"
                >
                  <Search className="h-4 w-4" />
                  <span>Find Components</span>
                </button>
              </div>
            </div>

            {/* Example Intents */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-wire-stroke">
                Popular examples:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Build a user registration and login system",
                  "Create an e-commerce store with payments",
                  "Set up a blog with user comments",
                  "Build a file sharing platform",
                  "Create a team collaboration tool",
                  "Set up a subscription service"
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setUserIntent(example);
                      setUserIntent(example);
                    }}
                    className="wire-card text-left p-3 hover:bg-wire-stroke/5 transition-colors"
                  >
                    <p className="text-sm text-wire-stroke/80">{example}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested Components */}
            {suggestedComponents.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-wire-stroke">
                    Suggested Components ({suggestedComponents.length})
                  </h3>
                  {selectedComponents.size > 0 && (
                    <button
                      onClick={handleAddSelected}
                      className="wire-button flex items-center space-x-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Add Selected ({selectedComponents.size})</span>
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {suggestedComponents.map((component) => (
                    <div
                      key={component.id}
                      className={`wire-card p-4 cursor-pointer transition-all ${
                        selectedComponents.has(component.id)
                          ? "bg-wire-accent/10 border-wire-accent"
                          : "hover:bg-wire-stroke/5"
                      }`}
                      onClick={() => handleComponentToggle(component.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <input
                            type="checkbox"
                            checked={selectedComponents.has(component.id)}
                            onChange={() => handleComponentToggle(component.id)}
                            className="w-4 h-4 text-wire-accent"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-wire-stroke mb-1">
                            {component.title}
                          </h4>
                          <p className="text-sm text-wire-stroke/70 mb-2">
                            {getComponentDescription(component)}
                          </p>
                          {component.business_intents && (
                            <div className="flex flex-wrap gap-1">
                              {component.business_intents.slice(0, 3).map((intent, index) => (
                                <span
                                  key={index}
                                  className="text-xs bg-wire-stroke/10 text-wire-stroke/70 px-2 py-1 rounded"
                                >
                                  {intent}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {userIntent && suggestedComponents.length === 0 && (
              <div className="text-center py-8">
                <p className="text-wire-stroke/60 mb-4">
                  No specific backend components found for your request.
                </p>
                <p className="text-sm text-wire-stroke/50">
                  Try describing your project in more detail, or browse the Backend / Database category manually.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
