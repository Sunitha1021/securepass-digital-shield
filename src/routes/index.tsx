import { createFileRoute } from "@tanstack/react-router";

import { AuroraBackground } from "@/components/securepass/AuroraBackground";
import { Navbar } from "@/components/securepass/Navbar";
import { Hero } from "@/components/securepass/Hero";
import { Generator } from "@/components/securepass/Generator";
import { Checker } from "@/components/securepass/Checker";
import { Features } from "@/components/securepass/Features";
import { HowItWorks } from "@/components/securepass/HowItWorks";
import { Footer } from "@/components/securepass/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SecurePass — Smart Password Generator & Strength Checker" },
      {
        name: "description",
        content:
          "Generate cryptographically strong passwords and analyze password strength instantly. Entropy scoring, crack-time estimates, and privacy-first local processing.",
      },
      { property: "og:title", content: "SecurePass — Smart Password Generator" },
      {
        property: "og:description",
        content:
          "Premium password generator and strength analyzer with entropy scoring and crack-time estimates. Nothing ever leaves your device.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AuroraBackground />
      <Navbar />
      <main>
        <Hero />
        <Generator />
        <Checker />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
