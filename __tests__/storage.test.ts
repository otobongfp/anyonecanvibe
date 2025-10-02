import {
  loadAppState,
  saveAppState,
  addToBucket,
  updateBucketItem,
  removeFromBucket,
  reorderBucketItems,
} from "@/utils/storage";
import { AppState, BucketItem } from "@/types";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("storage utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("loadAppState", () => {
    it("should return default state when no stored data", () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = loadAppState();

      expect(result).toEqual({
        bucket: [],
        bucketVars: {
          framework: "React",
          language: "TypeScript",
          style: "Tailwind",
        },
      });
    });

    it("should return stored state when available", () => {
      const storedState = {
        bucket: [
          {
            id: "test",
            intent: "test",
            primary: false,
            enabled: true,
            addedAt: 1000,
          },
        ],
        bucketVars: { framework: "Vue", language: "JavaScript", style: "CSS" },
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedState));

      const result = loadAppState();

      expect(result).toEqual(storedState);
    });

    it("should return default state on parse error", () => {
      localStorageMock.getItem.mockReturnValue("invalid json");

      const result = loadAppState();

      expect(result).toEqual({
        bucket: [],
        bucketVars: {
          framework: "React",
          language: "TypeScript",
          style: "Tailwind",
        },
      });
    });
  });

  describe("saveAppState", () => {
    it("should save state to localStorage", () => {
      const state: AppState = {
        bucket: [],
        bucketVars: {
          framework: "React",
          language: "TypeScript",
          style: "Tailwind",
        },
      };

      saveAppState(state);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "anyonecanvibe-state",
        JSON.stringify(state)
      );
    });
  });

  describe("addToBucket", () => {
    it("should add new item to bucket", () => {
      const currentState: AppState = {
        bucket: [],
        bucketVars: {
          framework: "React",
          language: "TypeScript",
          style: "Tailwind",
        },
      };

      const result = addToBucket(currentState, "test-item", "test intent");

      expect(result.bucket).toHaveLength(1);
      expect(result.bucket[0]).toMatchObject({
        id: "test-item",
        intent: "test intent",
        primary: false,
        enabled: true,
      });
      expect(result.bucket[0].addedAt).toBeGreaterThan(0);
    });

    it("should preserve existing bucket items", () => {
      const existingItem: BucketItem = {
        id: "existing",
        intent: "existing intent",
        primary: false,
        enabled: true,
        addedAt: 1000,
      };

      const currentState: AppState = {
        bucket: [existingItem],
        bucketVars: {
          framework: "React",
          language: "TypeScript",
          style: "Tailwind",
        },
      };

      const result = addToBucket(currentState, "new-item", "new intent");

      expect(result.bucket).toHaveLength(2);
      expect(result.bucket[0]).toEqual(existingItem);
      expect(result.bucket[1].id).toBe("new-item");
    });
  });

  describe("updateBucketItem", () => {
    it("should update existing bucket item", () => {
      const item: BucketItem = {
        id: "test",
        intent: "original intent",
        primary: false,
        enabled: true,
        addedAt: 1000,
      };

      const currentState: AppState = {
        bucket: [item],
        bucketVars: {
          framework: "React",
          language: "TypeScript",
          style: "Tailwind",
        },
      };

      const result = updateBucketItem(currentState, "test", {
        intent: "updated intent",
        primary: true,
      });

      expect(result.bucket[0]).toMatchObject({
        id: "test",
        intent: "updated intent",
        primary: true,
        enabled: true,
        addedAt: 1000,
      });
    });

    it("should not modify other items", () => {
      const item1: BucketItem = {
        id: "item1",
        intent: "intent1",
        primary: false,
        enabled: true,
        addedAt: 1000,
      };
      const item2: BucketItem = {
        id: "item2",
        intent: "intent2",
        primary: false,
        enabled: true,
        addedAt: 2000,
      };

      const currentState: AppState = {
        bucket: [item1, item2],
        bucketVars: {
          framework: "React",
          language: "TypeScript",
          style: "Tailwind",
        },
      };

      const result = updateBucketItem(currentState, "item1", {
        intent: "updated",
      });

      expect(result.bucket[0].intent).toBe("updated");
      expect(result.bucket[1]).toEqual(item2);
    });
  });

  describe("removeFromBucket", () => {
    it("should remove item from bucket", () => {
      const item1: BucketItem = {
        id: "item1",
        intent: "intent1",
        primary: false,
        enabled: true,
        addedAt: 1000,
      };
      const item2: BucketItem = {
        id: "item2",
        intent: "intent2",
        primary: false,
        enabled: true,
        addedAt: 2000,
      };

      const currentState: AppState = {
        bucket: [item1, item2],
        bucketVars: {
          framework: "React",
          language: "TypeScript",
          style: "Tailwind",
        },
      };

      const result = removeFromBucket(currentState, "item1");

      expect(result.bucket).toHaveLength(1);
      expect(result.bucket[0]).toEqual(item2);
    });

    it("should handle removing non-existent item", () => {
      const currentState: AppState = {
        bucket: [],
        bucketVars: {
          framework: "React",
          language: "TypeScript",
          style: "Tailwind",
        },
      };

      const result = removeFromBucket(currentState, "non-existent");

      expect(result.bucket).toHaveLength(0);
    });
  });

  describe("reorderBucketItems", () => {
    it("should reorder bucket items", () => {
      const item1: BucketItem = {
        id: "item1",
        intent: "intent1",
        primary: false,
        enabled: true,
        addedAt: 1000,
      };
      const item2: BucketItem = {
        id: "item2",
        intent: "intent2",
        primary: false,
        enabled: true,
        addedAt: 2000,
      };

      const currentState: AppState = {
        bucket: [item1, item2],
        bucketVars: {
          framework: "React",
          language: "TypeScript",
          style: "Tailwind",
        },
      };

      const result = reorderBucketItems(currentState, [item2, item1]);

      expect(result.bucket[0]).toEqual(item2);
      expect(result.bucket[1]).toEqual(item1);
    });
  });
});
