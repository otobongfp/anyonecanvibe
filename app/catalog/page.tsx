"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, HelpCircle } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import UsageGuide from "@/components/UsageGuide";
import { PromptItem, BucketItem, Category, AppState } from "@/types";
import {
  loadAppState,
  saveAppState,
  addToBucket,
  updateBucketItem,
  removeFromBucket,
  reorderBucketItems,
} from "@/utils/storage";
import { composePrompt, createConcisePrompt } from "@/utils/composePrompt";
import { openInNewTab } from "@/utils/clipboard";
import PromptCard from "@/components/PromptCard";
import CategoryCard from "@/components/CategoryCard";
import Sidebar from "@/components/Sidebar";
import BucketPanel from "@/components/BucketPanel";
import ComposeModal from "@/components/ComposeModal";
import PreviewModal from "@/components/PreviewModal";
import SearchBar from "@/components/SearchBar";

// Import seed data
import seedPromptItems from "@/data/seedPromptItems.json";
import categories from "@/data/categories.json";

export default function CatalogPage() {
  const [appState, setAppState] = useState<AppState>({
    bucket: [],
    bucketVars: {
      framework: "React",
      language: "TypeScript",
      style: "Tailwind",
    },
  });
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<string>("Components");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [bucketOpen, setBucketOpen] = useState(false);
  const [composeModalOpen, setComposeModalOpen] = useState(false);
  const [composeResult, setComposeResult] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<"categories" | "components">("categories");
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<PromptItem | null>(null);
  const [searchResults, setSearchResults] = useState<PromptItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [usageGuideOpen, setUsageGuideOpen] = useState(false);

  const promptItems = seedPromptItems as PromptItem[];
  const categoryData = categories as Category[];

  useEffect(() => {
    setMounted(true);
    const savedState = loadAppState();
    setAppState(savedState);
  }, []);

  useEffect(() => {
    if (mounted) {
      saveAppState(appState);
    }
  }, [appState, mounted]);

  const handleAddToBucket = (itemId: string, intent: string) => {
    const newState = addToBucket(appState, itemId, intent);
    setAppState(newState);
    setBucketOpen(true);
  };

  const handleUpdateBucketItem = (
    itemId: string,
    updates: Partial<BucketItem>
  ) => {
    const newState = updateBucketItem(appState, itemId, updates);
    setAppState(newState);
  };

  const handleRemoveFromBucket = (itemId: string) => {
    const newState = removeFromBucket(appState, itemId);
    setAppState(newState);
  };

  const handleReorderBucketItems = (newOrder: BucketItem[]) => {
    const newState = reorderBucketItems(appState, newOrder);
    setAppState(newState);
  };

  const handleComposePrompt = () => {
    const enabledItems = appState.bucket.filter((item) => item.enabled);
    if (enabledItems.length === 0) return;

    const result = composePrompt(
      enabledItems,
      promptItems,
      appState.bucketVars
    );
    setComposeResult(result);
    setComposeModalOpen(true);
  };

  const handleCopyAndOpenChat = () => {
    // Open ChatGPT in new tab
    openInNewTab("https://chat.openai.com");
  };

  const handleCategorySelect = (category: Category) => {
    if (category.active) {
      setSelectedCategory(category);
      setSelectedSubcategory(category.subcategories[0] || "Components");
      setView("components");
    }
  };

  const handleBackToCategories = () => {
    setView("categories");
    setSelectedCategory(null);
  };

  const handlePreviewItem = (item: PromptItem) => {
    setPreviewItem(item);
    setPreviewModalOpen(true);
  };

  const handleSearchResults = (results: PromptItem[]) => {
    setSearchResults(results);
    setIsSearching(results.length !== promptItems.length);
  };

  const filteredItems = selectedCategory
    ? (isSearching ? searchResults : promptItems).filter(
        (item) =>
          item.category === selectedCategory.name &&
          item.subcategory === selectedSubcategory
      )
    : [];

  const bucketItemIds = new Set(appState.bucket.map((item) => item.id));

  if (!mounted) {
    return (
      <div className="min-h-screen bg-wire-bg flex items-center justify-center">
        <div className="animate-pulse text-wire-stroke text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wire-bg">
      {/* Header */}
      <header className="border-b-2 border-wire-stroke">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="wire-button p-2"
                aria-label="Back to home"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-wire-accent" />
                <h1 className="text-xl font-bold text-wire-stroke font-condensed">
                  anyonecanvibe
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setUsageGuideOpen(true)}
                className="wire-button flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
                aria-label="Open usage guide"
              >
                <HelpCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Usage Guide</span>
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {view === "categories" ? (
          /* Categories Grid View */
          <div className="flex-1 p-6 overflow-y-auto main-content">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-wire-stroke mb-2">
                  Choose a Category
                </h2>
                <p className="text-wire-stroke/70 mb-6">
                  Select a category to browse available components and templates
                </p>

                {/* Global Search */}
                <div className="mb-8">
                  <SearchBar
                    items={promptItems}
                    onSearchResults={(results) => {
                      if (results.length < promptItems.length) {
                        // If search has results, switch to components view with first category
                        const firstCategory = categoryData.find(
                          (c) => c.active
                        );
                        if (firstCategory) {
                          setSelectedCategory(firstCategory);
                          setSelectedSubcategory(
                            firstCategory.subcategories[0] || "Components"
                          );
                          setView("components");
                          setSearchResults(results);
                          setIsSearching(true);
                        }
                      }
                    }}
                    placeholder="Search all components..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryData.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onClick={() => handleCategorySelect(category)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Components View */
          <div className="flex-1 flex">
            {/* Subcategories Sidebar */}
            {selectedCategory && (
              <Sidebar
                subcategories={selectedCategory.subcategories}
                selectedSubcategory={selectedSubcategory}
                onSubcategorySelect={setSelectedSubcategory}
                isCollapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              />
            )}

            {/* Prompt Items Grid */}
            <div className="flex-1 p-6 overflow-y-auto main-content">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <button
                    onClick={handleBackToCategories}
                    className="wire-button p-2 mr-4"
                    aria-label="Back to categories"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-wire-stroke mb-1">
                      {selectedCategory?.name}
                    </h2>
                    <p className="text-wire-stroke/70">
                      {selectedSubcategory} • {filteredItems.length} items
                    </p>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                  <SearchBar
                    items={promptItems}
                    onSearchResults={handleSearchResults}
                    placeholder="Search components..."
                  />
                </div>
              </div>

              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <PromptCard
                      key={item.id}
                      item={item}
                      onAdd={handleAddToBucket}
                      isAdded={bucketItemIds.has(item.id)}
                      onPreview={handlePreviewItem}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-wire-stroke/60">
                    No items found for {selectedSubcategory}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bucket Panel */}
      <BucketPanel
        bucketItems={appState.bucket}
        promptItems={promptItems}
        onUpdateItem={handleUpdateBucketItem}
        onRemoveItem={handleRemoveFromBucket}
        onReorderItems={handleReorderBucketItems}
        onComposePrompt={handleComposePrompt}
        isOpen={bucketOpen}
        onToggle={() => setBucketOpen(!bucketOpen)}
      />

      {/* Compose Modal */}
      <ComposeModal
        isOpen={composeModalOpen}
        onClose={() => setComposeModalOpen(false)}
        composeResult={composeResult}
        onCopyAndOpenChat={handleCopyAndOpenChat}
      />

      {/* Preview Modal */}
      {previewItem && (
        <PreviewModal
          isOpen={previewModalOpen}
          onClose={() => {
            setPreviewModalOpen(false);
            setPreviewItem(null);
          }}
          item={previewItem}
          onAddToBucket={(item, intent) => {
            handleAddToBucket(item.id, intent);
          }}
          isAdded={bucketItemIds.has(previewItem.id)}
        />
      )}

      {/* Usage Guide Modal */}
      <UsageGuide
        isOpen={usageGuideOpen}
        onClose={() => setUsageGuideOpen(false)}
      />
    </div>
  );
}
