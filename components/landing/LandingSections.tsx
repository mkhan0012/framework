"use client";

import { useState, useEffect, useRef } from "react";

// --- UTILS ---
const useOnScreen = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); 
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return [ref, isVisible] as const;
};

// --- 1. HERO ---
export const SectionHero = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center p-8 bg-black relative overflow-hidden text-center border-b border-zinc-900">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className={`transition-all duration-1000 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-8 max-w-5xl leading-tight">
          TRUTH IS NOT BROKEN.<br/>IT IS ENGINEERED.
        </h1>
      </div>
      <div className={`transition-all duration-1000 delay-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <p className="text-sm md:text-base text-zinc-500 font-mono max-w-xl mx-auto leading-relaxed">
          What you believe did not arrive untouched. It passed through systems built to shape it, reward it, distort it, and harden it.
        </p>
      </div>
    </section>
  );
};

// --- 2. ORIGIN ---
export const SectionOrigin = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
  return (
    <section ref={ref} className="py-32 px-8 border-t border-zinc-900 bg-black">
      <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="text-xs text-zinc-600 uppercase tracking-widest mb-12 border-b border-zinc-900 pb-4">
            Series Model: Layered Belief Environment
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
                <h2 className="text-2xl font-bold text-white mb-6">How this project began</h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                    I didn’t start with three projects. I started with a question: <span className="text-zinc-200 italic">“If people are fighting online, why does every argument feel predictable?”</span>
                </p>
            </div>
            <div className="flex flex-col justify-center space-y-4 font-mono text-sm">
                <div className="p-4 border border-zinc-800 text-zinc-300"><span className="text-red-500 mr-2">1. Conflict</span> → Where beliefs are defended</div>
                <div className="p-4 border border-zinc-800 text-zinc-300"><span className="text-purple-500 mr-2">2. Perception</span> → Where beliefs are shaped</div>
                <div className="p-4 border border-zinc-800 text-zinc-300"><span className="text-blue-500 mr-2">3. Infrastructure</span> → Where beliefs survive</div>
            </div>
        </div>
      </div>
    </section>
  );
};

// --- 3. WHY ---
export const SectionWhy = () => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
    return (
        <section ref={ref} className="py-32 px-8 border-t border-zinc-900 bg-zinc-900/5">
            <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">Why Three? Why Not One?</h2>
                <p className="text-lg text-zinc-400 mb-12 leading-relaxed">Because truth does not fail in one place. <span className="text-white">It fails in sequence.</span></p>
                <p className="text-zinc-500 text-sm max-w-xl mx-auto">The trilogy was designed as a pipeline. Not fiction. Not metaphor. A functional simulation of what actually happens to belief online.</p>
            </div>
        </section>
    )
}

// --- 4. TRIO ---
export const SectionTrio = () => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
        <section ref={ref} className="py-32 px-8 border-t border-zinc-900 bg-black">
             <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-800 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <TrioCard num="01" title="ARGUELY" sub="Truth Under Conflict" desc="A pressure chamber where beliefs collide." color="text-red-500" mode="CONFLICT OPTIMIZATION" link="https://debate-again.vercel.app" />
                <TrioCard num="02" title="TRUTH IS OPTIONAL" sub="Truth Under Perception" desc="Information shifts as you scroll." color="text-purple-500" mode="PERCEPTION DISTORTION" link="https://truthis-optional.vercel.app" />
                <TrioCard num="03" title="FRAMEWORK" sub="Truth Under Systems" desc="The root layer. It simulates the environment that decides which beliefs survive." color="text-blue-500" mode="SURVIVAL MECHANICS" active />
             </div>
        </section>
    )
}

const TrioCard = ({ num, title, sub, desc, color, mode, link, active }: any) => (
    <div className={`p-8 md:p-12 border-b md:border-b-0 md:border-r border-zinc-800 hover:bg-zinc-900/20 transition-colors ${active ? "bg-blue-950/5" : ""}`}>
        <div className={`${color} font-bold text-xl mb-4`}>{num}. {title}</div>
        <h3 className="text-white text-lg mb-6">{sub}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-8">{desc}</p>
        <div className={`text-[10px] font-mono uppercase tracking-widest text-zinc-600 pt-8 border-t border-zinc-800 ${active ? "animate-pulse text-blue-500" : ""}`}>MODE: {mode}</div>
        {link && <a href={link} target="_blank" className="block mt-4 text-xs font-mono text-zinc-500 hover:text-white">&nearr; ENTER</a>}
    </div>
)

// --- 5. PIPELINE ---
export const SectionPipeline = () => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.3 });
    return (
        <section ref={ref} className="py-32 px-8 border-t border-zinc-900 bg-black">
            <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-16 text-center">How The Three Work Together</h2>
                <div className="relative border-l border-zinc-800 ml-4 md:ml-0 space-y-16">
                    <PipelineStep label="Input" desc="A belief enters the world." sub='“AI will replace jobs.”' color="bg-white" />
                    <PipelineStep label="STAGE 1 — FRAMEWORK" desc="The system frames, shortens, and emotionalizes the belief." sub="Transmission fitness increases." color="bg-blue-500" text="text-blue-500" />
                    <PipelineStep label="STAGE 2 — TRUTH IS OPTIONAL" desc="The belief meets interfaces. Different people see different versions." sub="Perception manufactures conviction." color="bg-purple-500" text="text-purple-500" />
                    <PipelineStep label="STAGE 3 — ARGUELY" desc="The belief meets resistance. Conflict hardens it." sub="Defended → Strengthened." color="bg-red-500" text="text-red-500" />
                    <div className="pl-12 relative"><div className="inline-block border border-zinc-800 bg-zinc-900/50 p-4 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Output: Original Variant No Longer Detectable</div></div>
                </div>
            </div>
        </section>
    )
}

const PipelineStep = ({ label, desc, sub, color, text }: any) => (
    <div className="pl-12 relative">
        <span className={`absolute -left-[5px] top-0 w-2 h-2 ${color} rounded-full`}></span>
        <div className={`${text || "text-white"} font-mono text-xs mb-2 uppercase`}>{label}</div>
        <p className="text-zinc-300 mb-2">{desc}</p>
        <p className="text-zinc-500 text-sm">{sub}</p>
    </div>
)

// --- 6. MECHANIC ---
export const SectionMechanic = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.4 });
  return (
    <section ref={ref} className="py-32 px-8 bg-black border-t border-zinc-900">
        <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <div>
                <h2 className="text-4xl font-bold text-white mb-8">What Framework Actually Simulates</h2>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8">Framework models four mechanical processes: Framing, Amplification, Suppression, and Mutation. It visualizes why certain beliefs refuse to die.</p>
                <div className="space-y-4">
                    <MechanicItem label="Deterministic Core" desc="Mathematical rules control the simulation. No hallucination." />
                    <MechanicItem label="AI Visualization" desc="AI is used only to render the text. It does not decide the outcome." />
                </div>
            </div>
            <div className="border border-zinc-800 bg-zinc-900/20 p-8 font-mono text-xs text-zinc-500">
                <div className="mb-4 text-white">SYSTEM_LOGIC_PREVIEW</div>
                <div className="space-y-2">
                    <div className="flex justify-between"><span>INPUT_BELIEF</span> <span className="text-zinc-300">"Climate Change"</span></div>
                    <div className="flex justify-between"><span>PROCESS: FRAMING</span> <span className="text-blue-500">APPLYING_FEAR_BIAS</span></div>
                    <div className="flex justify-between"><span>PROCESS: MUTATION</span> <span className="text-purple-500">REDUCING_COMPLEXITY</span></div>
                    <div className="flex justify-between pt-4 border-t border-zinc-800"><span>OUTPUT_VARIANT</span> <span className="text-white">"THEY ARE DESTROYING YOUR HOME"</span></div>
                </div>
            </div>
        </div>
    </section>
  );
};

const MechanicItem = ({ label, desc }: any) => (
    <div className="pl-4 border-l-2 border-zinc-800">
        <div className="text-white font-bold text-sm mb-1">{label}</div>
        <div className="text-zinc-500 text-xs">{desc}</div>
    </div>
)

// --- 7. SCHEMATIC (2D Interactive) ---
export const SectionSchematic = () => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.4 });
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    const DESCRIPTIONS: any = {
        CORE: "SYSTEM ROLE: INFRASTRUCTURE PRIORITIZATION. Determines which variants remain.",
        FRAMING: "FUNCTION: ENGAGEMENT REBALANCING. Reweights emotional salience.",
        AMPLIFICATION: "FUNCTION: PROPAGATION SELECTION. Expands signal reach.",
        SUPPRESSION: "FUNCTION: STABILITY PRESERVATION. Reduces visibility through friction.",
        MUTATION: "FUNCTION: SURVIVAL OPTIMIZATION. Simplifies and emotionalizes.",
        TIO: "OUTPUT: PERCEPTION LAYER. Distortion applied.",
        ARGUELY: "OUTPUT: CONFLICT LAYER. Rigidity increased."
    };

    return (
        <section ref={ref} className="min-h-screen bg-black flex flex-col items-center justify-center p-8 border-t border-zinc-900 relative">
             <div className="text-xs uppercase tracking-widest text-zinc-500 mb-12">System Map [ Hover Nodes ]</div>
             <div className={`relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none stroke-zinc-800" strokeWidth="1">
                    <line x1="50%" y1="50%" x2="50%" y2="15%" strokeDasharray="5,5" />
                    <line x1="50%" y1="50%" x2="50%" y2="85%" strokeDasharray="5,5" />
                    <line x1="50%" y1="50%" x2="15%" y2="50%" strokeDasharray="5,5" />
                    <line x1="50%" y1="50%" x2="85%" y2="50%" strokeDasharray="5,5" />
                    <line x1="50%" y1="15%" x2="20%" y2="20%" />
                    <line x1="50%" y1="85%" x2="80%" y2="80%" />
                </svg>
                <Node pos="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" label="CORE" id="CORE" color="border-blue-500 text-blue-500" setHover={setHoveredNode} />
                <Node pos="top-0 left-1/2 -translate-x-1/2" label="FRAMING" id="FRAMING" setHover={setHoveredNode} />
                <Node pos="bottom-0 left-1/2 -translate-x-1/2" label="SUPPRESSION" id="SUPPRESSION" setHover={setHoveredNode} />
                <Node pos="left-0 top-1/2 -translate-y-1/2" label="AMPLIFICATION" id="AMPLIFICATION" setHover={setHoveredNode} />
                <Node pos="right-0 top-1/2 -translate-y-1/2" label="MUTATION" id="MUTATION" setHover={setHoveredNode} />
                <Node pos="top-[10%] left-[10%]" label="T.I.O" id="TIO" color="border-purple-500 text-purple-500" setHover={setHoveredNode} />
                <Node pos="bottom-[10%] right-[10%]" label="ARGUELY" id="ARGUELY" color="border-red-500 text-red-500" setHover={setHoveredNode} />
             </div>
             <div className="h-24 mt-12 w-full max-w-md text-center">
                {hoveredNode ? (
                    <div className="animate-in fade-in duration-200 bg-zinc-900/50 border border-zinc-800 p-4">
                        <div className="text-white font-bold mb-2 text-xs">{hoveredNode}</div>
                        <div className="text-zinc-400 text-[10px] font-mono">{DESCRIPTIONS[hoveredNode]}</div>
                    </div>
                ) : (
                    <div className="text-zinc-700 text-[10px] font-mono uppercase tracking-widest">
                        Status: Signal Transformation Active
                    </div>
                )}
             </div>
        </section>
    )
}

