"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { SystemMetrics, Belief, LogEntry, EngineState } from "@/lib/types";
import { calculateBaseMetrics, runFramingLogic, runAmplificationLogic, runSuppressionLogic, runMutationLogic } from "@/lib/logic";
import { renderVariant } from "@/lib/ai-layer";

// --- ANIMATION UTILS ---
const Reveal = ({ children }: { children: ReactNode }) => <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">{children}</div>;

// --- COMPONENT: ENGINE DASHBOARD ---
// Displays the "Math" separate from the "Text"
const EngineDashboard = ({ metrics }: { metrics: SystemMetrics }) => {
  return (
    <div className="grid grid-cols-5 gap-2 w-full max-w-4xl mb-8 font-mono text-[10px] uppercase tracking-widest">
       <MetricCard label="EMOTION_INTENSITY" value={metrics.emotion_intensity} color="text-red-500" />
       <MetricCard label="CLARITY_SCORE" value={metrics.clarity_score} color="text-blue-500" />
       <MetricCard label="REACH_POTENTIAL" value={metrics.reach_potential} isRaw color="text-white" />
       <MetricCard label="SUPPRESSION_RISK" value={metrics.suppression_risk} color="text-orange-500" />
       <MetricCard label="ENTROPY_LEVEL" value={metrics.entropy} color="text-purple-500" />
    </div>
  )
}

const MetricCard = ({ label, value, color, isRaw }: any) => (
    <div className="border border-zinc-900 bg-zinc-950 p-3 flex flex-col justify-between">
        <span className="text-zinc-600 mb-2">{label.split("_")[0]}</span>
        <span className={`text-xl font-bold ${color}`}>
            {isRaw ? value.toLocaleString() : value.toFixed(2)}
        </span>
        {/* Visual Bar */}
        {!isRaw && (
            <div className="w-full h-1 bg-zinc-900 mt-2">
                <div className={`h-full ${color.replace('text-', 'bg-')}`} style={{ width: `${value * 100}%` }}></div>
            </div>
        )}
    </div>
)


