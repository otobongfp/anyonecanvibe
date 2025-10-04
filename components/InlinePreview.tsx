"use client";

import { PromptItem } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface InlinePreviewProps {
  item: PromptItem;
}

// Helper function to get component-specific placeholder text
const getComponentPlaceholder = (title: string): string => {
  const placeholders: { [key: string]: string } = {
    "Product Card": "Product showcase",
    "Testimonial Carousel": "Customer feedback",
    "Hero Section": "Landing page header",
    "Modal Dialog": "Overlay content",
    "Responsive Grid Layout": "Content organization",
    "Form with Validation": "User input collection",
    "Accessible Button": "Interactive element",
    "Profile Card": "User information",
    "Loading Skeleton": "Content placeholder",
    "Toast Notification": "User feedback",
    "Icon Grid": "Feature showcase",
    "Footer Links": "Site navigation",
  };

  return placeholders[title] || "Component preview";
};

function InlinePreview({ item }: InlinePreviewProps) {
  const [isVisible, setIsVisible] = useState(true);
  const renderPreview = () => {
    switch (item.id) {
      case "product-card":
        return (
          <div className="bg-wire-bg border border-wire-stroke rounded-lg p-3 shadow-sm">
            <div className="aspect-square bg-wire-stroke/10 rounded mb-2"></div>
            <h4 className="font-medium text-sm text-wire-stroke mb-1">
              Product Name
            </h4>
            <p className="text-xs text-wire-stroke/70 mb-2">$29.99</p>
            <button className="w-full bg-wire-accent text-wire-bg text-xs py-1 px-2 rounded">
              Add to Cart
            </button>
          </div>
        );

      case "testimonial-carousel":
        return (
          <div className="bg-wire-bg border border-wire-stroke rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-wire-stroke/20 rounded-full mr-2"></div>
              <div>
                <div className="text-xs font-medium text-wire-stroke">
                  John Doe
                </div>
                <div className="text-xs text-wire-stroke/60">Customer</div>
              </div>
            </div>
            <p className="text-xs text-wire-stroke/80 italic">
              &ldquo;Great product, highly recommend!&rdquo;
            </p>
          </div>
        );

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

      case "modal-dialog":
        return (
          <div className="bg-wire-bg border border-wire-stroke rounded-lg p-3 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-wire-stroke">
                Modal Title
              </h4>
              <div className="w-4 h-4 bg-wire-stroke/20 rounded"></div>
            </div>
            <p className="text-xs text-wire-stroke/70 mb-3">
              Modal content goes here...
            </p>
            <div className="flex gap-2">
              <button className="text-xs px-2 py-1 border border-wire-stroke rounded text-wire-stroke">
                Cancel
              </button>
              <button className="text-xs px-2 py-1 bg-wire-accent text-wire-bg rounded">
                Confirm
              </button>
            </div>
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

      case "form-validation":
        return (
          <div className="bg-wire-bg border border-wire-stroke rounded-lg p-3">
            <div className="mb-2">
              <input
                type="text"
                placeholder="Email"
                className="w-full text-xs px-2 py-1 border border-wire-stroke rounded bg-wire-bg text-wire-stroke"
                disabled
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                placeholder="Password"
                className="w-full text-xs px-2 py-1 border border-wire-stroke rounded bg-wire-bg text-wire-stroke"
                disabled
              />
            </div>
            <button className="w-full bg-wire-accent text-wire-bg text-xs py-1 rounded">
              Submit
            </button>
          </div>
        );

      case "accessible-button":
        return (
          <div className="flex gap-2">
            <button className="bg-wire-accent text-wire-bg text-xs px-3 py-1 rounded">
              Primary
            </button>
            <button className="border border-wire-stroke text-wire-stroke text-xs px-3 py-1 rounded">
              Secondary
            </button>
          </div>
        );

      case "profile-card":
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
              <div>
                <div className="text-xs font-medium">Jane Smith</div>
                <div className="text-xs text-gray-500">Software Engineer</div>
              </div>
            </div>
          </div>
        );

      case "loading-skeleton":
        return (
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        );

      case "toast-notification":
        return (
          <div className="bg-green-100 border border-green-300 text-green-800 p-2 rounded-lg">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs">Success! Action completed.</span>
            </div>
          </div>
        );

      case "icon-grid":
        return (
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="text-center">
                <div className="w-6 h-6 bg-gray-300 rounded mx-auto mb-1"></div>
                <div className="text-xs text-gray-600">Icon {i}</div>
              </div>
            ))}
          </div>
        );

      case "footer-links":
        return (
          <div className="bg-gray-100 p-2 rounded">
            <div className="flex justify-between text-xs text-gray-600">
              <span>© 2024 Company</span>
              <div className="flex gap-2">
                <span>Privacy</span>
                <span>Terms</span>
                <span>Contact</span>
              </div>
            </div>
          </div>
        );

      // Navigation components
      case "navbar-responsive":
        return (
          <div className="bg-white border border-gray-200 rounded p-2">
            <div className="flex justify-between items-center">
              <div className="text-xs font-bold">Logo</div>
              <div className="flex gap-1">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        );

      case "breadcrumb-navigation":
        return (
          <div className="flex items-center text-xs text-gray-600">
            <span>Home</span>
            <span className="mx-1">›</span>
            <span>Products</span>
            <span className="mx-1">›</span>
            <span className="text-gray-900">Current</span>
          </div>
        );

      case "tab-navigation":
        return (
          <div className="bg-white border border-gray-200 rounded">
            <div className="flex">
              <div className="px-2 py-1 text-xs bg-blue-100 text-blue-600 border-b-2 border-blue-600">
                Tab 1
              </div>
              <div className="px-2 py-1 text-xs text-gray-600">Tab 2</div>
              <div className="px-2 py-1 text-xs text-gray-600">Tab 3</div>
            </div>
          </div>
        );

      case "pagination-controls":
        return (
          <div className="flex items-center gap-1 text-xs">
            <button className="px-2 py-1 border border-gray-300 rounded">
              ‹
            </button>
            <button className="px-2 py-1 bg-blue-600 text-white rounded">
              1
            </button>
            <button className="px-2 py-1 border border-gray-300 rounded">
              2
            </button>
            <button className="px-2 py-1 border border-gray-300 rounded">
              3
            </button>
            <button className="px-2 py-1 border border-gray-300 rounded">
              ›
            </button>
          </div>
        );

      case "sidebar-navigation":
        return (
          <div className="bg-gray-100 p-2 rounded w-20">
            <div className="space-y-1">
              <div className="w-full h-6 bg-gray-300 rounded"></div>
              <div className="w-full h-6 bg-gray-300 rounded"></div>
              <div className="w-full h-6 bg-gray-300 rounded"></div>
            </div>
          </div>
        );

      // Data display components
      case "data-table":
        return (
          <div className="bg-white border border-gray-200 rounded text-xs">
            <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100">
              <div>Name</div>
              <div>Email</div>
              <div>Status</div>
            </div>
            <div className="grid grid-cols-3 gap-1 p-1">
              <div>John</div>
              <div>john@email.com</div>
              <div className="text-green-600">Active</div>
            </div>
          </div>
        );

      case "card-list":
        return (
          <div className="grid grid-cols-2 gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded p-1"
              >
                <div className="w-full h-8 bg-gray-100 rounded mb-1"></div>
                <div className="text-xs">Card {i}</div>
              </div>
            ))}
          </div>
        );

      case "stats-dashboard":
        return (
          <div className="grid grid-cols-2 gap-1">
            <div className="bg-white border border-gray-200 rounded p-2 text-center">
              <div className="text-xs font-bold">1,234</div>
              <div className="text-xs text-gray-600">Users</div>
            </div>
            <div className="bg-white border border-gray-200 rounded p-2 text-center">
              <div className="text-xs font-bold">$5,678</div>
              <div className="text-xs text-gray-600">Revenue</div>
            </div>
          </div>
        );

      case "timeline-component":
        return (
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <div className="text-xs">Completed task</div>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <div className="text-xs">Current task</div>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
              <div className="text-xs">Upcoming task</div>
            </div>
          </div>
        );

      // Form components
      case "search-input":
        return (
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full text-xs px-3 py-1 pl-8 border border-gray-300 rounded"
              disabled
            />
            <div className="absolute left-2 top-1 w-3 h-3 bg-gray-400 rounded"></div>
          </div>
        );

      case "file-upload":
        return (
          <div className="border-2 border-dashed border-gray-300 rounded p-3 text-center">
            <div className="w-6 h-6 bg-gray-300 rounded mx-auto mb-1"></div>
            <div className="text-xs text-gray-600">Drop files here</div>
          </div>
        );

      case "multi-select":
        return (
          <div className="bg-white border border-gray-200 rounded p-2">
            <div className="flex flex-wrap gap-1 mb-1">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                Option 1 ×
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                Option 2 ×
              </span>
            </div>
            <input
              type="text"
              placeholder="Add more..."
              className="w-full text-xs border-0 outline-none"
              disabled
            />
          </div>
        );

      case "date-range-picker":
        return (
          <div className="flex gap-1">
            <input
              type="date"
              className="text-xs px-2 py-1 border border-gray-300 rounded"
              disabled
            />
            <span className="text-xs self-center">to</span>
            <input
              type="date"
              className="text-xs px-2 py-1 border border-gray-300 rounded"
              disabled
            />
          </div>
        );

      case "rating-input":
        return (
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-3 h-3 bg-yellow-400 rounded"></div>
            ))}
          </div>
        );

      // Feedback components
      case "alert-banner":
        return (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-2 rounded">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-xs">Warning message</span>
            </div>
          </div>
        );

      case "progress-bar":
        return (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: "60%" }}
            ></div>
          </div>
        );

      case "loading-spinner":
        return (
          <div className="flex justify-center">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        );

      case "tooltip-component":
        return (
          <div className="relative">
            <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
              Hover me
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              Tooltip text
            </div>
          </div>
        );

      case "notification-center":
        return (
          <div className="bg-white border border-gray-200 rounded p-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium">Notifications</span>
              <span className="text-xs bg-red-500 text-white px-1 rounded">
                3
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-600">New message</div>
              <div className="text-xs text-gray-600">Task completed</div>
            </div>
          </div>
        );

      // Layout components
      case "header-component":
        return (
          <div className="bg-white border border-gray-200 rounded p-2">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs font-bold">Page Title</div>
                <div className="text-xs text-gray-600">Subtitle</div>
              </div>
              <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                Action
              </button>
            </div>
          </div>
        );

      case "container-layout":
        return (
          <div className="bg-gray-100 p-2 rounded">
            <div className="bg-white border border-gray-200 rounded p-2">
              <div className="text-xs">Container content</div>
            </div>
          </div>
        );

      case "split-panel":
        return (
          <div className="flex h-16 border border-gray-200 rounded">
            <div className="flex-1 bg-gray-100 flex items-center justify-center">
              <span className="text-xs">Left Panel</span>
            </div>
            <div className="w-1 bg-gray-300"></div>
            <div className="flex-1 bg-gray-50 flex items-center justify-center">
              <span className="text-xs">Right Panel</span>
            </div>
          </div>
        );

      case "sticky-header":
        return (
          <div className="bg-white border border-gray-200 rounded p-2 shadow-sm">
            <div className="text-xs font-medium">Sticky Header</div>
          </div>
        );

      // Interactive components
      case "dropdown-menu":
        return (
          <div className="relative">
            <button className="bg-white border border-gray-200 rounded px-2 py-1 text-xs">
              Menu ▼
            </button>
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg">
              <div className="px-2 py-1 text-xs hover:bg-gray-100">
                Option 1
              </div>
              <div className="px-2 py-1 text-xs hover:bg-gray-100">
                Option 2
              </div>
            </div>
          </div>
        );

      case "accordion-component":
        return (
          <div className="bg-white border border-gray-200 rounded">
            <div className="p-2 border-b border-gray-200 flex justify-between items-center">
              <span className="text-xs font-medium">Section 1</span>
              <span className="text-xs">▼</span>
            </div>
            <div className="p-2 text-xs text-gray-600">Content here...</div>
          </div>
        );

      case "slider-component":
        return (
          <div className="relative">
            <div className="w-full h-2 bg-gray-200 rounded">
              <div className="absolute top-0 left-0 w-1/3 h-2 bg-blue-600 rounded"></div>
              <div className="absolute top-0 left-1/3 w-2 h-2 bg-blue-600 rounded-full transform -translate-y-0.5"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>0</span>
              <span>100</span>
            </div>
          </div>
        );

      case "toggle-switch":
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-4 bg-blue-600 rounded-full relative">
              <div className="absolute right-1 top-0.5 w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-xs">Enabled</span>
          </div>
        );

      // Media components
      case "image-gallery":
        return (
          <div className="grid grid-cols-2 gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded"></div>
            ))}
          </div>
        );

      case "video-player":
        return (
          <div className="bg-black rounded aspect-video flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-l-2 border-l-black border-y-2 border-y-transparent ml-0.5"></div>
            </div>
          </div>
        );

      case "audio-player":
        return (
          <div className="bg-gray-100 rounded p-2 flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-l-2 border-l-white border-y-2 border-y-transparent ml-0.5"></div>
            </div>
            <div className="flex-1 h-1 bg-gray-300 rounded">
              <div className="w-1/3 h-1 bg-blue-600 rounded"></div>
            </div>
          </div>
        );

      // Advanced components
      case "drag-drop-zone":
        return (
          <div className="border-2 border-dashed border-blue-300 bg-blue-50 rounded p-3 text-center">
            <div className="w-6 h-6 bg-blue-300 rounded mx-auto mb-1"></div>
            <div className="text-xs text-blue-600">Drop files here</div>
          </div>
        );

      case "infinite-scroll":
        return (
          <div className="space-y-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded p-2"
              >
                <div className="text-xs">Item {i}</div>
              </div>
            ))}
            <div className="text-center">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        );

      case "virtual-list":
        return (
          <div className="h-16 overflow-hidden border border-gray-200 rounded">
            <div className="space-y-1 p-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-gray-100 rounded"></div>
              ))}
            </div>
          </div>
        );

      case "sortable-list":
        return (
          <div className="space-y-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded p-1 flex items-center gap-1"
              >
                <div className="w-3 h-3 bg-gray-300 rounded"></div>
                <span className="text-xs">Item {i}</span>
              </div>
            ))}
          </div>
        );

      // Additional components
      case "chart-component":
        return (
          <div className="bg-white border border-gray-200 rounded p-2">
            <div className="h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded flex items-end justify-around">
              <div
                className="w-2 bg-white rounded-t"
                style={{ height: "60%" }}
              ></div>
              <div
                className="w-2 bg-white rounded-t"
                style={{ height: "80%" }}
              ></div>
              <div
                className="w-2 bg-white rounded-t"
                style={{ height: "40%" }}
              ></div>
              <div
                className="w-2 bg-white rounded-t"
                style={{ height: "90%" }}
              ></div>
            </div>
          </div>
        );

      case "calendar-widget":
        return (
          <div className="bg-white border border-gray-200 rounded p-2">
            <div className="text-xs font-medium mb-1">December 2024</div>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                <div key={day} className="text-center text-gray-600">
                  {day}
                </div>
              ))}
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div
                  key={day}
                  className={`text-center ${
                    day === 15 ? "bg-blue-600 text-white rounded" : ""
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        );

      case "search-filters":
        return (
          <div className="bg-white border border-gray-200 rounded p-2">
            <div className="flex gap-1 mb-1">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                Filter 1 ×
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                Filter 2 ×
              </span>
            </div>
            <div className="text-xs text-gray-600">2 filters applied</div>
          </div>
        );

      case "floating-action-button":
        return (
          <div className="relative">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-white rounded"></div>
            </div>
          </div>
        );

      case "badge-component":
        return (
          <div className="flex gap-1">
            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
              Success
            </span>
            <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">
              Error
            </span>
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">
              Warning
            </span>
          </div>
        );

      case "avatar-component":
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full relative">
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
              JS
            </div>
          </div>
        );

      case "chip-component":
        return (
          <div className="flex gap-1 flex-wrap">
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              Tag 1<div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            </span>
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              Tag 2<div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            </span>
          </div>
        );

      // Animation components
      case "skeleton-loader":
        return (
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        );

      case "fade-transition":
        return (
          <div className="bg-blue-100 p-2 rounded text-xs text-blue-800">
            Fade transition preview
          </div>
        );

      case "slide-transition":
        return (
          <div className="bg-green-100 p-2 rounded text-xs text-green-800">
            Slide transition preview
          </div>
        );

      case "bounce-animation":
        return (
          <div className="bg-yellow-100 p-2 rounded text-xs text-yellow-800 animate-bounce">
            Bounce animation
          </div>
        );

      case "pulse-animation":
        return (
          <div className="bg-purple-100 p-2 rounded text-xs text-purple-800 animate-pulse">
            Pulse animation
          </div>
        );
      case "hide-show-animation":
        return (
          <div className="flex flex-col w-[100px] h-[160px] relative">
            <AnimatePresence initial={false}>
              {isVisible ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="w-[100px] h-[100px] bg-[#0cdcf7] rounded-[10px]"
                  key="box"
                />
              ) : null}
            </AnimatePresence>
            <motion.button
              className="bg-[#0cdcf7] rounded-[10px] py-[10px] px-[20px] text-[#0f1115] absolute bottom-0 left-0 right-0"
              onClick={() => setIsVisible(!isVisible)}
              whileTap={{ y: 1 }}
            >
              {isVisible ? "Hide" : "Show"}
            </motion.button>
          </div>
        );

      default:
        return (
          <div className="bg-gray-100 p-3 rounded text-center">
            <div className="text-xs text-gray-600">
              {getComponentPlaceholder(item.title)}
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

export default InlinePreview;
