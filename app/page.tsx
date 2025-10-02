"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Target } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-wire-bg flex items-center justify-center">
        <div className="animate-pulse text-wire-stroke text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wire-bg">
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
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link
                href="/catalog"
                className="wire-button flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-wire-stroke font-condensed mb-6">
            anyonecanvibe
          </h1>
          <p className="text-xl md:text-2xl text-wire-stroke/80 mb-12 max-w-3xl mx-auto">
            Whether you&apos;re using Lovable, Bolt, Cursor, or v0, take
            fine-grained control of your AI development with composable prompts
            that are richer in detail, more precise in scope, and perfectly
            tailored to your vision.
          </p>

          <p className="text-xl md:text-2xl text-wire-stroke/80 mb-12 max-w-3xl mx-auto">
            Never get lost trying to describe what is on your mind.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/catalog"
              className="wire-button text-lg px-8 py-4 flex items-center justify-center space-x-2"
            >
              <span>Start Composing</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="wire-card text-center">
              <Zap className="h-12 w-12 text-wire-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Curate & Specify</h3>
              <p className="text-wire-stroke/70">
                Explore our handpicked collection of production-ready components
                and define exactly how you'll use each one in your project.
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
    </div>
  );
}
