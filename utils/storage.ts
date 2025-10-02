import { AppState, BucketItem } from "@/types";

const STORAGE_KEY = "anyonecanvibe-state";

const defaultState: AppState = {
  bucket: [],
  bucketVars: {
    framework: "React",
    language: "TypeScript",
    style: "Tailwind",
  },
};

/**
 * Loads app state from localStorage
 */
export function loadAppState(): AppState {
  if (typeof window === "undefined") {
    return defaultState;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultState;

    const parsed = JSON.parse(stored);
    return {
      ...defaultState,
      ...parsed,
      bucket: parsed.bucket || [],
    };
  } catch (error) {
    console.error("Failed to load app state:", error);
    return defaultState;
  }
}

/**
 * Saves app state to localStorage
 */
export function saveAppState(state: AppState): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save app state:", error);
  }
}

/**
 * Adds an item to the bucket
 */
export function addToBucket(
  currentState: AppState,
  itemId: string,
  intent: string
): AppState {
  const newBucketItem: BucketItem = {
    id: itemId,
    intent,
    primary: false,
    enabled: true,
    addedAt: Date.now(),
  };

  return {
    ...currentState,
    bucket: [...currentState.bucket, newBucketItem],
  };
}

/**
 * Updates a bucket item
 */
export function updateBucketItem(
  currentState: AppState,
  itemId: string,
  updates: Partial<BucketItem>
): AppState {
  return {
    ...currentState,
    bucket: currentState.bucket.map((item) =>
      item.id === itemId ? { ...item, ...updates } : item
    ),
  };
}

/**
 * Removes an item from the bucket
 */
export function removeFromBucket(
  currentState: AppState,
  itemId: string
): AppState {
  return {
    ...currentState,
    bucket: currentState.bucket.filter((item) => item.id !== itemId),
  };
}

/**
 * Reorders bucket items
 */
export function reorderBucketItems(
  currentState: AppState,
  newOrder: BucketItem[]
): AppState {
  return {
    ...currentState,
    bucket: newOrder,
  };
}
