"use client";

import { useState } from "react";

// --- VIEWS ---
import CreativePipeline from "@/components/framework/CreativePipeline";
import AboutSystem from "@/components/about/AboutSystem";

// --- LANDING SECTIONS ---
import BootSequence from "@/components/landing/BootSequence";
import { 
  SectionHero, 
  SectionOrigin, 
  SectionWhy, 
  SectionTrio, 
  SectionPipeline, 
  SectionMechanic,
  SectionSchematic,
  SectionCaseStudy,   // <--- Correctly imported now
  SectionManifesto,   // <--- Correctly imported now
  SectionFinal 
} from "@/components/landing/LandingSections";

export default function TrilogyHome() {
  const [booted, setBooted] = useState(false);
  const [view, setView] = useState<"LANDING" | "FRAMEWORK" | "ABOUT">("LANDING");

  // 1. Boot Sequence
  if (!booted) {
      return <BootSequence onComplete={() => setBooted(true)} />;
  }

  // 2. The Creative Pipeline
  if (view === "FRAMEWORK") {
      return <CreativePipeline onExit={() => setView("LANDING")} />;
  }

  // 3. The System Brief
  if (view === "ABOUT") {
      return <AboutSystem onBack={() => setView("LANDING")} />;
  }

  // 4. The Landing Page
  return (
    <main className="bg-black text-zinc-300 font-sans selection:bg-blue-900 selection:text-white overflow-x-hidden">
        <SectionHero />
        <SectionOrigin />
        <SectionWhy />
        <SectionTrio />
        <SectionPipeline />
        <SectionMechanic />
        <SectionSchematic />
        <SectionCaseStudy />
        <SectionManifesto />
        <SectionFinal onEnter={() => setView("FRAMEWORK")} />
        
        <footer className="p-8 border-t border-zinc-900 bg-black text-[10px] text-zinc-700 flex justify-between items-center uppercase tracking-widest">
            <span className="hidden md:inline">Architecture of Truth Series</span>
            <button onClick={() => setView("ABOUT")} className="hover:text-white hover:underline transition-all">
                [ READ SYSTEM BRIEF ]
            </button>
            <span>© 2025</span>
        </footer>
    </main>
  );
}