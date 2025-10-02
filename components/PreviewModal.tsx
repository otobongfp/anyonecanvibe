"use client";

import { useEffect, useState } from "react";
import { PromptItem } from "@/types";
import { X } from "lucide-react";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PromptItem;
  onAddToBucket?: (item: PromptItem, intent: string) => void;
  isAdded?: boolean;
}

// Helper function to get component-specific placeholder text
const getComponentPlaceholder = (title: string): string => {
  const placeholders: Record<string, string> = {
    "Product Card": "Display product details for an e-commerce site",
    "Testimonial Carousel": "Show customer reviews on the homepage",
    "Modal Dialog": "Confirm user actions or show forms",
    "Profile Card": "Display user information in a dashboard",
    "Toast Notification": "Show success messages after form submission",
    "Icon Grid": "Display feature highlights or navigation options",
    "Hero Section": "Create an engaging landing page header",
    "Responsive Grid Layout": "Organize content in a flexible grid system",
    "Form with Validation": "Collect user input with error handling",
    "Accessible Button": "Create interactive call-to-action elements",
    "Loading Skeleton": "Show loading states while content loads",
    "Footer Links": "Add contact info and links at page bottom",
  };

  return placeholders[title] || "Use this component in your project";
};

export default function PreviewModal({
  isOpen,
  onClose,
  item,
  onAddToBucket,
  isAdded = false,
}: PreviewModalProps) {
  const [intent, setIntent] = useState("");
  const [showIntentInput, setShowIntentInput] = useState(false);
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
      // Reset state when modal opens
      setIntent("");
      setShowIntentInput(false);

      // Handle escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);

      return () => {
        document.body.style.overflow = "unset";
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const renderPreview = () => {
    switch (item.id) {
      case "product-card":
        return (
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 max-w-sm mx-auto">
            <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
            <h3 className="font-semibold text-gray-900 mb-2 text-lg">
              Product Name
            </h3>
            <p className="text-gray-600 mb-4">
              Short product description that explains what this item does.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900">$29.99</span>
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                Add to cart
              </button>
            </div>
          </div>
        );

      case "testimonial-carousel":
        return (
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <p className="font-semibold text-gray-900 text-lg">John Doe</p>
                <p className="text-gray-600">Verified Customer</p>
              </div>
            </div>
            <p className="text-gray-700 italic text-lg mb-4">
              "This product exceeded my expectations. The quality is outstanding
              and the customer service was excellent!"
            </p>
            <div className="flex justify-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        );

      case "hero-section":
        return (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg max-w-lg mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Site</h1>
            <p className="text-blue-100 mb-6 text-lg">
              Discover amazing products and services that will transform your
              experience
            </p>
            <button className="bg-wire-bg text-wire-accent px-8 py-3 rounded font-semibold text-lg hover:bg-wire-stroke/10 transition-colors">
              Get Started
            </button>
          </div>
        );

      case "modal-dialog":
        return (
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900 text-lg">
                Modal Title
              </h3>
              <button className="text-wire-stroke/60 hover:text-wire-stroke text-xl">
                ×
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              This is the modal content area. You can put any content here
              including forms, images, or text.
            </p>
            <div className="flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Confirm
              </button>
            </div>
          </div>
        );

      case "responsive-grid":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gray-200 h-20 rounded flex items-center justify-center"
              >
                <span className="text-gray-600 font-medium">Item {i}</span>
              </div>
            ))}
          </div>
        );

      case "form-validation":
        return (
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">
              Contact Form
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
              Send Message
            </button>
          </div>
        );

      case "accessible-button":
        return (
          <div className="space-y-4 max-w-sm mx-auto">
            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
              Primary Button
            </button>
            <button className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors">
              Secondary Button
            </button>
            <button className="w-full bg-gray-600 text-white px-6 py-2 rounded text-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors">
              Small Button
            </button>
          </div>
        );

      case "profile-card":
        return (
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 max-w-sm mx-auto">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  Jane Smith
                </h3>
                <p className="text-gray-600">Software Developer</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              Passionate about creating amazing user experiences and building
              scalable applications.
            </p>
            <div className="flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                Follow
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 transition-colors">
                Message
              </button>
            </div>
          </div>
        );

      case "loading-skeleton":
        return (
          <div className="space-y-4 max-w-sm mx-auto">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="animate-pulse flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        );

      case "toast-notification":
        return (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded max-w-md mx-auto">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="font-semibold text-lg">Success!</p>
                <p className="text-sm">
                  Item has been added to your cart successfully.
                </p>
              </div>
              <button className="ml-4 text-wire-accent hover:text-wire-accent/80 text-xl">
                ×
              </button>
            </div>
          </div>
        );

      case "icon-grid":
        return (
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">📱</span>
                </div>
                <p className="text-sm text-gray-600">Icon {i}</p>
              </div>
            ))}
          </div>
        );

      case "footer-links":
        return (
          <div className="bg-gray-800 text-white p-6 rounded-lg max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="text-sm space-y-2">
                  <li>
                    <a href="#" className="hover:underline">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Support</h4>
                <ul className="text-sm space-y-2">
                  <li>
                    <a href="#" className="hover:underline">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Documentation
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-4 text-xs text-gray-400 text-center">
              © 2024 Company Name. All rights reserved.
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-8 max-w-sm mx-auto flex items-center justify-center h-32">
            <p className="text-gray-500">Preview not available</p>
          </div>
        );
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-wire-bg border-2 border-wire-stroke max-w-2xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b-2 border-wire-stroke flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-wire-stroke">
              {item.title}
            </h2>
            <p className="text-sm text-wire-stroke/70">{item.subcategory}</p>
          </div>
          <button
            onClick={onClose}
            className="wire-button p-2"
            aria-label="Close preview"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="text-center">
            <div className="mb-4">
              <div className="text-sm text-wire-stroke/60 mb-2">
                Component Preview:
              </div>
              {renderPreview()}
            </div>

            <div className="mt-6 p-4 bg-wire-stroke/5 border border-wire-stroke/20 rounded">
              <h3 className="font-semibold text-wire-stroke mb-2">
                Description
              </h3>
              <p className="text-wire-stroke/80 text-sm">{item.description}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t-2 border-wire-stroke">
          {onAddToBucket && (
            <div className="mb-4">
              {!isAdded ? (
                <div>
                  {!showIntentInput ? (
                    <button
                      onClick={() => setShowIntentInput(true)}
                      className="w-full bg-wire-accent text-wire-bg border-2 border-wire-accent py-3 px-4 font-semibold hover:bg-wire-accent/80 transition-all duration-200"
                    >
                      Add to Bucket
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-wire-stroke mb-2">
                          How will you use this component?
                        </label>
                        <input
                          type="text"
                          value={intent}
                          onChange={(e) => setIntent(e.target.value)}
                          placeholder={`e.g., ${getComponentPlaceholder(
                            item.title
                          )}`}
                          className="wire-input w-full px-3 py-2 text-sm"
                          autoFocus
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            if (intent.trim()) {
                              onAddToBucket(item, intent.trim());
                              onClose();
                            }
                          }}
                          disabled={!intent.trim()}
                          className="flex-1 bg-wire-accent text-wire-bg border-2 border-wire-accent py-2 px-4 font-semibold hover:bg-wire-accent/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Add to Bucket
                        </button>
                        <button
                          onClick={() => {
                            setShowIntentInput(false);
                            setIntent("");
                          }}
                          className="wire-button py-2 px-4"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full bg-wire-accent/10 border-2 border-wire-accent py-3 px-4 text-center text-wire-accent font-semibold">
                  ✓ Added to Bucket
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
