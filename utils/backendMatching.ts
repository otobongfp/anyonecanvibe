import { PromptItem } from "@/types";

// Keywords that map to specific backend components
const componentKeywords = {
  "rest-api-endpoint": [
    "handle",
    "process",
    "manage",
    "send",
    "create",
    "update",
    "delete",
    "get",
    "registration",
    "login",
    "orders",
    "payments",
    "inventory",
    "notifications",
    "upload",
    "search",
    "profiles",
    "contact",
    "form",
    "submission",
    "api",
  ],
  "jwt-authentication": [
    "login",
    "register",
    "authentication",
    "auth",
    "secure",
    "protect",
    "session",
    "token",
    "access",
    "permission",
    "logout",
    "user",
    "account",
    "password",
  ],
  "database-schema": [
    "store",
    "save",
    "database",
    "data",
    "table",
    "user",
    "product",
    "order",
    "transaction",
    "blog",
    "post",
    "content",
    "team",
    "member",
    "analytics",
    "support",
    "ticket",
    "subscription",
    "billing",
    "catalog",
    "inventory",
  ],
  "file-upload-api": [
    "upload",
    "file",
    "image",
    "document",
    "attachment",
    "media",
    "photo",
    "video",
    "pdf",
    "document",
    "storage",
    "cloud",
  ],
  "search-api": [
    "search",
    "find",
    "filter",
    "query",
    "lookup",
    "discover",
    "browse",
    "catalog",
    "products",
    "content",
    "posts",
    "users",
  ],
  "webhook-handler": [
    "webhook",
    "notification",
    "alert",
    "trigger",
    "event",
    "callback",
    "integration",
    "external",
    "service",
    "payment",
    "email",
    "sms",
  ],
  "oauth-integration": [
    "google",
    "facebook",
    "twitter",
    "github",
    "linkedin",
    "social",
    "login",
    "oauth",
    "third-party",
    "external",
    "provider",
  ],
  "role-based-access": [
    "role",
    "permission",
    "admin",
    "user",
    "moderator",
    "access",
    "control",
    "privilege",
    "authorization",
    "team",
    "member",
    "hierarchy",
  ],
  "password-reset": [
    "password",
    "reset",
    "forgot",
    "recovery",
    "change",
    "update",
    "security",
    "email",
    "verification",
    "token",
    "expire",
  ],
  "two-factor-auth": [
    "2fa",
    "two-factor",
    "security",
    "verification",
    "code",
    "sms",
    "email",
    "authenticator",
    "backup",
    "qr",
    "code",
  ],
  "redis-cache": [
    "cache",
    "performance",
    "speed",
    "fast",
    "optimize",
    "memory",
    "redis",
    "session",
    "temporary",
    "store",
    "quick",
  ],
  "email-webhook": [
    "email",
    "notification",
    "send",
    "mail",
    "smtp",
    "delivery",
    "bounce",
    "unsubscribe",
    "newsletter",
    "marketing",
  ],
  "payment-webhook": [
    "payment",
    "stripe",
    "paypal",
    "billing",
    "subscription",
    "invoice",
    "transaction",
    "refund",
    "charge",
    "card",
    "checkout",
  ],
};

// Business intent patterns that suggest specific components
const businessPatterns = {
  "user management": [
    "jwt-authentication",
    "oauth-integration",
    "role-based-access",
  ],
  "e-commerce": [
    "rest-api-endpoint",
    "database-schema",
    "payment-webhook",
    "file-upload-api",
  ],
  "content management": ["database-schema", "file-upload-api", "search-api"],
  authentication: [
    "jwt-authentication",
    "oauth-integration",
    "password-reset",
    "two-factor-auth",
  ],
  "file handling": ["file-upload-api", "file-storage", "image-processing"],
  notifications: ["email-webhook", "notification-webhook", "webhook-handler"],
  "search functionality": ["search-api", "database-query", "redis-cache"],
  performance: ["redis-cache", "database-caching", "cdn-setup"],
  security: [
    "jwt-authentication",
    "two-factor-auth",
    "role-based-access",
    "password-reset",
  ],
  payments: ["payment-webhook", "rest-api-endpoint", "database-schema"],
};

/**
 * Find backend components that match user's business intent
 */
export function findMatchingBackendComponents(
  userIntent: string,
  allComponents: PromptItem[]
): PromptItem[] {
  const backendComponents = allComponents.filter(
    (component) => component.category === "Backend / Database"
  );

  const matches: { component: PromptItem; score: number }[] = [];

  // Convert user intent to lowercase for matching
  const intent = userIntent.toLowerCase();

  // Score based on keyword matches
  backendComponents.forEach((component) => {
    let score = 0;
    const keywords =
      componentKeywords[component.id as keyof typeof componentKeywords] || [];

    // Check for keyword matches
    keywords.forEach((keyword) => {
      if (intent.includes(keyword)) {
        score += 2;
      }
    });

    // Check for business pattern matches
    Object.entries(businessPatterns).forEach(([pattern, componentIds]) => {
      if (intent.includes(pattern) && componentIds.includes(component.id)) {
        score += 3;
      }
    });

    // Check for business intent matches
    if (component.business_intents) {
      component.business_intents.forEach((businessIntent) => {
        const words = businessIntent.toLowerCase().split(" ");
        const intentWords = intent.split(" ");

        // Check for word overlap
        const overlap = words.filter((word) =>
          intentWords.some(
            (intentWord) =>
              intentWord.includes(word) || word.includes(intentWord)
          )
        );

        if (overlap.length > 0) {
          score += overlap.length;
        }
      });
    }

    if (score > 0) {
      matches.push({ component, score });
    }
  });

  // Sort by score and return top matches
  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, 5) // Return top 5 matches
    .map((match) => match.component);
}

/**
 * Get suggested business intents for a component
 */
export function getSuggestedIntents(component: PromptItem): string[] {
  return component.business_intents || [];
}

/**
 * Generate a user-friendly description of what a backend component does
 */
export function getComponentDescription(component: PromptItem): string {
  const descriptions: Record<string, string> = {
    "rest-api-endpoint":
      "Handles requests from your app (like user registration, orders, or data processing)",
    "jwt-authentication":
      "Securely manages user login and protects your app from unauthorized access",
    "database-schema":
      "Designs how your data is stored and organized in the database",
    "file-upload-api":
      "Handles file uploads like images, documents, or media from users",
    "search-api":
      "Provides search functionality for your app's content or products",
    "webhook-handler":
      "Receives notifications from external services (like payment confirmations)",
    "oauth-integration":
      "Allows users to sign in with Google, Facebook, or other social accounts",
    "role-based-access":
      "Controls what different users can see and do in your app",
    "password-reset":
      "Helps users recover their accounts when they forget their passwords",
    "two-factor-auth":
      "Adds extra security by requiring a second verification step",
    "redis-cache":
      "Makes your app faster by storing frequently used data in memory",
    "email-webhook":
      "Handles email delivery notifications and user email preferences",
    "payment-webhook":
      "Processes payment confirmations and handles billing events",
  };

  return descriptions[component.id] || component.description;
}
