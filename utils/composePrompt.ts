import { PromptItem, BucketItem, ComposeResult } from "@/types";

/**
 * Composes a merged prompt from bucket items using deterministic merging rules
 */
export function composePrompt(
  bucketItems: BucketItem[],
  promptItems: PromptItem[],
  bucketVars: {
    framework: string;
    language: string;
    style: string;
    database: string;
    platform: string;
  }
): ComposeResult {
  // Filter enabled items and sort by addedAt (order in bucket)
  const enabledItems = bucketItems
    .filter((item) => item.enabled)
    .sort((a, b) => a.addedAt - b.addedAt);

  // Get corresponding prompt items
  const items = enabledItems.map((bucketItem) => {
    const promptItem = promptItems.find((p) => p.id === bucketItem.id);
    if (!promptItem) throw new Error(`Prompt item not found: ${bucketItem.id}`);
    return { bucketItem, promptItem };
  });

  // Build the merged prompt
  const systemPrompt = `System: You are an AI assistant that writes production-ready code. Output only code blocks unless asked otherwise.

Context: Project uses [framework] + [language] + [database]. Deploy to [platform].`;

  const instructions = items.map(({ bucketItem, promptItem }) => {
    // Expand variables in template
    let expandedTemplate = promptItem.template;
    if (promptItem.variables) {
      promptItem.variables.forEach((variable) => {
        const value =
          bucketVars[variable as keyof typeof bucketVars] || variable;
        expandedTemplate = expandedTemplate.replace(`[${variable}]`, value);
      });
    }

    return `${promptItem.title}: ${expandedTemplate} - ${bucketItem.intent}`;
  });

  // Determine if this is a backend-focused prompt
  const hasBackendComponents = items.some(
    ({ promptItem }) => promptItem.category === "Backend / Database"
  );

  const constraints = hasBackendComponents
    ? `Constraints: Follow security best practices; include proper error handling; use environment variables for configuration; add logging and monitoring; implement proper validation`
    : `Constraints: No external animation libraries; keep functions <= 120 lines; use accessible markup; include filenames when outputting files`;

  const outputFormat = hasBackendComponents
    ? `Output format: Return files and code in code blocks. Provide file names, setup instructions, and deployment notes. Include API documentation and testing examples.`
    : `Output format: "Return files and code in code blocks. Provide file names and content. For UI components return .tsx components and a small usage snippet."`;

  const finish = `Finish: "If you cannot implement an item as specified, explain briefly why and give a minimal alternative."`;

  const fullPrompt = [
    systemPrompt,
    "",
    "Instructions:",
    ...instructions.map((instruction, index) => `${index + 1}. ${instruction}`),
    "",
    constraints,
    outputFormat,
    "",
    finish,
  ].join("\n");

  // Calculate stats
  const charCount = fullPrompt.length;
  const estimatedTokens = Math.ceil(charCount / 4);

  return {
    prompt: fullPrompt,
    charCount,
    estimatedTokens,
  };
}

/**
 * Creates a concise version of the prompt if it exceeds token limit
 */
export function createConcisePrompt(
  bucketItems: BucketItem[],
  promptItems: PromptItem[],
  bucketVars: {
    framework: string;
    language: string;
    style: string;
    database: string;
    platform: string;
  }
): ComposeResult {
  const fullResult = composePrompt(bucketItems, promptItems, bucketVars);

  if (fullResult.charCount <= 6000) {
    return fullResult;
  }

  // Create concise version by removing verbose examples and comments
  const enabledItems = bucketItems
    .filter((item) => item.enabled)
    .sort((a, b) => a.addedAt - b.addedAt);

  const items = enabledItems.map((bucketItem) => {
    const promptItem = promptItems.find((p) => p.id === bucketItem.id);
    if (!promptItem) throw new Error(`Prompt item not found: ${bucketItem.id}`);
    return { bucketItem, promptItem };
  });

  const systemPrompt = `System: You are an AI assistant that writes production-ready code. Output only code blocks unless asked otherwise.

Context: Project uses [framework] + [language] + [database]. Deploy to [platform].`;

  const instructions = items.map(({ bucketItem, promptItem }) => {
    // Simplified template without verbose examples
    let expandedTemplate = promptItem.template;
    if (promptItem.variables) {
      promptItem.variables.forEach((variable) => {
        const value =
          bucketVars[variable as keyof typeof bucketVars] || variable;
        expandedTemplate = expandedTemplate.replace(`[${variable}]`, value);
      });
    }

    return `${promptItem.title}: ${expandedTemplate} - ${bucketItem.intent}`;
  });

  // Determine if this is a backend-focused prompt
  const hasBackendComponents = items.some(
    ({ promptItem }) => promptItem.category === "Backend / Database"
  );

  const concisePrompt = [
    systemPrompt,
    "",
    "Instructions:",
    ...instructions.map((instruction, index) => `${index + 1}. ${instruction}`),
    "",
    hasBackendComponents
      ? "Constraints: Security best practices; error handling; environment variables; logging."
      : "Constraints: No external libraries; accessible markup; include filenames.",
    hasBackendComponents
      ? "Output: Code blocks with file names, setup instructions, and API docs."
      : "Output: Code blocks with file names and content.",
    "Finish: Explain briefly if unable to implement, provide minimal alternative.",
  ].join("\n");

  return {
    prompt: concisePrompt,
    charCount: concisePrompt.length,
    estimatedTokens: Math.ceil(concisePrompt.length / 4),
  };
}
