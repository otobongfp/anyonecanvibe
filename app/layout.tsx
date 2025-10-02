import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://anyonecanvibe.com"),
  title: "anyonecanvibe - Compose AI Prompts for Frontend Development",
  description:
    "Click UI components into your bucket, add your intent, and compose the perfect prompt for ChatGPT or Gemini. Neo-brutalist wire-style interface for vibe coders.",
  keywords: [
    "AI",
    "prompts",
    "frontend",
    "React",
    "TypeScript",
    "Tailwind",
    "ChatGPT",
    "Gemini",
  ],
  authors: [{ name: "anyonecanvibe" }],
  robots: "index, follow",
  openGraph: {
    title: "anyonecanvibe - Compose AI Prompts for Frontend Development",
    description:
      "Click UI components into your bucket, add your intent, and compose the perfect prompt for ChatGPT or Gemini.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "anyonecanvibe - Compose AI Prompts for Frontend Development",
    description:
      "Click UI components into your bucket, add your intent, and compose the perfect prompt for ChatGPT or Gemini.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
