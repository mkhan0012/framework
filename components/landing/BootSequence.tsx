"use client";

import { useState, useEffect } from "react";

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [showProceed, setShowProceed] = useState(false);

  const sequence = [
    { text: "[ SYSTEM BOOTING ]", delay: 500 },
    { text: "Initializing… Environment Integrity: Stable", delay: 1200 },
    { text: "Signal Pathways: Online", delay: 1400 },
    { text: "Belief Input Channel: Open", delay: 1800 },
    { text: "Moral Output: Disabled", delay: 2000 },
    { text: "Evaluation Layer: Not Present", delay: 2200 },
    { text: " ", delay: 2500 },
    { text: "This system does not search for truth.", delay: 3200 },
    { text: "It observes what survives.", delay: 4500 },
    { text: " ", delay: 5500 },
    { text: "[ PIPELINE ONLINE ]", delay: 6000 },
    { text: "Infrastructure → Perception → Conflict", delay: 7000 },
    { text: "Three environments detected. System continuity confirmed.", delay: 8500 },
    { text: " ", delay: 9000 },
    { text: "[ USER CONNECTED ]", delay: 9500 },
    { text: "ROLE: Observer", delay: 9800 },
    { text: "PERMISSION: Read-Only", delay: 10000 },
  ];

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    sequence.forEach(({ text, delay }) => {
      const t = setTimeout(() => setLines((prev) => [...prev, text]), delay);
      timeouts.push(t);
    });
    const finalT = setTimeout(() => setShowProceed(true), 11000);
    timeouts.push(finalT);
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col justify-center items-center p-8 font-mono text-xs md:text-sm leading-relaxed text-zinc-400 cursor-default">
      <div className="max-w-2xl w-full space-y-2">
        {lines.map((line, i) => (
          <div key={i} className={`tracking-wide ${line.includes("[") ? "text-white font-bold mt-6" : "opacity-80"}`}>{line}</div>
        ))}
        <div className="opacity-50 animate-pulse mt-4">_</div>
      </div>
      <div className={`mt-16 transition-opacity duration-1000 ${showProceed ? "opacity-100" : "opacity-0"}`}>
        <button onClick={onComplete} className="text-white border-b border-white pb-1 hover:text-blue-500 hover:border-blue-500 transition-colors uppercase tracking-[0.2em]">Proceed</button>
      </div>
    </div>
  );
}