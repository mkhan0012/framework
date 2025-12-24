"use client";

import SystemModel from "@/components/SystemModel";

export default function AboutSystem({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-mono relative overflow-x-hidden">
      
      {/* Background System (Quiet Mode) */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <SystemModel phase="ORIGIN" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-8 pt-24">
        
        {/* NAV */}
        <button onClick={onBack} className="fixed top-8 left-8 text-xs uppercase tracking-widest hover:text-white transition-colors">
            &lt; Return to Index
        </button>

        {/* 1. IDENTIFICATION */}
        <section className="mb-32 border-l-2 border-zinc-800 pl-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">FRAMEWORK</h1>
            <div className="text-sm text-zinc-500 uppercase tracking-widest">
                Belief Infrastructure Simulator<br/>
                Final Chapter — The Architecture of Truth
            </div>
        </section>

        {/* 2. TRILOGY CONTEXT */}
        <section className="mb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContextCard label="L1. CONFLICT" desc="Truth under pressure." sub="ARGUELY" />
            <ContextCard label="L2. PERCEPTION" desc="Truth under distortion." sub="TRUTH IS OPTIONAL" />
            <ContextCard label="L3. INFRASTRUCTURE" desc="Truth under systems." sub="FRAMEWORK" active />
        </section>

        {/* 3. PIPELINE STATEMENT */}
        <section className="mb-32 text-center">
            <p className="text-xl md:text-3xl leading-relaxed text-white">
                "Belief does not travel unchanged.<br/>
                It is transformed by <span className="text-blue-500">environment pressure</span>."
            </p>
        </section>

        {/* 4. ENGINE SPECS */}
        <section className="mb-32">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-8 border-b border-zinc-900 pb-4">Core Engines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EngineSpec label="FRAMING ENGINE" desc="Applies emotional weight to neutral facts to increase engagement surface." />
                <EngineSpec label="AMPLIFICATION ENGINE" desc="Selects high-velocity variants for network propagation." />
                <EngineSpec label="SUPPRESSION ENGINE" desc="Reduces visibility of low-entropy or nuanced signals." />
                <EngineSpec label="MUTATION ENGINE" desc="Optimizes belief structure for survival, removing complexity." />
            </div>
        </section>

        {/* 5. CLOSING */}
        <section className="pb-32 text-center">
            <div className="inline-block border border-zinc-800 p-8 bg-black/50 backdrop-blur-md">
                <p className="text-sm text-zinc-400 mb-4">SYSTEM INTENT</p>
                <p className="text-lg md:text-xl text-white font-bold">
                    "FRAMEWORK does not define truth.<br/>
                    It reveals the environment that produces it."
                </p>
            </div>
        </section>

      </div>
    </div>
  );
}

const ContextCard = ({ label, desc, sub, active }: any) => (
    <div className={`p-6 border ${active ? "border-blue-900 bg-blue-950/10" : "border-zinc-800 bg-zinc-900/20"}`}>
        <div className="text-[10px] text-zinc-500 mb-2">{label}</div>
        <div className="text-lg font-bold text-white mb-4">{desc}</div>
        <div className="text-[10px] font-mono text-zinc-600">{sub}</div>
    </div>
);

const EngineSpec = ({ label, desc }: any) => (
    <div className="p-4 border-l border-zinc-800 hover:border-white transition-colors duration-500">
        <div className="text-xs font-bold text-white mb-2">{label}</div>
        <div className="text-sm text-zinc-400">{desc}</div>
    </div>
);