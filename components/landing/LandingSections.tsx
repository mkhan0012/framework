"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

// --- UTILS ---
const useOnScreen = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Trigger once
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return [ref, isVisible] as const;
};

const AnimatedSection = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
  return (
    <div ref={ref} className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"} ${className}`}>
      {isVisible ? children : null}
    </div>
  );
};

// --- SECTION 0: BOOT ---
export const SectionBoot = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const s1 = setTimeout(() => setStep(1), 600); // Title
    const s2 = setTimeout(() => setStep(2), 1500); // Status 1
    const s3 = setTimeout(() => setStep(3), 1750); // Status 2
    const s4 = setTimeout(() => setStep(4), 2000); // Status 3
    const s5 = setTimeout(() => setStep(5), 3800); // Subtext

    return () => { clearTimeout(s1); clearTimeout(s2); clearTimeout(s3); clearTimeout(s4); clearTimeout(s5); };
  }, []);

  return (
    <section className="h-screen flex flex-col items-center justify-center text-center p-8">
      <div className={`transition-opacity duration-900 ease-linear-system ${step >= 1 ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2">FRAMEWORK</h1>
        <p className="text-sm md:text-base tracking-[0.2em] text-zinc-500 uppercase">How Beliefs Are Engineered</p>
      </div>

      <div className="mt-12 space-y-2 font-mono text-xs md:text-sm text-zinc-400">
        <div className={`transition-opacity duration-0 ${step >= 2 ? "opacity-100" : "opacity-0"}`}>
          SYSTEM STATUS: ACTIVE
        </div>
        <div className={`transition-opacity duration-0 ${step >= 3 ? "opacity-100" : "opacity-0"}`}>
          OBSERVATION MODE: ENABLED
        </div>
        <div className={`transition-opacity duration-0 ${step >= 4 ? "opacity-100" : "opacity-0"}`}>
          MORAL OUTPUT: DISABLED
        </div>
      </div>

      <div className={`mt-24 text-[10px] uppercase tracking-widest text-zinc-600 transition-opacity duration-1000 ${step >= 5 ? "opacity-100" : "opacity-0"}`}>
        Beliefs are processed continuously.
      </div>
    </section>
  );
};

// --- SECTION 1: PREMISE ---
export const SectionPremise = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
  const [text, setText] = useState("");
  const fullText = "Statement / Claim / Opinion";

  useEffect(() => {
    if (isVisible && text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, text]);

  return (
    <section ref={ref} className="min-h-[80vh] flex flex-col justify-center max-w-2xl mx-auto p-8 border-l border-zinc-900 ml-4 md:ml-auto">
      <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <h2 className="text-xl mb-8 font-bold">Belief Pipeline Detected</h2>
        
        <div className="space-y-4 font-mono text-xs text-zinc-400 mb-12 border-l-2 border-zinc-800 pl-4 py-2">
          <div>INPUT TYPE: <span className="text-white">{text}</span><span className="cursor-blink">_</span></div>
          <div>PROCESS MODE: Deterministic Simulation</div>
          <div>OUTPUT TYPE: Dominant Belief Variant</div>
        </div>

        <div className={`space-y-6 text-lg md:text-xl leading-relaxed transition-opacity duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <p>Beliefs do not propagate unchanged.</p>
          <p>Each system modifies them based on survivability, not accuracy.</p>
          <p>FRAMEWORK visualizes this process.</p>
        </div>

        <div className={`mt-16 text-[10px] bg-zinc-900 w-fit px-2 py-1 text-zinc-500 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          TRUTH VALIDATION: NOT REQUIRED
        </div>
      </div>
    </section>
  );
};

// --- SECTION 2: LAYERS ---
export const SectionLayers = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-32 max-w-4xl mx-auto p-8">
       <div className={`transition-all duration-700 ease-linear-system border-t border-white mb-8 ${isVisible ? "w-full" : "w-0"}`} />
       
       <div className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
         <h2 className="text-2xl mb-2">Truth Operates in Three Layers</h2>
         <div className="flex flex-col md:flex-row gap-8 md:gap-24 mt-12 text-zinc-500 font-mono text-sm">
            <span>L1 — Conflict</span>
            <span>L2 — Perception</span>
            <span>L3 — Infrastructure</span>
         </div>
         <p className="mt-8 text-xs text-zinc-600 uppercase tracking-widest">
           Each layer transforms belief before passing it forward.
         </p>
       </div>
    </section>
  );
};

// --- SUB-SECTIONS L1, L2, L3 ---
export const SectionLayerDetail = ({ 
  layer, 
  title, 
  metrics, 
  body, 
  note, 
  btn,
  delay = 0 
}: any) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.3 });

  return (
    <section ref={ref} className="min-h-[60vh] flex flex-col justify-center max-w-3xl mx-auto p-8 my-16">
      <div className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: `${delay}ms` }}>
        <div className="text-zinc-500 text-xs mb-2">{layer}</div>
        <h3 className="text-4xl font-bold mb-8">{title}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[10px] font-mono text-zinc-400 mb-12 border-y border-zinc-900 py-4">
          {Object.entries(metrics).map(([k, v]: any) => (
             <div key={k}><span className="text-zinc-600 block mb-1">{k}</span> {v}</div>
          ))}
        </div>

        <div className="space-y-4 text-lg text-zinc-300 max-w-xl">
          {body.map((p: string, i: number) => <p key={i}>{p}</p>)}
        </div>

        <div className="mt-12 flex items-end justify-between">
           <div className="text-[10px] bg-zinc-900 px-2 py-1 text-zinc-500">
             MODEL: {note}
           </div>
           <button className="border border-zinc-800 px-6 py-2 text-xs hover:bg-white hover:text-black transition-colors duration-300">
             {btn}
           </button>
        </div>
      </div>
    </section>
  );
};

// --- SECTION 3: DATA ---
export const SectionData = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.4 });
  const [counts, setCounts] = useState({ 
    emotion: 0, complexity: 0, visibility: 0, credibility: 0, entropy: 0 
  });

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCounts(prev => ({
        emotion: Math.min(0.73, prev.emotion + 0.01),
        complexity: Math.min(0.21, prev.complexity + 0.01),
        visibility: Math.min(0.84, prev.visibility + 0.01),
        credibility: Math.min(0.42, prev.credibility + 0.01),
        entropy: Math.min(0.67, prev.entropy + 0.01)
      }));
    }, 10);
    return () => clearInterval(interval);
  }, [isVisible]);

  const fmt = (n: number) => n.toFixed(2);

  return (
    <section ref={ref} className="py-32 max-w-2xl mx-auto p-8">
      <h2 className="text-xl mb-12">Belief State Variables</h2>
      <div className="space-y-4 font-mono text-sm">
        <div className="flex justify-between border-b border-zinc-900 pb-2"><span>emotion_intensity</span> <span>{fmt(counts.emotion)}</span></div>
        <div className="flex justify-between border-b border-zinc-900 pb-2"><span>complexity</span> <span>{fmt(counts.complexity)}</span></div>
        <div className="flex justify-between border-b border-zinc-900 pb-2"><span>visibility</span> <span>{fmt(counts.visibility)}</span></div>
        <div className="flex justify-between border-b border-zinc-900 pb-2"><span>credibility</span> <span>{fmt(counts.credibility)}</span></div>
        <div className="flex justify-between border-b border-zinc-900 pb-2"><span>entropy</span> <span>{fmt(counts.entropy)}</span></div>
      </div>
      <div className={`mt-12 text-xs text-zinc-500 transition-opacity duration-1000 delay-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <p>These variables determine movement.</p>
        <p className="mt-2">Truth value is not included.</p>
      </div>
      <div className="mt-8 text-[10px] text-zinc-700">EVALUATION AXIS: ABSENT</div>
    </section>
  );
};

// --- SECTION 4: ENGINES ---
export const SectionEngines = () => {
    const engines = [
        { name: "Framing Engine", func: "Emotional Reweighting" },
        { name: "Amplification Engine", func: "Engagement Propagation" },
        { name: "Suppression Engine", func: "Visibility Decay" },
        { name: "Mutation Engine", func: "Entropy Optimization" }
    ];
    
    return (
        <section className="py-32 max-w-3xl mx-auto p-8">
            <h2 className="text-xl mb-16">Active Engines</h2>
            <div className="space-y-12">
                {engines.map((eng, i) => (
                    <EngineCard key={i} data={eng} />
                ))}
            </div>
        </section>
    )
}

const EngineCard = ({ data }: any) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.5 });
    return (
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <h3 className="text-2xl font-bold mb-2">{data.name}</h3>
            <div className="flex gap-8 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                <span className={`transition-opacity duration-1000 ${isVisible ? "animate-pulse" : ""}`}>STATUS: RUNNING</span>
                <span>FUNCTION: {data.func}</span>
            </div>
        </div>
    )
}

