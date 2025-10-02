"use client";

import { PromptItem } from "@/types";

interface InlinePreviewLayoutsProps {
  item: PromptItem;
}

function InlinePreviewLayouts({ item }: InlinePreviewLayoutsProps) {
  const renderPreview = () => {
    switch (item.id) {
      case "hero-section":
        return (
          <div className="bg-gradient-to-r from-wire-accent to-wire-accent/80 text-wire-bg p-3 rounded-lg">
            <h3 className="text-sm font-bold mb-1">Welcome to Our App</h3>
            <p className="text-xs mb-2">Build amazing things with our tools</p>
            <button className="bg-wire-bg text-wire-accent text-xs px-3 py-1 rounded">
              Get Started
            </button>
          </div>
        );

      case "responsive-grid":
        return (
          <div className="grid grid-cols-2 gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-wire-stroke/10 aspect-square rounded"
              ></div>
            ))}
          </div>
        );

      case "footer-links":
        return (
          <div className="bg-wire-stroke/10 p-2 rounded">
            <div className="flex justify-between text-xs text-wire-stroke/70">
              <span>© 2024 Company</span>
              <div className="flex gap-2">
                <span>Privacy</span>
                <span>Terms</span>
                <span>Contact</span>
              </div>
            </div>
          </div>
        );

      case "header-component":
        return (
          <div className="bg-wire-bg border border-wire-stroke rounded p-2">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs font-bold text-wire-stroke">
                  Page Title
                </div>
                <div className="text-xs text-wire-stroke/70">Subtitle</div>
              </div>
              <button className="bg-wire-accent text-wire-bg text-xs px-2 py-1 rounded">
                Action
              </button>
            </div>
          </div>
        );

      case "container-layout":
        return (
          <div className="bg-wire-stroke/10 p-2 rounded">
            <div className="bg-wire-bg border border-wire-stroke rounded p-2">
              <div className="text-xs text-wire-stroke">Container content</div>
            </div>
          </div>
        );

      case "split-panel":
        return (
          <div className="flex h-16 border border-wire-stroke rounded">
            <div className="flex-1 bg-wire-stroke/10 flex items-center justify-center">
              <span className="text-xs text-wire-stroke">Left Panel</span>
            </div>
            <div className="w-1 bg-wire-stroke/20"></div>
            <div className="flex-1 bg-wire-stroke/5 flex items-center justify-center">
              <span className="text-xs text-wire-stroke">Right Panel</span>
            </div>
          </div>
        );

      case "sticky-header":
        return (
          <div className="bg-wire-bg border border-wire-stroke rounded p-2 shadow-sm">
            <div className="text-xs font-medium text-wire-stroke">
              Sticky Header
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-wire-stroke/10 p-3 rounded text-center">
            <div className="text-xs text-wire-stroke/70">
              Layout: {item.title}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="mt-3 p-2 bg-wire-stroke/5 rounded border border-wire-stroke/20">
      <div className="text-xs text-wire-stroke/60 mb-2">Preview:</div>
      <div className="transform scale-75 origin-top-left">
        {renderPreview()}
      </div>
    </div>
  );
}

export default InlinePreviewLayouts;
