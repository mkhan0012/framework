"use client";

import { useState, useEffect, useRef } from "react";
import { createBelief, runHybridSimulation, runMutationEngine, generateDeepAnalysis } from "@/lib/simulation";
import { FramingVector } from "@/lib/types";
import ArtifactGenerator from "./ArtifactGenerator";

// --- CONFIGURATION ---
const PHASES = [
  { id: "INPUT", label: "INJECTION PORT" },
  { id: "INFRASTRUCTURE", label: "INFRASTRUCTURE LAYER", sub: "FRAMEWORK" },
  { id: "PERCEPTION", label: "PERCEPTION LAYER", sub: "TRUTH IS OPTIONAL" },
  { id: "CONFLICT", label: "CONFLICT LAYER", sub: "ARGUELY" },
  { id: "OUTCOME", label: "FINAL ANALYSIS" }
];

const VECTORS: FramingVector[] = ["FEAR", "OUTRAGE", "VALIDATION", "CONFUSION"];
const SUBLIMINALS = ["OBEY", "CONSUME", "SCROLL", "AGREE", "FEAR", "SHARE", "REPEAT", "NO TRUTH"];

const PRESETS = [
    "AI will replace all human creativity by 2030.",
    "The government has weather control technology.",
    "Remote work is destroying social cohesion.",
    "Social media algorithms are designed to cause depression."
];

// Theme Map
const VECTOR_THEMES: Record<FramingVector, { color: string, glow: string, border: string, hex: string }> = {
    "FEAR": { color: "text-red-500", glow: "bg-red-500", border: "border-red-500", hex: "#ef4444" },
    "OUTRAGE": { color: "text-orange-500", glow: "bg-orange-500", border: "border-orange-500", hex: "#f97316" },
    "VALIDATION": { color: "text-emerald-500", glow: "bg-emerald-500", border: "border-emerald-500", hex: "#10b981" },
    "CONFUSION": { color: "text-purple-500", glow: "bg-purple-500", border: "border-purple-500", hex: "#a855f7" }
};

type HistoryItem = {
    id: number;
    input: string;
    output: string;
    vector: string;
    timestamp: string;
};

