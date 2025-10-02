# anyonecanvibe

Compose better AI prompts for vibing. Whether you're using Lovable, Bolt, Cursor, or v0, take fine-grained control of your AI development with composable prompts that are richer in detail, more precise in scope, and perfectly tailored to your vision.

## What It Does

- **Browse** curated UI components and add them to your bucket
- **Specify** exactly how you'll use each component
- **Compose** smart prompts that merge your selections
- **Copy** and paste directly into ChatGPT or Gemini

## Quick Start

```bash
# Install and run
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Browse** → Click "UI / Frontend" category
2. **Add** → Click any component, enter your intent (e.g., "Display product details")
3. **Manage** → Use the bucket (shopping bag icon) to edit, reorder, or remove items
4. **Compose** → Click "Compose Prompt" to generate your final prompt
5. **Copy** → Paste into ChatGPT or Gemini

## Example

**Input**: Product Card + "Display product details for e-commerce"

**Output**:

```
System: You are an AI assistant that writes production-ready frontend code.

Context: Project uses React + TypeScript + Tailwind. No backend.

Instructions:
1. Product Card: Create a responsive React product card with image, title, price, and an 'Add to cart' button. Use Tailwind. Props: { id, imageUrl, title, price, onAdd }. Make accessible with aria labels. - Display product details for e-commerce

Constraints: No external animation libraries; keep functions <= 120 lines; use accessible markup
Output format: Return files and code in code blocks with file names.
```

## Tech Stack

- **Next.js 14** with TypeScript
- **TailwindCSS** for styling
- **localStorage** for persistence
- **Drag & Drop** for reordering
- **Fuzzy Search** for finding components

## Features

- **Curate & Specify** - Handpicked components with custom intent
- **Intelligently Compose** - Smart merging with deduplication
- **Generate & Deploy** - One-click copy to AI assistants
- **Dark/Light Mode** - Toggle between themes
- **Accessible** - Full keyboard navigation and screen reader support

## Project Structure

```
├── app/                 # Next.js pages
├── components/          # React components
├── data/               # Seed data (components, categories)
├── utils/              # Prompt composition & storage
└── types/              # TypeScript definitions
```

## Build & Deploy

```bash
# Build for production
npm run build
npm start

# Deploy to Vercel
npx vercel
```

## Design

Neo-brutalist wire style with:

- Dark background (`#0b0b0c`) / Light background (`#ffffff`)
- White/dark borders (`#ffffff` / `#0b0b0c`)
- Mint green accent (`#98FB98` / `#22c55e`)
- Inter font family

---

Built for vibe coders who want better AI prompts. 🚀
