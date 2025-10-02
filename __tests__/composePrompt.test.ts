import { composePrompt, createConcisePrompt } from "@/utils/composePrompt";
import { PromptItem, BucketItem } from "@/types";

describe("composePrompt", () => {
  const mockPromptItems: PromptItem[] = [
    {
      id: "product-card",
      title: "Product Card",
      category: "UI / Frontend",
      subcategory: "Components",
      description: "Responsive product card",
      template:
        "Create a responsive [framework] product card with image, title, price, and an 'Add to cart' button. Use [style]. Props: { id, imageUrl, title, price, onAdd }. Make accessible with aria labels.",
      variables: ["framework", "style"],
      icon: "ShoppingBag",
    },
    {
      id: "testimonial-carousel",
      title: "Testimonial Carousel",
      category: "UI / Frontend",
      subcategory: "Components",
      description: "Accessible testimonial carousel",
      template:
        "A testimonial carousel component that accepts an array of { name, photo, quote }. Autoplay optional, accessible controls. No external carousel libraries.",
      variables: [],
      icon: "Quote",
    },
  ];

  const mockBucketItems: BucketItem[] = [
    {
      id: "product-card",
      intent: "showing testimonials on product page",
      primary: false,
      enabled: true,
      addedAt: 1000,
    },
    {
      id: "testimonial-carousel",
      intent: "notify on add",
      primary: false,
      enabled: true,
      addedAt: 2000,
    },
  ];

  const mockBucketVars = {
    framework: "React",
    language: "TypeScript",
    style: "Tailwind",
  };

  it("should compose a prompt with proper structure", () => {
    const result = composePrompt(
      mockBucketItems,
      mockPromptItems,
      mockBucketVars
    );

    expect(result.prompt).toContain(
      "System: You are an AI assistant that writes production-ready frontend code"
    );
    expect(result.prompt).toContain(
      "Context: Project uses React + TypeScript + Tailwind. No backend."
    );
    expect(result.prompt).toContain("Instructions:");
    expect(result.prompt).toContain(
      "1. Product Card: Create a responsive React product card"
    );
    expect(result.prompt).toContain(
      "2. Testimonial Carousel: A testimonial carousel component"
    );
    expect(result.prompt).toContain(
      "Constraints: No external animation libraries"
    );
    expect(result.prompt).toContain(
      'Output format: "Return files and code in code blocks"'
    );
    expect(result.prompt).toContain(
      'Finish: "If you cannot implement an item as specified"'
    );
  });

  it("should expand variables in templates", () => {
    const result = composePrompt(
      mockBucketItems,
      mockPromptItems,
      mockBucketVars
    );

    expect(result.prompt).toContain("Create a responsive React product card");
    expect(result.prompt).toContain("Use Tailwind");
    expect(result.prompt).not.toContain("[framework]");
    expect(result.prompt).not.toContain("[style]");
  });

  it("should include user intent in instructions", () => {
    const result = composePrompt(
      mockBucketItems,
      mockPromptItems,
      mockBucketVars
    );

    expect(result.prompt).toContain("showing testimonials on product page");
    expect(result.prompt).toContain("notify on add");
  });

  it("should sort items by addedAt timestamp", () => {
    const result = composePrompt(
      mockBucketItems,
      mockPromptItems,
      mockBucketVars
    );

    const productCardIndex = result.prompt.indexOf("1. Product Card:");
    const testimonialIndex = result.prompt.indexOf("2. Testimonial Carousel:");

    expect(productCardIndex).toBeLessThan(testimonialIndex);
  });

  it("should filter out disabled items", () => {
    const disabledItems = [
      ...mockBucketItems,
      {
        id: "product-card",
        intent: "disabled item",
        primary: false,
        enabled: false,
        addedAt: 3000,
      },
    ];

    const result = composePrompt(
      disabledItems,
      mockPromptItems,
      mockBucketVars
    );

    expect(result.prompt).not.toContain("disabled item");
    expect(result.prompt).toContain("1. Product Card:");
    expect(result.prompt).toContain("2. Testimonial Carousel:");
  });

  it("should calculate character count and estimated tokens", () => {
    const result = composePrompt(
      mockBucketItems,
      mockPromptItems,
      mockBucketVars
    );

    expect(result.charCount).toBeGreaterThan(0);
    expect(result.estimatedTokens).toBe(Math.ceil(result.charCount / 4));
  });

  it("should throw error for missing prompt item", () => {
    const invalidBucketItems = [
      {
        id: "non-existent",
        intent: "test",
        primary: false,
        enabled: true,
        addedAt: 1000,
      },
    ];

    expect(() => {
      composePrompt(invalidBucketItems, mockPromptItems, mockBucketVars);
    }).toThrow("Prompt item not found: non-existent");
  });
});

describe("createConcisePrompt", () => {
  const mockPromptItems: PromptItem[] = [
    {
      id: "product-card",
      title: "Product Card",
      category: "UI / Frontend",
      subcategory: "Components",
      description: "Responsive product card",
      template:
        "Create a responsive [framework] product card with image, title, price, and an 'Add to cart' button. Use [style]. Props: { id, imageUrl, title, price, onAdd }. Make accessible with aria labels.",
      variables: ["framework", "style"],
      icon: "ShoppingBag",
    },
  ];

  const mockBucketItems: BucketItem[] = [
    {
      id: "product-card",
      intent: "showing testimonials on product page",
      primary: false,
      enabled: true,
      addedAt: 1000,
    },
  ];

  const mockBucketVars = {
    framework: "React",
    language: "TypeScript",
    style: "Tailwind",
  };

  it("should return full prompt if under 6000 characters", () => {
    const result = createConcisePrompt(
      mockBucketItems,
      mockPromptItems,
      mockBucketVars
    );

    expect(result.prompt).toContain(
      "System: You are an AI assistant that writes production-ready frontend code"
    );
    expect(result.prompt).toContain(
      "Constraints: No external animation libraries"
    );
    expect(result.prompt).toContain(
      'Output format: "Return files and code in code blocks"'
    );
  });

  it("should create concise version if over 6000 characters", () => {
    // Create a very long template to exceed 6000 characters
    const longTemplate = "Create a very long template ".repeat(200);
    const longPromptItems = [
      {
        ...mockPromptItems[0],
        template: longTemplate,
      },
    ];

    const result = createConcisePrompt(
      mockBucketItems,
      longPromptItems,
      mockBucketVars
    );

    expect(result.prompt).toContain(
      "System: You are an AI assistant that writes production-ready frontend code"
    );
    expect(result.prompt).toContain(
      "Constraints: No external libraries; accessible markup; include filenames."
    );
    expect(result.prompt).toContain(
      "Output: Code blocks with file names and content."
    );
    expect(result.prompt).toContain(
      "Finish: Explain briefly if unable to implement, provide minimal alternative."
    );
  });
});
