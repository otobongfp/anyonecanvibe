"use client";

import { useState } from "react";
import { X, Copy, ExternalLink, Check } from "lucide-react";
import { ComposeResult } from "@/types";
import { copyToClipboard, openInNewTab } from "@/utils/clipboard";

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  composeResult: ComposeResult;
  onCopyAndOpenChat: () => void;
}

export default function ComposeModal({
  isOpen,
  onClose,
  composeResult,
  onCopyAndOpenChat,
}: ComposeModalProps) {
  const [copied, setCopied] = useState(false);
  const [showConcise, setShowConcise] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    const success = await copyToClipboard(composeResult.prompt);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyAndOpen = async () => {
    const success = await copyToClipboard(composeResult.prompt);
    if (success) {
      onCopyAndOpenChat();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[90] p-4">
      <div className="bg-wire-bg border-2 border-wire-stroke max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b-2 border-wire-stroke flex items-center justify-between">
          <h2 className="text-xl font-semibold text-wire-stroke">
            Composed Prompt
          </h2>
          <button
            onClick={onClose}
            className="wire-button p-2"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Stats */}
        <div className="p-4 border-b-2 border-wire-stroke bg-wire-stroke/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-wire-stroke/70">
                Characters: {composeResult.charCount.toLocaleString()}
              </span>
              <span className="text-sm text-wire-stroke/70">
                Est. Tokens: {composeResult.estimatedTokens.toLocaleString()}
              </span>
            </div>
            {composeResult.charCount > 6000 && (
              <button
                onClick={() => setShowConcise(!showConcise)}
                className="wire-button text-sm px-3 py-1"
              >
                {showConcise ? "Show Full" : "Show Concise"}
              </button>
            )}
          </div>
        </div>

        {/* Prompt Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <pre className="text-sm text-wire-stroke/90 whitespace-pre-wrap font-mono leading-relaxed">
            {composeResult.prompt}
          </pre>
        </div>

        {/* Actions */}
        <div className="p-4 border-t-2 border-wire-stroke">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopy}
              className="wire-button flex-1 flex items-center justify-center space-x-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyAndOpen}
              className="wire-button flex-1 flex items-center justify-center space-x-2"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Copy & Open Chat</span>
            </button>
          </div>

          <p className="text-xs text-wire-stroke/50 mt-2 text-center">
            Paste the copied prompt into ChatGPT or Gemini to generate your code
          </p>
        </div>
      </div>
    </div>
  );
}