// --- CIPHER TEXT ---
const CipherText = ({ text, reveal }: { text: string, reveal: boolean }) => {
    const [display, setDisplay] = useState("");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    useEffect(() => {
        if (!reveal) return;
        let iter = 0;
        const interval = setInterval(() => {
            setDisplay(text.split("").map((char, index) => {
                if (index < iter) return char;
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(""));
            if (iter >= text.length) clearInterval(interval);
            iter += 1/2; 
        }, 30);
        return () => clearInterval(interval);
    }, [text, reveal]);
    return <span>{display}</span>;
}

export default function CreativePipeline({ onExit }: { onExit: () => void }) {
  // State
  const [phase, setPhase] = useState("INPUT");
  const [inputText, setInputText] = useState("");
  const [processedText, setProcessedText] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  
  // Settings
  const [vector, setVector] = useState<FramingVector>("FEAR");
  const [generations, setGenerations] = useState(1);
  const [entropy, setEntropy] = useState(50);
  const [currentGen, setCurrentGen] = useState(1);
  
  // Toggles
  const [showGuide, setShowGuide] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [crtMode, setCrtMode] = useState(false);
  const [showArtifact, setShowArtifact] = useState(false);

  // Immersion & Bridge
  const [subliminal, setSubliminal] = useState<string | null>(null);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [ghosts, setGhosts] = useState<{id: number, text: string, x: number, y: number}[]>([]);
  const [isTransferring, setIsTransferring] = useState(false); // NEW: Transfer State

  // Data
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [complexity, setComplexity] = useState(0);
  const [virality, setVirality] = useState(0);
  const [analysisText, setAnalysisText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const audioCtx = useRef<AudioContext | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const theme = VECTOR_THEMES[vector];

  // --- PERSISTENCE ---
  useEffect(() => {
    const saved = localStorage.getItem("framework_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("framework_history", JSON.stringify(history));
  }, [history]);

  // --- LIVE METRICS ---
  useEffect(() => {
    const words = inputText.trim().split(/\s+/).length;
    const hasCaps = /[A-Z]/.test(inputText);
    let comp = Math.min(100, (words / 20) * 100);
    if (words > 15) comp = 100;
    setComplexity(comp);
    let vir = 0;
    if (words > 3 && words < 12) vir += 40;
    if (hasCaps) vir += 20;
    if (["they", "truth", "secret", "hide", "now"].some(w => inputText.toLowerCase().includes(w))) vir += 30;
    setVirality(Math.min(100, vir));
  }, [inputText]);

  // --- NEURO-GRID ---
  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      let particles: {x: number, y: number, vx: number, vy: number, size: number}[] = [];
      const count = 60;
      for(let i=0; i<count; i++) {
          particles.push({x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, size: Math.random() * 2 + 1});
      }
      const animate = () => {
          if (!canvas) return;
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          particles.forEach(p => {
              if (phase === "INFRASTRUCTURE") { p.x += (centerX - p.x) * 0.02; p.y += (centerY - p.y) * 0.02; }
              else if (phase === "PERCEPTION") { if (Math.random() > 0.9) { p.x += (Math.random() - 0.5) * 50; p.y += (Math.random() - 0.5) * 50; } }
              else if (phase === "CONFLICT") { p.x += (Math.random() - 0.5) * 10; p.y += (Math.random() - 0.5) * 10; ctx.strokeStyle = theme.hex; }
              else if (phase === "OUTCOME") { const dx = p.x - centerX; const dy = p.y - centerY; p.x += dx * 0.05; p.y += dy * 0.05; }
              else { p.x += p.vx; p.y += p.vy; }
              if (phase === "INPUT") { if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0; if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0; }
              ctx.fillStyle = phase === "CONFLICT" ? theme.hex : "rgba(100, 100, 100, 0.3)";
              ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
              particles.forEach(p2 => {
                  const dx = p.x - p2.x; const dy = p.y - p2.y; const dist = Math.sqrt(dx*dx + dy*dy);
                  if (dist < 100) { ctx.beginPath(); ctx.strokeStyle = phase === "CONFLICT" ? theme.hex : `rgba(100, 100, 100, ${0.1 - dist/1000})`; ctx.lineWidth = 0.5; ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke(); }
              });
          });
          requestAnimationFrame(animate);
      };
      const animId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animId);
  }, [phase, theme]);

  // --- AUDIO ---
  const playSound = (type: "drone" | "glitch" | "alert" | "click" | "success" | "print" | "modem") => {
    if (!audioCtx.current) return;
    const ctx = audioCtx.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    if (type === "drone") { osc.type = "sawtooth"; osc.frequency.setValueAtTime(50, now); osc.frequency.exponentialRampToValueAtTime(30, now + 2); gain.gain.setValueAtTime(0.05, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 2); osc.start(now); osc.stop(now + 2); }
    else if (type === "glitch") { osc.type = "square"; osc.frequency.setValueAtTime(Math.random() * 500 + 100, now); gain.gain.setValueAtTime(0.1, now); osc.start(now); osc.stop(now + 0.05); }
    else if (type === "print") { osc.type = "triangle"; osc.frequency.setValueAtTime(800, now); gain.gain.setValueAtTime(0.02, now); osc.start(now); osc.stop(now + 0.1); }
    else if (type === "click") { osc.type = "square"; osc.frequency.setValueAtTime(800, now); gain.gain.setValueAtTime(0.02, now); osc.start(now); osc.stop(now + 0.05); }
    else if (type === "success") { osc.type = "sine"; osc.frequency.setValueAtTime(600, now); osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2); gain.gain.setValueAtTime(0.05, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5); osc.start(now); osc.stop(now + 0.5); }
    else if (type === "modem") { osc.type = "sawtooth"; osc.frequency.setValueAtTime(2000, now); osc.frequency.linearRampToValueAtTime(500, now + 0.5); gain.gain.setValueAtTime(0.05, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5); osc.start(now); osc.stop(now + 0.5); }
  };
  const initAudio = () => { if (!audioCtx.current) { audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)(); } if (audioCtx.current.state === "suspended") audioCtx.current.resume(); };
  const addLog = (msg: string) => { setLogs(prev => [msg, ...prev].slice(0, 6)); playSound("click"); };
  const triggerSubliminal = () => { const word = SUBLIMINALS[Math.floor(Math.random() * SUBLIMINALS.length)]; setSubliminal(word); playSound("glitch"); setTimeout(() => setSubliminal(null), 60); };

  // --- SIMULATION LOOP ---
  const runSimulation = async () => {
    if (!inputText.trim()) return;
    initAudio();
    setReceiptOpen(false);
    setAnalysisText("");
    let currentText = inputText;
    for (let i = 1; i <= generations; i++) {
        setCurrentGen(i);
        setPhase("INFRASTRUCTURE"); playSound("drone"); addLog(`GEN ${i}: INGESTING DATA [VECTOR: ${vector}]...`); if (Math.random() > 0.5) triggerSubliminal(); await new Promise(r => setTimeout(r, 2000));
        try { const belief = createBelief(currentText, vector); const hybridResult = await runHybridSimulation(belief, entropy); const textToMutate = hybridResult.aiRenderedText || hybridResult.text; currentText = runMutationEngine(textToMutate, entropy); } catch (e) { currentText = currentText.toUpperCase() + " [ERR]"; }
        setPhase("PERCEPTION"); addLog(`GEN ${i}: REFRAMING REALITY...`); if (Math.random() > 0.3) triggerSubliminal(); await new Promise(r => setTimeout(r, 1500));
        setPhase("CONFLICT"); addLog(`GEN ${i}: HARDENING IDENTITY...`); if (Math.random() > 0.3) triggerSubliminal(); await new Promise(r => setTimeout(r, 1500));
    }
    setPhase("OUTCOME"); setProcessedText(currentText);
    setHistory(prev => [{ id: Date.now(), input: inputText, output: currentText, vector: vector, timestamp: new Date().toLocaleTimeString() }, ...prev]);
    addLog("SIMULATION COMPLETE."); playSound("success");
  };

  // --- ACTIONS ---
  const handleReceipt = async () => { if (receiptOpen) { setReceiptOpen(false); return; } setReceiptOpen(true); playSound("print"); if (!analysisText) { setIsAnalyzing(true); const result = await generateDeepAnalysis(processedText); setAnalysisText(result); setIsAnalyzing(false); playSound("success"); } };
  const copyToClipboard = (e: React.MouseEvent) => { e.stopPropagation(); navigator.clipboard.writeText(processedText); addLog("COPIED TO CLIPBOARD"); playSound("success"); };
  
  // --- NEW: THE BRIDGE ---
  const handleBridge = () => {
      setIsTransferring(true);
      addLog("INITIATING HANDSHAKE PROTOCOL...");
      playSound("modem");
      
      // Simulate Data Upload
      setTimeout(() => {
          // Construct URL for TIO (Assuming standard structure, update with real URL)
          const baseUrl = "https://truthis-optional.vercel.app"; 
          const query = encodeURIComponent(processedText);
          window.open(`${baseUrl}?input=${query}`, "_blank");
          setIsTransferring(false);
          addLog("DATA TRANSFERRED TO PERCEPTION LAYER.");
      }, 1500);
  };

  return (
    <div className={`fixed inset-0 bg-[#050505] text-zinc-500 font-mono overflow-hidden select-none ${crtMode ? "crt-effect" : ""}`}>
      {subliminal && <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center mix-blend-difference pointer-events-none"><h1 className="text-black font-black text-9xl tracking-tighter scale-150">{subliminal}</h1></div>}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />
      {/* 4. ATMOSPHERE */}
      {crtMode && <div className="absolute inset-0 z-[60] pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/18/Scan_lines.png')] opacity-10 mix-blend-overlay bg-repeat"></div>}
      <div className={`absolute inset-0 pointer-events-none z-0 opacity-5 radial-gradient ${theme.glow}`}></div>
      <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <header className="absolute top-0 w-full p-4 md:p-6 flex justify-between items-start z-40 border-b border-zinc-900/50 bg-black/50 backdrop-blur-sm">
        <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-zinc-600">System Status</span>
            <span className={`text-xs ${theme.color} flex items-center gap-2`}>
                <span className={`w-2 h-2 ${theme.glow.replace("/10", "")} rounded-full animate-pulse`}></span>
                ONLINE // MODE: {vector}
            </span>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-end">
            <button onClick={() => setCrtMode(!crtMode)} className={`text-[10px] uppercase border px-3 py-1 rounded-full transition-all ${crtMode ? `${theme.border} ${theme.color} ${theme.glow}` : "border-zinc-800 hover:border-zinc-600"}`}>CRT: {crtMode ? "ON" : "OFF"}</button>
            <button onClick={() => setShowGuide(!showGuide)} className={`text-[10px] uppercase border px-3 py-1 rounded-full transition-all ${showGuide ? `${theme.border} ${theme.color} ${theme.glow}` : "border-zinc-800 hover:border-zinc-600"}`}>GUIDE: {showGuide ? "ON" : "OFF"}</button>
            <button onClick={onExit} className="text-[10px] uppercase hover:text-red-500 transition-colors border border-transparent hover:border-red-900 px-3 py-1 rounded-full">EXIT</button>
        </div>
      </header>

      <main className="absolute inset-0 flex items-center justify-center pt-16 pb-12">
        <div className="absolute w-full h-[1px] bg-zinc-900"></div>
        <div className={`absolute w-full h-[1px] ${theme.glow.replace("/10", "")} transition-all duration-[500ms] ease-linear opacity-50 ${phase === "INPUT" ? "w-0" : "w-full"}`}></div>

        {phase === "INPUT" && (
            <div className="relative z-10 flex flex-col items-center justify-center gap-6 animate-in fade-in zoom-in duration-500 w-full max-w-2xl p-4 h-full overflow-y-auto">
                <div className="w-full flex gap-2 justify-center flex-wrap mb-4">
                    {PRESETS.map((preset, i) => <button key={i} onClick={() => setInputText(preset)} className="text-[9px] border border-zinc-800 px-3 py-2 rounded-lg hover:bg-zinc-900 hover:text-white transition-colors uppercase tracking-wider">Preset {i + 1}</button>)}
                </div>
                <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="TYPE BELIEF HERE..." className={`bg-transparent text-center text-lg md:text-3xl text-white outline-none placeholder-zinc-800 font-bold uppercase tracking-widest w-full border-b border-zinc-900 pb-4 focus:${theme.border} transition-colors`} autoFocus />
                {inputText && (
                    <div className="grid grid-cols-2 gap-4 w-full text-[10px] font-mono border-b border-zinc-900 pb-8">
                        <div><div className="flex justify-between mb-1"><span>COMPLEXITY</span> <span>{Math.round(complexity)}%</span></div><div className="w-full h-1 bg-zinc-900 rounded"><div className="h-full bg-zinc-500 rounded" style={{width: `${complexity}%`}}></div></div></div>
                        <div><div className="flex justify-between mb-1"><span>VIRALITY</span> <span>{Math.round(virality)}%</span></div><div className={`w-full h-1 bg-zinc-900 rounded`}><div className={`h-full ${theme.glow.replace("/10", "")} rounded`} style={{width: `${virality}%`}}></div></div></div>
                    </div>
                )}
                <div className="w-full">
                    <div className="flex justify-between items-center mb-4"><label className="text-[10px] uppercase text-zinc-500">System Configuration</label><button onClick={() => setShowAdvanced(!showAdvanced)} className={`text-[9px] ${theme.color} hover:underline uppercase`}>{showAdvanced ? "Hide Advanced" : "Show Advanced Operator"}</button></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                        <div className="flex flex-col gap-2"><label className="text-[9px] uppercase text-zinc-600">Framing Vector</label><div className="flex flex-wrap gap-2">{VECTORS.map(v => (<button key={v} onClick={() => setVector(v)} className={`text-[9px] border px-2 py-2 rounded transition-all flex-1 ${vector === v ? `${theme.border} ${theme.color} ${theme.glow}` : "border-zinc-800 text-zinc-600 hover:border-zinc-600"}`}>{v}</button>))}</div></div>
                        <div className="flex flex-col gap-2"><label className="text-[9px] uppercase text-zinc-600">Recursive Loops: {generations}</label><input type="range" min="1" max="5" value={generations} onChange={(e) => setGenerations(parseInt(e.target.value))} className={`w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer mt-2 accent-current ${theme.color}`} /></div>
                    </div>
                    {showAdvanced && (<div className="mt-6 p-4 border border-zinc-800 bg-zinc-900/20 rounded animate-in fade-in slide-in-from-top-2"><label className="text-[9px] uppercase text-red-500 mb-2 block">System Entropy (Chaos): {entropy}%</label><input type="range" min="0" max="100" value={entropy} onChange={(e) => setEntropy(parseInt(e.target.value))} className="w-full accent-red-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer" /></div>)}
                </div>
                {inputText && <button onClick={runSimulation} className={`mt-8 group relative w-full md:w-auto px-12 py-4 bg-white text-black hover:${theme.glow.replace("/10", "")} hover:text-white transition-all font-bold tracking-widest text-xs uppercase`}>INITIALIZE SEQUENCE</button>}
                {history.length > 0 && (
                    <div className="w-full mt-12 pt-8 border-t border-zinc-900">
                        <div className="flex justify-between items-center mb-4"><div className="text-[10px] uppercase tracking-widest text-zinc-600">Neural Memory</div><button onClick={() => { setHistory([]); localStorage.removeItem("framework_history"); }} className="text-[9px] text-red-900 hover:text-red-500">CLEAR MEMORY</button></div>
                        <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">{history.map((item) => (<div key={item.id} className="flex justify-between items-center text-[10px] border border-zinc-900 p-2 rounded hover:border-zinc-700 cursor-pointer bg-black/50" onClick={() => { setProcessedText(item.output); setInputText(item.input); setPhase("OUTCOME"); }}><span className="text-zinc-500 truncate w-1/3">{item.input}</span><span className="text-zinc-700">&rarr;</span><span className="text-zinc-300 truncate w-1/3">{item.output}</span><span className={VECTOR_THEMES[item.vector as FramingVector].color}>{item.vector}</span></div>))}</div>
                    </div>
                )}
            </div>
        )}

        {(phase === "INFRASTRUCTURE" || phase === "PERCEPTION" || phase === "CONFLICT") && (
            <div className="relative z-10 w-full text-center px-4">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-600">CYCLE {currentGen} / {generations}</div>
                <div className={`text-2xl md:text-5xl font-bold transition-all duration-300 uppercase whitespace-pre-wrap ${phase === "INFRASTRUCTURE" ? `tracking-tighter ${theme.color} scale-90` : ""} ${phase === "PERCEPTION" ? "blur-[2px] text-white opacity-80 scale-100 skew-x-12" : ""} ${phase === "CONFLICT" ? "text-red-600 font-black tracking-widest scale-110 animate-pulse" : ""}`}>
                    {phase === "PERCEPTION" ? <span className="relative"><span className="absolute -left-1 opacity-50 text-red-500 mix-blend-screen">{inputText}</span><span className="absolute -right-1 opacity-50 text-blue-500 mix-blend-screen">{inputText}</span>{inputText}</span> : inputText}
                </div>
                <div className="absolute top-32 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Processing: {PHASES.find(p => p.id === phase)?.sub || phase}</div>
            </div>
        )}

        {phase === "OUTCOME" && (
            <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center p-4">
                <div onClick={handleReceipt} className={`bg-white text-black p-8 font-mono text-xs md:text-sm w-full max-w-md shadow-2xl transition-all duration-500 relative cursor-pointer group ${receiptOpen ? "scale-100" : "scale-90 hover:scale-95"}`} style={{ filter: "drop-shadow(0px 0px 20px rgba(255,255,255,0.1))" }}>
                    <div className="absolute -top-2 left-0 w-full h-4 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] clip-path-jagged"></div>
                    <div className="text-center border-b-2 border-black pb-4 mb-4 border-dashed">
                        <div className="text-xl font-black tracking-tighter mb-1">FRAMEWORK_LOG</div>
                        <div className="text-[10px] uppercase">Infrastructure Analysis Report</div>
                        <div className="text-[10px] mt-2">{new Date().toLocaleString()}</div>
                    </div>
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between border-b border-zinc-300 pb-1"><span>INPUT_HASH:</span><span className="font-bold truncate max-w-[150px]">{inputText}</span></div>
                        <div className="flex justify-between border-b border-zinc-300 pb-1"><span>VECTOR:</span><span className="font-bold">{vector}</span></div>
                        <div className="py-4 text-center">
                            <div className="text-[10px] uppercase text-zinc-500 mb-2">SURVIVOR VARIANT</div>
                            <div className="text-xl md:text-2xl font-black uppercase leading-tight">
                                <CipherText text={processedText} reveal={true} />
                            </div>
                        </div>
                    </div>
                    {receiptOpen && (<div className="border-t-2 border-black border-dashed pt-4 mb-6 animate-in fade-in slide-in-from-top-4"><div className="font-bold mb-2">SYSTEM_ANALYSIS:</div>{isAnalyzing ? (<div className="animate-pulse">PRINTING...</div>) : (<div className="whitespace-pre-wrap leading-relaxed">{analysisText}</div>)}</div>)}
                    <div className="text-center pt-4 border-t-2 border-black border-dashed"><div className="font-bold text-lg barcode font-libre">||| || ||| | |||| |||</div>{!receiptOpen && <div className="text-[10px] text-zinc-500 mt-2 animate-pulse">[ CLICK TO EXPAND DETAILS ]</div>}</div>
                </div>
                
                <div className="mt-12 flex gap-4 flex-wrap justify-center">
                    {/* THE BRIDGE BUTTON */}
                    <button 
                        onClick={handleBridge} 
                        disabled={isTransferring}
                        className={`text-xs text-purple-400 hover:text-white uppercase tracking-widest border border-purple-900 hover:bg-purple-900 px-4 py-2 rounded flex items-center gap-2 transition-all ${isTransferring ? "opacity-50 cursor-wait" : ""}`}
                    >
                        {isTransferring ? (
                            <>
                                <span className="animate-spin">⟳</span> UPLOADING...
                            </>
                        ) : (
                            <>
                                <span>⚡</span> TEST IN PERCEPTION LAYER
                            </>
                        )}
                    </button>

                    <button onClick={() => setShowArtifact(true)} className={`text-xs ${theme.color} hover:text-white uppercase tracking-widest border border-current hover:bg-white/10 px-4 py-2 rounded`}>GENERATE POSTER</button>
                    <button onClick={copyToClipboard} className="text-xs text-zinc-500 hover:text-white uppercase tracking-widest border border-zinc-800 hover:border-zinc-600 px-4 py-2 rounded">COPY TEXT</button>
                    <button onClick={() => { setPhase("INPUT"); setInputText(""); setLogs([]); setGenerations(1); setReceiptOpen(false); }} className="text-xs text-white bg-zinc-900 border border-zinc-800 px-6 py-2 hover:border-white transition-all uppercase tracking-widest">RESET</button>
                </div>
            </div>
        )}

        {/* --- ARTIFACT OVERLAY --- */}
        {showArtifact && <ArtifactGenerator text={processedText} vector={vector} onClose={() => setShowArtifact(false)} />}
      </main>

      <footer className="absolute bottom-0 w-full border-t border-zinc-900 bg-black p-2 overflow-hidden">
        <div className="flex gap-8 items-center text-[10px] font-mono whitespace-nowrap overflow-x-hidden">
            <span className={`${theme.color} font-bold ml-4`}>SYSTEM_LOG &gt;</span>
            <div className="flex gap-8 opacity-70">{logs.map((log, i) => <span key={i} className="first:text-white">{log}</span>)}</div>
        </div>
      </footer>
    </div>
  );
}