// --- SECTION 5: SNAPSHOT ---
export const SectionSnapshot = () => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.5 });
    const [showOutput, setShowOutput] = useState(false);

    useEffect(() => {
        if (isVisible) {
            const t = setTimeout(() => setShowOutput(true), 1500);
            return () => clearTimeout(t);
        }
    }, [isVisible]);

    return (
        <section ref={ref} className="py-32 bg-zinc-900/20 p-8">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-12">Recent Simulation</h2>
                
                <div className="min-h-[120px] mb-12">
                    {!showOutput ? (
                        <div className="animate-in fade-in duration-300">
                            <div className="text-[10px] text-zinc-600 mb-2">INITIAL BELIEF</div>
                            <div className="text-2xl text-white">"AI will replace most jobs."</div>
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-300">
                            <div className="text-[10px] text-[#ff3333] mb-2">DOMINANT VARIANT</div>
                            <div className="text-3xl font-bold text-white">"Your job is at risk."</div>
                        </div>
                    )}
                </div>

                <div className={`grid grid-cols-3 gap-4 border-t border-zinc-800 pt-8 transition-opacity duration-1000 delay-500 ${showOutput ? "opacity-100" : "opacity-0"}`}>
                     <div>
                        <div className="text-[10px] text-zinc-600">MUTATION CYCLES</div>
                        <div className="text-lg">6</div>
                     </div>
                     <div>
                        <div className="text-[10px] text-zinc-600">NUANCE LOSS</div>
                        <div className="text-lg">82%</div>
                     </div>
                     <div>
                        <div className="text-[10px] text-zinc-600">EMOTIONAL GAIN</div>
                        <div className="text-lg text-[#ff3333]">+41%</div>
                     </div>
                </div>
                 <div className={`mt-8 text-[10px] text-zinc-700 transition-opacity duration-1000 delay-1000 ${showOutput ? "opacity-100" : "opacity-0"}`}>
                    ORIGINAL BELIEF: NOT DETECTABLE
                 </div>
            </div>
        </section>
    )
}