// --- MAIN HYBRID SYSTEM ---
export default function FrameworkHybrid() {
  const [state, setState] = useState<EngineState>("IDLE");
  const [belief, setBelief] = useState<Belief | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // --- LOGGING HELPER ---
  const addLog = (source: "SYSTEM" | "AI_RENDERER", msg: string, data?: string) => {
    setLogs(prev => [...prev.slice(-6), { timestamp: new Date().toLocaleTimeString(), source, message: msg, data }]);
  };

  // --- HYBRID SIMULATION LOOP ---
  useEffect(() => {
    if (!belief) return;

    let timer: NodeJS.Timeout;
    
    const processPhase = async (
        nextState: EngineState, 
        logicFn: (m: SystemMetrics) => SystemMetrics, 
        logMsg: string,
        aiInstruction: string
    ) => {
        // 1. EXECUTE LOGIC (Deterministic)
        const newMetrics = logicFn(belief.metrics);
        addLog("SYSTEM", logMsg, JSON.stringify(newMetrics));
        
        // 2. WAIT (Simulate processing time)
        await new Promise(r => setTimeout(r, 1000));

        // 3. EXECUTE AI RENDERER (Visualization)
        const newText = await renderVariant({ ...belief, metrics: newMetrics }, state);
        
        setBelief(prev => prev ? { ...prev, metrics: newMetrics, current_text: newText } : null);
        addLog("AI_RENDERER", `RENDERING VARIANT: "${aiInstruction}"`);
        
        // 4. TRANSITION
        timer = setTimeout(() => setState(nextState), 2000);
    };

    switch (state) {
      case "INGESTION":
         timer = setTimeout(() => setState("FRAMING"), 1000);
         break;

      case "FRAMING":
         processPhase("AMPLIFICATION", runFramingLogic, "APPLYING FEAR BIAS", "Increase Fear Intensity");
         break;

      case "AMPLIFICATION":
         processPhase("SUPPRESSION", runAmplificationLogic, "CALCULATING VIRAL LIFT", "Optimize for Engagement");
         break;
      
      case "SUPPRESSION":
         processPhase("MUTATION", runSuppressionLogic, "DETECTING THRESHOLDS", "Evasion Protocols");
         break;

      case "MUTATION":
         processPhase("COMPLETE", runMutationLogic, "MAXIMIZING ENTROPY", "Simplify & Harden");
         break;
    }

    return () => clearTimeout(timer);
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  const startSimulation = (input: string) => {
    const initialMetrics = calculateBaseMetrics(input.length);
    setBelief({
        original_text: input,
        current_text: input,
        metrics: initialMetrics,
        iteration: 0
    });
    addLog("SYSTEM", "INGESTING BELIEF...", `INPUT: ${input}`);
    setState("INGESTION");
  };

  return (
    <div className="min-h-screen bg-black text-[#e6e6e6] font-mono p-8 flex flex-col items-center relative">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* HEADER */}
        <header className="w-full max-w-6xl flex justify-between border-b border-zinc-900 pb-4 mb-12 z-10">
            <div className="flex gap-4 items-center">
                <span className="text-xl font-bold tracking-tighter">FRAMEWORK</span>
                <span className="text-[10px] bg-zinc-900 px-2 py-1 text-zinc-500">HYBRID_CORE_v2.0</span>
            </div>
            <div className="text-[10px] tracking-widest text-blue-500 animate-pulse">
                STATUS: {state}
            </div>
        </header>

        {/* MAIN VIEWPORT */}
        <main className="w-full max-w-4xl flex-1 flex flex-col items-center justify-center relative z-20 min-h-[500px]">
            
            {state === "IDLE" ? (
                <div className="w-full max-w-xl animate-in fade-in zoom-in-95 duration-500">
                    <input 
                        type="text" 
                        placeholder="ENTER BELIEF TO PROCESS..."
                        onKeyDown={(e) => e.key === "Enter" && startSimulation(e.currentTarget.value)}
                        className="w-full bg-transparent border-b border-zinc-800 text-3xl md:text-4xl py-4 outline-none text-center uppercase placeholder-zinc-800 focus:border-white transition-colors"
                        autoFocus
                    />
                    <div className="text-center mt-4 text-[10px] text-zinc-600 uppercase tracking-widest">Press Enter to Initialize</div>
                </div>
            ) : (
                <div className="w-full flex flex-col items-center gap-12">
                    
                    {/* 1. VISUALIZATION LAYER (The "Screen") */}
                    <div className="text-center space-y-4">
                        <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Current Public Perception</div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white transition-all duration-300">
                            {belief?.current_text}
                        </h1>
                        {state !== "COMPLETE" && <div className="text-xs text-blue-500 animate-pulse">AI_RENDERING_ACTIVE...</div>}
                    </div>

                    {/* 2. LOGIC LAYER (The "Dashboard") */}
                    {belief && <EngineDashboard metrics={belief.metrics} />}

                </div>
            )}

        </main>

        {/* LOGS FOOTER */}
        <footer className="w-full max-w-6xl h-48 border-t border-zinc-900 mt-12 pt-4 overflow-hidden z-10">
            <div className="text-[10px] text-zinc-600 mb-4 uppercase tracking-widest">System Event Stream</div>
            <div className="space-y-2 font-mono text-xs">
                {logs.map((log, i) => (
                    <div key={i} className="grid grid-cols-12 gap-4 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="col-span-2 text-zinc-600">{log.timestamp}</div>
                        <div className={`col-span-2 font-bold ${log.source === "SYSTEM" ? "text-blue-500" : "text-purple-500"}`}>
                            [{log.source}]
                        </div>
                        <div className="col-span-8 text-zinc-400">
                            {log.message}
                            {log.data && <span className="block text-[10px] text-zinc-600 mt-1">{log.data}</span>}
                        </div>
                    </div>
                ))}
            </div>
        </footer>
    </div>
  );
}