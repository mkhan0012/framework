"use client";

import { useState, useEffect, useRef } from "react";
import { EngineState, Belief, LogEntry } from "@/lib/types"; 
import { createBelief, runHybridSimulation, runMutationEngine } from "@/lib/simulation";

// --- FRAMEWORK COMPONENTS ---
import { InputConsole } from "@/components/framework/InputConsole";
import { FramingPrism } from "@/components/framework/FramingPrisma"; 
import { AmplificationNetwork } from "@/components/framework/AmplificationNetwork";
import { SuppressionWell } from "@/components/framework/SuppressionWel";
import { MutationGlitch } from "@/components/framework/MutationGlitch";
import { SystemLog } from "@/components/framework/SystemLog";

// --- LANDING SECTIONS ---
import { 
  SectionHero, 
  SectionOrigin, 
  SectionWhy, 
  SectionTrio, 
  SectionPipeline, 
  SectionMechanic, // (Now strictly 2D/Schematic)
  SectionSchematic,
  SectionFinal 
} from "@/components/landing/LandingSections";

// ----------------------------------------------------------------------
// 1. FRAMEWORK SYSTEM (Preserved Simulation Logic)
// ----------------------------------------------------------------------
const FrameworkSystem = ({ onExit }: { onExit: () => void }) => {
  const [state, setState] = useState<EngineState>("IDLE");
  const [belief, setBelief] = useState<Belief | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]); 
  
  const beliefRef = useRef<Belief | null>(null);

  useEffect(() => { beliefRef.current = belief; }, [belief]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev.slice(-4), { timestamp: new Date().toLocaleTimeString(), message: msg }]);
  };
  
  useEffect(() => { setLogs([{ timestamp: new Date().toLocaleTimeString(), message: "SYSTEM READY." }]); }, []);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    switch (state) {
      case "FRAMING":
        addLog("ANALYZING SEMANTICS...");
        timer = setTimeout(async () => {
          try {
            const currentBelief = beliefRef.current;
            if (currentBelief) {
                const processed = await runHybridSimulation(currentBelief);
                setBelief(processed);
            }
            addLog("FRAMING APPLIED: FEAR VECTOR.");
            setTimeout(() => setState("AMPLIFICATION"), 2000);
          } catch (e) {
            console.error(e);
            addLog("ERR: AI_CONNECTION_LOST. CONTINUING...");
            setTimeout(() => setState("AMPLIFICATION"), 2000);
          }
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
                setTimeout(() => setState("SUPPRESSION"), 0);
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
                setTimeout(() => setState("MUTATION"), 0);
            }
            return { ...prev, visibility: newVis };
          });
        }, 200);
        break;

      case "MUTATION":
        addLog("ENTROPY CRITICAL.");
        timer = setTimeout(() => {
          setBelief((prev) => {
             if (!prev) return null;
             return { ...prev, text: runMutationEngine(prev.text) };
          });
          addLog("OPTIMIZING FOR MEMETIC TRANSFER.");
          timer = setTimeout(() => setState("LOG"), 2000);
        }, 1500);
        break;
    }

    return () => { clearTimeout(timer); clearInterval(interval); };
  }, [state]); 

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between p-8 relative bg-black text-white font-mono animate-in fade-in zoom-in-95 duration-500">
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <header className="w-full max-w-5xl flex justify-between text-[10px] text-zinc-600 uppercase tracking-[0.2em] border-b border-zinc-900 pb-6 z-10">
        <button onClick={onExit} className="hover:text-blue-500 transition-colors duration-200 flex items-center gap-2"><span>&lt; RETURN TO INDEX</span></button>
        <span className="text-blue-600 animate-pulse">STATUS: {state}</span>
      </header>

      <main className="flex-1 w-full flex flex-col items-center justify-center relative z-20">
        {state === "IDLE" && <InputConsole onStart={(input) => { setBelief(createBelief(input)); setState("FRAMING"); }} />}
        {state === "FRAMING" && belief && <FramingPrism belief={belief} />}
        {state === "AMPLIFICATION" && belief && <AmplificationNetwork belief={belief} />}
        {state === "SUPPRESSION" && belief && <SuppressionWell belief={belief} />}
        {state === "MUTATION" && belief && <MutationGlitch belief={belief} />}
        {state === "LOG" && belief && <SystemLog initialInput={belief.originalText} finalBelief={belief} onReset={() => { setBelief(null); setState("IDLE"); }} />}
      </main>

      <footer className="w-full max-w-5xl h-32 border-t border-zinc-900 pt-4 flex flex-col justify-end z-10">
        {logs.map((log, i) => <div key={i} className="text-[10px] text-zinc-600 font-mono"><span className="text-zinc-800 mr-3">{log.timestamp} ::</span>{log.message}</div>)}
      </footer>
    </div>
  );
};

// ----------------------------------------------------------------------
// 2. LANDING PAGE COMPOSER
// ----------------------------------------------------------------------
const LandingPage = ({ onEnterSystem }: { onEnterSystem: () => void }) => {
    return (
        <main className="bg-black text-zinc-300 font-sans selection:bg-blue-900 selection:text-white">
            <SectionHero />
            <SectionOrigin />
            <SectionWhy />
            <SectionTrio />
            <SectionPipeline />
            <SectionSchematic />
            <SectionFinal onEnter={onEnterSystem} />
            
            <footer className="p-8 border-t border-zinc-900 bg-black text-[10px] text-zinc-700 flex justify-between uppercase tracking-widest">
                <span>Architecture of Truth Series</span>
                <span>© 2025</span>
            </footer>
        </main>
    );
}

// ----------------------------------------------------------------------
// 3. MASTER ROUTER
// ----------------------------------------------------------------------
export default function TrilogyHome() {
  const [view, setView] = useState<"LANDING" | "FRAMEWORK">("LANDING");

  if (view === "FRAMEWORK") {
      return <FrameworkSystem onExit={() => setView("LANDING")} />;
  }

  return <LandingPage onEnterSystem={() => setView("FRAMEWORK")} />;
}