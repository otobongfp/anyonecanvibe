"use client";

import { useState } from "react";
import { X, ChevronRight, Search, Zap, Copy, ExternalLink } from "lucide-react";

interface UsageGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UsageGuide({ isOpen, onClose }: UsageGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: "select",
      title: "Select Components",
      description: "Browse and add components to your bucket",
      icon: Search,
      content: (
        <div className="space-y-6">
          <p className="text-lg text-wire-stroke/80 text-center">
            Choose from our curated collection of development components. From
            UI elements to backend services, find what you need.
          </p>

          <div className="bg-wire-stroke/5 p-6 rounded border border-wire-stroke/20">
            <div className="text-center">
              <h4 className="font-semibold text-wire-stroke mb-2">
                Example Intent:
              </h4>
              <div className="bg-wire-bg border border-wire-stroke/30 p-3 rounded text-sm text-wire-stroke/80">
                &ldquo;Create a REST API endpoint for user authentication with
                JWT tokens, password hashing, and rate limiting.&rdquo;
              </div>
            </div>
          </div>
        </div>
      ),
      screenshot: "/screenshots/Screenshot-View-Category.png",
    },
    {
      id: "compose",
      title: "Compose Prompt",
      description: "Generate your perfect AI prompt",
      icon: Zap,
      content: (
        <div className="space-y-6">
          <p className="text-lg text-wire-stroke/80 text-center">
            Click &ldquo;Compose Prompt&rdquo; to generate a detailed,
            contextually-aware prompt that combines all your selected components
            intelligently.
          </p>

          <div className="bg-wire-stroke/5 p-6 rounded border border-wire-stroke/20">
            <div className="text-center">
              <h4 className="font-semibold text-wire-stroke mb-2">
                What happens:
              </h4>
              <ul className="text-sm text-wire-stroke/70 space-y-1">
                <li>• Combines component descriptions intelligently</li>
                <li>• Maintains context and coherence</li>
                <li>• Eliminates redundancy between components</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      screenshot: "/screenshots/Screenshot-View prompts in your bucket.png",
    },
    {
      id: "use",
      title: "Use Your Prompt",
      description: "Copy and paste into your AI tool",
      icon: Copy,
      content: (
        <div className="space-y-6">
          <p className="text-lg text-wire-stroke/80 text-center">
            Copy your composed prompt and paste it into ChatGPT, Gemini, Cursor,
            v0, or any other AI development tool to generate your code.
          </p>

          <div className="bg-wire-stroke/5 p-6 rounded border border-wire-stroke/20">
            <div className="text-center">
              <h4 className="font-semibold text-wire-stroke mb-2">
                Supported Tools:
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <ExternalLink className="h-4 w-4 text-wire-accent" />
                  <span className="text-wire-stroke/70">ChatGPT</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <ExternalLink className="h-4 w-4 text-wire-accent" />
                  <span className="text-wire-stroke/70">Gemini</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <ExternalLink className="h-4 w-4 text-wire-accent" />
                  <span className="text-wire-stroke/70">Cursor</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <ExternalLink className="h-4 w-4 text-wire-accent" />
                  <span className="text-wire-stroke/70">v0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      screenshot:
        "/screenshots/Screenshot-Edit and Copy prompt to your preferred AI Tool.png",
    },
  ];

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-wire-bg border-2 border-wire-stroke rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b-2 border-wire-stroke p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconComponent className="h-6 w-6 text-wire-accent" />
              <div>
                <h2 className="text-xl font-bold text-wire-stroke">
                  Usage Guide
                </h2>
                <p className="text-sm text-wire-stroke/70">
                  Step {currentStep + 1} of {steps.length}:{" "}
                  {currentStepData.title}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="wire-button p-2"
              aria-label="Close usage guide"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="border-b border-wire-stroke/20 p-4">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded ${
                  index <= currentStep ? "bg-wire-accent" : "bg-wire-stroke/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[60vh]">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-wire-stroke mb-2">
              {currentStepData.title}
            </h3>
            <p className="text-wire-stroke/80 mb-6">
              {currentStepData.description}
            </p>
          </div>

          {/* Screenshot */}
          <div className="mb-6">
            <div className="bg-wire-stroke/5 border border-wire-stroke/20 rounded-lg p-4">
              <div className="aspect-video rounded overflow-hidden">
                <img
                  src={currentStepData.screenshot}
                  alt={`Screenshot for ${currentStepData.title}`}
                  className="w-full h-full object-contain bg-wire-bg"
                  style={{ maxWidth: "100%", height: "auto" }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="flex items-center justify-center h-full bg-wire-stroke/10 rounded">
                          <p class="text-wire-stroke/50 text-sm">Screenshot not found: ${currentStepData.screenshot}</p>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="prose prose-wire max-w-none">
            {currentStepData.content}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-wire-stroke p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full border-2 transition-all ${
                    index === currentStep
                      ? "bg-wire-accent border-wire-accent"
                      : index < currentStep
                      ? "bg-wire-accent/50 border-wire-accent"
                      : "bg-transparent border-wire-stroke/30"
                  }`}
                  aria-label={`Go to step ${index + 1}: ${step.title}`}
                />
              ))}
            </div>
            <div className="flex space-x-3">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="wire-button"
                >
                  Previous
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="wire-button flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="wire-button flex items-center space-x-2"
                >
                  <span>Get Started</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