const Node = ({ pos, label, id, color = "border-zinc-700 text-zinc-500", setHover }: any) => (
    <div 
        onMouseEnter={() => setHover(id)}
        onMouseLeave={() => setHover(null)}
        className={`absolute ${pos} w-20 h-20 bg-black border ${color} hover:bg-zinc-900 transition-colors rounded-full flex items-center justify-center cursor-crosshair z-10`}
    >
        <div className="text-[8px] font-bold">{label}</div>
    </div>
)

// --- 8. CASE STUDY ---
export const SectionCaseStudy = () => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
    return (
        <section ref={ref} className="py-32 px-8 border-t border-zinc-900 bg-zinc-900/5">
            <div className={`max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <div className="text-xs text-zinc-500 uppercase tracking-widest mb-12">Project Case Study</div>
                <h2 className="text-3xl font-bold text-white mb-8">Framework — Truth Under Systems</h2>
                <p className="text-zinc-400 leading-relaxed mb-12">
                    A conceptual simulation exploring how digital environments shape belief survival. 
                    Framework models belief not as information, but as a structural outcome of system dynamics.
                </p>
                <div className="mt-16 pt-8 border-t border-zinc-800">
                    <h4 className="text-sm font-bold text-white mb-4">Outcome</h4>
                    <p className="text-zinc-400 italic">"Framework reframes belief: Not as a debate problem, but as an environmental survival process."</p>
                </div>
            </div>
        </section>
    )
}

// --- 9. MANIFESTO ---
export const SectionManifesto = () => {
    return (
        <section className="py-32 px-8 bg-black border-t border-zinc-900 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div>
                <div className="text-xs text-green-700 uppercase tracking-widest mb-8">Ontology Map</div>
                <ul className="space-y-4 font-mono text-xs text-zinc-500">
                    <li className="flex justify-between border-b border-zinc-900 pb-2"><span>Belief Variant</span> <span className="text-zinc-300">A mutated form</span></li>
                    <li className="flex justify-between border-b border-zinc-900 pb-2"><span>Survival Fitness</span> <span className="text-zinc-300">Persistence likelihood</span></li>
                </ul>
            </div>
            <div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest mb-8">Philosophical Appendix</div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">Belief behaves less like knowledge and more like biology. Systems do not create belief distortion. They reward it.</p>
            </div>
        </section>
    )
}

// --- 10. FINAL ---
export const SectionFinal = ({ onEnter }: { onEnter: () => void }) => {
    return (
        <section className="py-32 px-8 bg-black border-t border-zinc-900 text-center">
            <div className="max-w-4xl mx-auto">
                <p className="text-xl md:text-3xl text-white font-light leading-relaxed mb-16">
                    Truth was never purely discovered. Truth was processed.<br/>
                    <span className="text-blue-500 font-bold block mt-8">And what survived became reality.</span>
                </p>
                <button onClick={onEnter} className="group relative px-12 py-5 bg-zinc-950 border border-zinc-800 hover:border-blue-500 transition-all duration-500">
                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400 group-hover:text-blue-500">Initialize Framework</span>
                </button>
            </div>
        </section>
    )
}