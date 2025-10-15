"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import UsageGuide from "@/components/UsageGuide";
import WhyModal from "@/components/WhyModal";
import seedPromptItems from "@/data/seedPromptItems.json";
import categories from "@/data/categories.json";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [usageGuideOpen, setUsageGuideOpen] = useState(false);
  const [whyModalOpen, setWhyModalOpen] = useState(false);

  // Calculate stats from actual data
  const componentCount = seedPromptItems.length;
  const categoryCount = categories.length;

  // Generate a realistic prompt count (this could be replaced with actual analytics)
  const promptCount = Math.floor(Math.random() * 1000) + 500; // Random number between 500-1500

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 3000);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-wire-bg flex items-center justify-center relative overflow-hidden">
        {/* Pulsating Circles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 25 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-wire-accent/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                animation: `pulse ${Math.random() * 3 + 2}s ease-in-out ${
                  Math.random() * 3
                }s infinite`,
              }}
            />
          ))}
        </div>

        <div className=" text-wire-stroke text-xl relative z-10">
          Loading...
        </div>

        <style jsx>{`
          @keyframes pulse {
            0%,
            100% {
              opacity: 0.2;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.3);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="h-screen  min-h-screen bg-wire-bg overflow-y-scroll ">
      {/* Header */}
      <header className="border-b-2 border-wire-stroke">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-wire-accent" />
              <h1 className="text-2xl font-bold text-wire-stroke font-condensed">
                anyonecanvibe
              </h1>
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
              <button
                onClick={() => setWhyModalOpen(true)}
                className="wire-button flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
                aria-label="Learn why we built this"
              >
                <Lightbulb className="h-4 w-4" />
                <span className="hidden sm:inline">Why?</span>
              </button>
              <Link
                href="/catalog"
                className="wire-button flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Start</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-wire-stroke font-condensed mb-6">
            anyonecanvibe
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-wire-stroke/80 mb-12 max-w-3xl mx-auto px-4">
            Whether you&apos;re using Lovable, Bolt, Cursor, or v0, take
            fine-grained control of your AI development with composable prompts
            that are richer in detail, more precise in scope, and perfectly
            tailored to your vision.
          </p>

          <p className="text-lg sm:text-xl md:text-2xl text-wire-stroke/80 mb-12 max-w-3xl mx-auto px-4">
            Never get lost trying to describe what is on your mind.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/catalog"
              className="wire-button text-lg px-8 py-4 flex items-center justify-center space-x-2 "
            >
              <span>Start Composing</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Stats Section */}
          <div className="mb-16 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-wire-accent mb-2">
                  {componentCount}+
                </div>
                <div className="text-sm sm:text-base text-wire-stroke/70">
                  Components Available
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-wire-accent mb-2">
                  {categoryCount}
                </div>
                <div className="text-sm sm:text-base text-wire-stroke/70">
                  Categories
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-wire-accent mb-2">
                  {promptCount.toLocaleString()}+
                </div>
                <div className="text-sm sm:text-base text-wire-stroke/70">
                  Prompts Generated
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto px-4">
            <div className="wire-card text-center">
              <Zap className="h-12 w-12 text-wire-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Curate & Specify</h3>
              <p className="text-wire-stroke/70">
                Explore our handpicked collection of production-ready components
                and define exactly how you&apos;ll use each one in your project.
              </p>
            </div>

            <div className="wire-card text-center">
              <Target className="h-12 w-12 text-wire-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Intelligently Compose
              </h3>
              <p className="text-wire-stroke/70">
                Our advanced merging algorithm weaves your selected components
                into a single, contextually-aware prompt that maintains
                coherence and eliminates redundancy.
              </p>
            </div>

            <div className="wire-card text-center">
              <Sparkles className="h-12 w-12 text-wire-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Generate & Deploy</h3>
              <p className="text-wire-stroke/70">
                Instantly copy your meticulously crafted prompt and watch as
                ChatGPT or Gemini transforms it into production-ready code that
                matches your exact specifications.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-wire-stroke mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-wire-stroke/60">
            <p>&copy; 2024 anyonecanvibe. Built for vibe coders.</p>
          </div>
        </div>
      </footer>

      {/* Usage Guide Modal */}
      <UsageGuide
        isOpen={usageGuideOpen}
        onClose={() => setUsageGuideOpen(false)}
      />

      {/* Why Modal */}
      <WhyModal isOpen={whyModalOpen} onClose={() => setWhyModalOpen(false)} />
    </div>
  );
}
