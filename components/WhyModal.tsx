"use client";

import { X, Lightbulb, Target, Users, Zap, Code, Rocket } from "lucide-react";

interface WhyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhyModal({ isOpen, onClose }: WhyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[90] p-2 sm:p-4">
      <div className="bg-wire-bg border-2 border-wire-stroke max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-3 sm:p-4 border-b-2 border-wire-stroke flex items-center justify-between">
          <h2 className="text-xl font-semibold text-wire-stroke flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-wire-accent" />
            <span>Why Anyonecanvibe?</span>
          </h2>
          <button
            onClick={onClose}
            className="wire-button p-2"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-6">
            {/* Mission Statement */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-wire-stroke mb-4">
                Democratizing Software Development
              </h3>
              <p className="text-lg text-wire-stroke/80 leading-relaxed">
                We believe that building software shouldn't require years of
                coding experience. Anyonecanvibe bridges the gap between ideas
                and implementation, making it possible for non-coders to ship
                software faster than ever before.
              </p>
            </div>

            {/* The Problem */}
            <div className="wire-card p-6">
              <h4 className="text-xl font-semibold text-wire-stroke mb-4 flex items-center space-x-2">
                <Target className="h-5 w-5 text-wire-accent" />
                <span>The Problem We're Solving</span>
              </h4>
              <div className="space-y-3 text-wire-stroke/80">
                <p>
                  <strong>Traditional barriers:</strong> Learning to code takes
                  months or years. Most people have great ideas but lack the
                  technical skills to bring them to life.
                </p>
                <p>
                  <strong>AI tools are powerful but complex:</strong> ChatGPT,
                  Claude, and other AI coding assistants are incredible, but
                  writing effective prompts is an art form. Most people don't
                  know how to structure requests to get the best results.
                </p>
                <p>
                  <strong>Time and cost:</strong> Hiring developers is
                  expensive, and learning to code yourself takes time away from
                  your core business or creative work.
                </p>
              </div>
            </div>

            {/* Our Approach */}
            <div className="wire-card p-6">
              <h4 className="text-xl font-semibold text-wire-stroke mb-4 flex items-center space-x-2">
                <Zap className="h-5 w-5 text-wire-accent" />
                <span>Our Approach</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-wire-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-wire-accent font-bold text-sm">
                        1
                      </span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-wire-stroke">
                        Visual Prompt Building
                      </h5>
                      <p className="text-wire-stroke/70 text-sm">
                        Instead of writing prompts from scratch, users visually
                        compose them by selecting pre-built components and
                        specifying their intent.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-wire-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-wire-accent font-bold text-sm">
                        2
                      </span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-wire-stroke">
                        Intelligent Composition
                      </h5>
                      <p className="text-wire-stroke/70 text-sm">
                        Our algorithm intelligently merges selected components
                        into structured, effective prompts that AI tools can
                        understand perfectly.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-wire-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-wire-accent font-bold text-sm">
                        3
                      </span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-wire-stroke">
                        Instant Results
                      </h5>
                      <p className="text-wire-stroke/70 text-sm">
                        Copy the generated prompt, paste it into any AI tool,
                        and watch your idea transform into production-ready code
                        in minutes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-wire-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-wire-accent font-bold text-sm">
                        4
                      </span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-wire-stroke">
                        Learning by Doing
                      </h5>
                      <p className="text-wire-stroke/70 text-sm">
                        Users learn prompt engineering through practice,
                        building confidence and skills as they create real
                        projects.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-wire-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-wire-accent font-bold text-sm">
                        5
                      </span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-wire-stroke">
                        Expert Support
                      </h5>
                      <p className="text-wire-stroke/70 text-sm">
                        When users get stuck, we provide consultation and custom
                        development services to help them succeed.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-wire-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-wire-accent font-bold text-sm">
                        6
                      </span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-wire-stroke">
                        Community Driven
                      </h5>
                      <p className="text-wire-stroke/70 text-sm">
                        We're building a community of makers, creators, and
                        entrepreneurs who believe in democratizing software
                        development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact */}
            <div className="wire-card p-6">
              <h4 className="text-xl font-semibold text-wire-stroke mb-4 flex items-center space-x-2">
                <Rocket className="h-5 w-5 text-wire-accent" />
                <span>The Impact</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-wire-accent mb-2">
                    10x
                  </div>
                  <div className="text-sm text-wire-stroke/70">
                    Faster from idea to prototype
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-wire-accent mb-2">
                    90%
                  </div>
                  <div className="text-sm text-wire-stroke/70">
                    Reduction in learning curve
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-wire-accent mb-2">
                    $0
                  </div>
                  <div className="text-sm text-wire-stroke/70">
                    Cost to get started
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center pt-4">
              <p className="text-wire-stroke/80 mb-4">
                Ready to turn your ideas into reality? Start building today.
              </p>
              <button
                onClick={onClose}
                className="wire-button px-8 py-3 text-lg"
              >
                Start Composing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
