"use client";

import { useState, useRef, useEffect } from "react";
import SystemModel, { SystemPhase } from "@/components/SystemModel";
import { PipelineOverlay } from "./PipelineOverlay";

interface TrilogyControllerProps {
  onEnterSystem: () => void;
  onEnterAbout: () => void;
}

export default function TrilogyController({ onEnterSystem, onEnterAbout }: TrilogyControllerProps) {
  const [phase, setPhase] = useState<SystemPhase>("ORIGIN");
  const [hoverData, setHoverData] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollY = window.scrollY;
      const height = window.innerHeight * 3; // Total scroll height (3 screens)
      const progress = scrollY / (height - window.innerHeight);

      if (progress < 0.33) setPhase("ORIGIN");
      else if (progress < 0.66) setPhase("PERCEPTION");
      else setPhase("CONFLICT");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // 300vh height to allow scrolling through phases
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      
      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* 3D Layer */}
        <div className="absolute inset-0 z-0">
            <SystemModel phase={phase} onHoverNode={setHoverData} />
        </div>

        {/* UI Layer */}
        <PipelineOverlay phase={phase} hoverData={hoverData} />

        {/* ENTRY COMMANDS (Visible only at bottom) */}
        <div className={`absolute bottom-12 w-full text-center transition-opacity duration-1000 ${phase === "CONFLICT" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} z-30`}>
            <div className="text-zinc-500 text-xs mb-6 uppercase tracking-widest">Three environments. One belief pipeline.</div>
            <div className="flex justify-center gap-8 font-mono text-xs">
                <button onClick={onEnterSystem} className="hover:text-blue-500 hover:underline transition-all text-zinc-300">&gt; ENTER SYSTEM CORE</button>
                <button onClick={onEnterAbout} className="hover:text-white hover:underline transition-all text-zinc-500">&gt; READ SYSTEM BRIEF</button>
            </div>
        </div>

      </div>
    </div>
  );
}