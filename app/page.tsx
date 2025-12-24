"use client";

import { useState, useEffect } from "react";
import { EngineState, Belief, LogEntry } from "@/lib/types"; 
import { createBelief, runFramingEngine, runMutationEngine } from "@/lib/simulation";

// Components
import { InputConsole } from "@/components/framework/InputConsole";
// CORRECTED IMPORT: Removed 'a' from FramingPrisma
import { FramingPrism } from "@/components/framework/FramingPrisma"; 
import { AmplificationNetwork } from "@/components/framework/AmplificationNetwork";
import { SuppressionWell } from "@/components/framework/SuppressionWel";
import { MutationGlitch } from "@/components/framework/MutationGlitch";
import { SystemLog } from "@/components/framework/SystemLog";

export default function Home() {
  // -- STATE --
  const [state, setState] = useState<EngineState>("IDLE");
  const [belief, setBelief] = useState<Belief | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]); 

  // -- LOGGING HELPER --
  const addLog = (msg: string) => {
    const entry: LogEntry = {
      // Generate timestamp ONLY when log is created to prevent hydration mismatch
      timestamp: new Date().toLocaleTimeString(),
      message: msg
    };
    setLogs((prev) => [...prev.slice(-4), entry]);
  };

  // -- INITIALIZATION --
  useEffect(() => {
    // Initial log created on client-side mount
    setLogs([{ timestamp: new Date().toLocaleTimeString(), message: "SYSTEM READY." }]);
  }, []);

  // -- SIMULATION LOOP --
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    switch (state) {
      case "FRAMING":
        if (!belief) break;
        addLog("ANALYZING SEMANTICS...");
        timer = setTimeout(() => {
          setBelief(runFramingEngine(belief));
          addLog("FRAMING APPLIED: FEAR VECTOR.");
          timer = setTimeout(() => setState("AMPLIFICATION"), 2000);
        }, 1500);
        break;

      case "AMPLIFICATION":
        addLog("INJECTING INTO NETWORK.");
        interval = setInterval(() => {
          setBelief((prev) => {
            if (!prev) return null;
            const newReach = prev.reach + Math.floor(Math.random() * 500) + 150;
            if (newReach > 5000) {
              clearInterval(interval);
              setState("SUPPRESSION");
            }
            return { ...prev, reach: newReach };
          });
        }, 200);
        break;

      case "SUPPRESSION":
        addLog("VISIBILITY THRESHOLD EXCEEDED.");
        interval = setInterval(() => {
          setBelief((prev) => {
            if (!prev) return null;
            const newVis = prev.visibility - 0.04;
            if (newVis <= 0.3) {
              clearInterval(interval);
              setState("MUTATION");
            }
            return { ...prev, visibility: newVis };
          });
        }, 200);
        break;

      case "MUTATION":
        addLog("ENTROPY CRITICAL.");
        timer = setTimeout(() => {
          if (belief) {
            setBelief({ ...belief, text: runMutationEngine(belief.text) });
            addLog("OPTIMIZING FOR MEMETIC TRANSFER.");
          }
          timer = setTimeout(() => setState("LOG"), 2000);
        }, 1500);
        break;
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [state]);

  const startSimulation = (input: string) => {
    setBelief(createBelief(input));
    setState("FRAMING");
  };

  const resetSimulation = () => {
    setBelief(null);
    setLogs([{ timestamp: new Date().toLocaleTimeString(), message: "SYSTEM RESET." }]);
    setState("IDLE");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between p-8 relative">
      {/* Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between text-[10px] text-zinc-600 uppercase tracking-[0.2em] border-b border-zinc-900 pb-6 z-10">
        <span>FRAMEWORK v1.0</span>
        <span>STATUS: {state}</span>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 w-full flex flex-col items-center justify-center relative z-20">
        {state === "IDLE" && <InputConsole onStart={startSimulation} />}
        {state === "FRAMING" && belief && <FramingPrism belief={belief} />}
        {state === "AMPLIFICATION" && belief && <AmplificationNetwork belief={belief} />}
        {state === "SUPPRESSION" && belief && <SuppressionWell belief={belief} />}
        {state === "MUTATION" && belief && <MutationGlitch belief={belief} />}
        {state === "LOG" && belief && (
          <SystemLog 
            initialInput={belief.originalText} 
            finalBelief={belief} 
            onReset={resetSimulation} 
          />
        )}
      </main>

      {/* Footer / Logs */}
      <footer className="w-full max-w-5xl h-32 border-t border-zinc-900 pt-4 flex flex-col justify-end z-10">
        {logs.map((log, i) => (
          <div key={i} className="text-[10px] text-zinc-600 font-mono leading-relaxed">
            <span className="text-zinc-800 mr-3">{log.timestamp} ::</span>
            {log.message}
          </div>
        ))}
      </footer>
    </div>
  );
}