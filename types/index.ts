// Core data models for the anyonecanvibe application

export interface PromptItem {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  description: string;
  template: string;
  variables?: string[];
  icon?: string;
}

export interface BucketItem {
  id: string; // refers to PromptItem.id
  intent: string; // user input: "How will you use it?"
  primary: boolean;
  enabled: boolean;
  addedAt: number;
}

export interface AppState {
  bucket: BucketItem[];
  bucketVars: {
    framework: string;
    language: string;
    style: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  active: boolean;
  subcategories: string[];
}

export interface ComposeResult {
  prompt: string;
  charCount: number;
  estimatedTokens: number;
}