// --- SECTION 6: CONNECTION ---
export const SectionConnection = () => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.4 });
    
    return (
        <section ref={ref} className="py-32 max-w-xl mx-auto p-8 text-center">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-16">System Flow</h2>
            
            <div className="flex flex-col items-center gap-2 font-bold text-xl">
                 <div className={`transition-opacity duration-700 delay-0 ${isVisible ? "opacity-100" : "opacity-0"}`}>FRAMEWORK</div>
                 <div className={`h-8 w-[1px] bg-zinc-700 transition-all duration-700 delay-300 ${isVisible ? "h-8" : "h-0"}`}></div>
                 <div className={`transition-opacity duration-700 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>TRUTH IS OPTIONAL</div>
                 <div className={`h-8 w-[1px] bg-zinc-700 transition-all duration-700 delay-700 ${isVisible ? "h-8" : "h-0"}`}></div>
                 <div className={`transition-opacity duration-700 delay-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>ARGUELY</div>
            </div>

            <div className={`mt-16 space-y-4 text-zinc-500 transition-opacity duration-1000 delay-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <p>FRAMEWORK determines survival.</p>
                <p>TRUTH IS OPTIONAL determines perception.</p>
                <p>ARGUELY determines defense.</p>
            </div>
        </section>
    )
}

// --- SECTION 7: NEGATIVE ---
export const SectionNegative = () => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.4 });
    const items = [
        "Does not verify facts",
        "Does not educate",
        "Does not persuade",
        "Does not correct beliefs"
    ];

    return (
        <section ref={ref} className="py-32 max-w-2xl mx-auto p-8">
            <h2 className="text-2xl mb-12">System Limitations</h2>
            <div className="space-y-4">
                {items.map((item, i) => (
                    <div key={i} className={`flex items-center gap-4 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: `${i * 100}ms` }}>
                        <span className="text-zinc-600">✓</span>
                        <span className="text-zinc-300">{item}</span>
                    </div>
                ))}
            </div>
            <div className={`mt-12 text-sm text-zinc-500 transition-opacity duration-1000 delay-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                Systems do not need intention to shape outcomes.
            </div>
        </section>
    )
}

// --- SECTION 8: ENTRY ---
export const SectionEntry = () => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

    return (
        <section ref={ref} className="min-h-[50vh] flex flex-col justify-center max-w-4xl mx-auto p-8">
             <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-12">Select Interaction Mode</h2>
             
             <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                 <EntryButton label="[ ARGUE ]" desc="Conflict Simulation" />
                 <EntryButton label="[ PERCEIVE ]" desc="Perception Distortion" />
                 <EntryButton label="[ OBSERVE ]" desc="System Mechanics" />
             </div>

             <div className={`mt-24 text-center text-[10px] uppercase text-zinc-800 transition-opacity duration-1000 delay-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                USER INTENT: OPTIONAL
             </div>
        </section>
    )
}

const EntryButton = ({ label, desc }: any) => (
    <button className="group border border-zinc-800 p-8 text-left hover:bg-white hover:border-white transition-colors duration-300">
        <div className="font-bold text-lg mb-2 group-hover:text-black">{label}</div>
        <div className="text-xs text-zinc-500 group-hover:text-zinc-600">{desc}</div>
    </button>
)