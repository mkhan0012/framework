"use client";

import { useEffect, useState, useRef, ReactNode } from "react";

// --- UTILS: SCROLL OBSERVER ---
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

// --- ANIMATED SECTION WRAPPER ---
const FadeSection = ({ children, delay = 0 }: { children: ReactNode, delay?: number }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
        <div 
            ref={ref} 
            className={`transition-all duration-1000 ease-out transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default function AboutSystem({ onBack }: { onBack: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={`min-h-screen bg-[#050505] text-zinc-400 font-mono p-6 md:p-24 overflow-x-hidden selection:bg-blue-900 selection:text-white transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}>
      
      {/* BACKGROUND NOISE */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* NAV */}
      <button 
        onClick={onBack} 
        className="fixed top-6 left-6 md:top-12 md:left-12 text-[10px] uppercase tracking-widest hover:text-white transition-colors z-50 bg-black/80 backdrop-blur px-4 py-2 border border-zinc-800 rounded-full hover:border-zinc-600 group"
      >
          <span className="text-zinc-500 group-hover:text-blue-500 mr-2">&lt;</span> 
          Return to Index
      </button>

      <div className="max-w-3xl mx-auto relative z-10 pb-32 mt-12 md:mt-0">

        {/* HEADER */}
        <header className="mb-32 pt-12 border-l-2 border-zinc-800 pl-8 animate-in slide-in-from-left-4 duration-1000">
            <div className="text-[10px] text-blue-500 font-bold tracking-widest mb-4">SYSTEM ARCHIVE // CHAPTER 06</div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter leading-none">
                THE ARCHITECTURE<br/>OF TRUTH
            </h1>
            <div className="text-xs md:text-sm text-zinc-500 uppercase tracking-widest leading-relaxed max-w-lg">
                History, Present, Future<br/>
                <span className="text-zinc-300">Conflict &middot; Perception &middot; Infrastructure</span>
            </div>
        </header>

        {/* I. ORIGINS */}
        <FadeSection>
            <SectionHeader num="01" title="Origins — Where the Trilogy Began" />
            <div className="prose-text">
                <p>This project did not begin as a trilogy. It began as a question — a question that refused to go away:</p>
                <QuoteBox>
                    “Why do some beliefs survive — even when they are weak, inaccurate, or incomplete — while other beliefs disappear, even when they seem reasonable or factual?”
                </QuoteBox>
                <p>Over time, that question evolved into something unsettling:</p>
                <p className="text-white font-bold my-6 pl-4 border-l border-blue-500">
                    “What if belief doesn’t spread because it is true — but because it is able to survive the system that carries it?”
                </p>
                <p>That implied something critical: Truth is not only an idea. <span className="text-blue-400">Truth is a traveler moving through environments.</span> And environments shape travelers.</p>
            </div>
        </FadeSection>

        {/* II. THE FIRST REALIZATION */}
        <FadeSection delay={100}>
            <SectionHeader num="02" title="The First Realization" />
            <div className="prose-text">
                <p>At first, it seemed logical to search for one root cause: misinformation? bias? manipulation? But the more patterns I studied, the clearer it became:</p>
                <div className="my-12 p-8 border border-zinc-800 bg-zinc-900/20 text-center">
                    <p className="text-zinc-500 text-sm mb-2 uppercase tracking-widest">System Conclusion</p>
                    <p className="text-white text-xl md:text-2xl mb-2 font-light">Truth does not fail in one moment.</p>
                    <p className="text-blue-500 text-xl md:text-2xl font-bold">Truth fails in sequence.</p>
                </div>
                <p>Belief transforms because it passes through multiple pressures, one after another:</p>
                <ul className="list-none space-y-2 my-6 pl-4 border-l border-zinc-800 text-zinc-300 font-mono text-xs md:text-sm">
                    <li>01. System environment</li>
                    <li>02. Perceptual interface</li>
                    <li>03. Social conflict</li>
                </ul>
                <p>By the end, what survives is not the belief that entered — it is the belief that adapted.</p>
            </div>
        </FadeSection>

        {/* III. WHY A TRILOGY */}
        <FadeSection delay={100}>
            <SectionHeader num="03" title="Three Lenses, One Machine" />
            <div className="prose-text">
                <p>If I built only one project, it would have forced belief to fail in one dimension. But belief does not transform that way.</p>
                <p className="my-6">It is <span className="text-white">engineered by infrastructure</span>, <span className="text-white">reshaped by perception</span>, and <span className="text-white">reinforced by conflict</span>.</p>
                
                <div className="grid gap-px bg-zinc-800 border border-zinc-800 my-12 shadow-2xl shadow-black">
                    <ProjectRow title="ARGUELY" sub="Truth under Conflict" color="text-red-500" />
                    <ProjectRow title="TRUTH IS OPTIONAL" sub="Truth under Perception" color="text-purple-500" />
                    <ProjectRow title="FRAMEWORK" sub="Truth under Systems" color="text-blue-500" active />
                </div>
                <p>Three systems were necessary because: <span className="italic text-zinc-300">one project explains a behavior, three projects reveal a mechanism.</span></p>
            </div>
        </FadeSection>

        {/* IV. THE PRESENT */}
        <FadeSection delay={100}>
            <SectionHeader num="04" title="The Present — What the Trio Is" />
            <div className="space-y-8 mt-8">
                <DetailBlock 
                    title="ARGUELY — Truth Under Conflict" 
                    desc="Where belief is defended, sharpened, and hardened. Opposition strengthens identity. Ego fuses with belief." 
                    tag="Conflict creates commitment."
                    color="border-red-900/30 text-red-500"
                />
                <DetailBlock 
                    title="TRUTH IS OPTIONAL — Truth Under Perception" 
                    desc="Where the interface decides what becomes visible. Context is filtered. Emphasis shifts." 
                    tag="Perception constructs reality."
                    color="border-purple-900/30 text-purple-500"
                />
                <DetailBlock 
                    title="FRAMEWORK — Truth Under Systems" 
                    desc="Where belief survives or disappears based on infrastructure. Emotional framing increases carrying power." 
                    tag="Infrastructure selects survivors."
                    color="border-blue-900/30 text-blue-500"
                />
            </div>
        </FadeSection>

        {/* V. WHY FRAMEWORK */}
        <FadeSection delay={100}>
            <SectionHeader num="05" title="Why Framework Exists" />
            <div className="prose-text">
                <p>Framework operates at the lowest level of the system — the layer beneath conversation, beneath interface, beneath behavior.</p>
                <p className="my-6 italic text-white text-lg">“Before anyone argues… before anyone perceives… what forces already shaped which beliefs were even able to exist?”</p>
                <p>Framework reveals how survival replaces accuracy before anyone even has a chance to discuss truth.</p>
            </div>
        </FadeSection>

        {/* VI. MECHANICS */}
        <FadeSection delay={100}>
            <SectionHeader num="06" title="A System of Belief Mechanics" />
            <p className="mb-8 text-sm text-zinc-400">Inside Framework, a belief passes through four mechanical forces:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EngineCard title="Framing Engine" desc="Emotional salience increases transmission fitness." />
                <EngineCard title="Amplification Engine" desc="Compatible variants spread farther than neutral ones." />
                <EngineCard title="Suppression Engine" desc="Visibility is reduced without deletion — friction replaces censorship." />
                <EngineCard title="Mutation Engine" desc="Repetition transforms and simplifies belief into a survival form." />
            </div>
            <p className="mt-8 text-sm leading-relaxed">The outcome is not ideological. It is structural. The system asks only one question: <span className="text-white">“Can this belief survive here?”</span></p>
        </FadeSection>

        {/* VII. HOW IT WORKS */}
        <FadeSection delay={100}>
            <SectionHeader num="07" title="Survival Instead of Evaluation" />
            <div className="prose-text">
                <p>Framework does not evaluate correctness. It observes compression, emotional acceleration, and propagation fit.</p>
                <p className="my-6">The original belief remains only temporarily. With each iteration, it becomes shorter, sharper, and harder to challenge.</p>
                <div className="pl-4 border-l-4 border-blue-500 my-8 py-2">
                    <p className="text-white font-bold text-lg">The belief that survives is not the belief that was created.</p>
                    <p className="text-blue-400 text-sm mt-1">It is the belief that learned how to survive.</p>
                </div>
            </div>
        </FadeSection>

        {/* VIII. THE FUTURE */}
        <FadeSection delay={100}>
            <SectionHeader num="08" title="The Future" />
            <div className="prose-text">
                <p>This trilogy is not an ending. It is a foundation. It opens questions such as:</p>
                <ul className="list-disc list-inside space-y-2 my-6 text-zinc-300 font-mono text-xs">
                    <li>What happens to identity when belief hardens?</li>
                    <li>What happens when survival replaces understanding completely?</li>
                    <li>What happens when systems reward belief more than reality?</li>
                </ul>
                <p>Framework does not answer these questions. It exposes the conditions that create them.</p>
                <p className="mt-4 italic text-zinc-500">Because once you see how belief survives, you cannot unsee it.</p>
            </div>
        </FadeSection>

        {/* X. CLOSING */}
        <FadeSection delay={200}>
            <div className="mt-32 p-12 border border-zinc-800 bg-zinc-950 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/10 transition-colors duration-1000"></div>
                <div className="relative z-10">
                    <p className="text-xl md:text-3xl font-light text-white mb-6 leading-relaxed">
                        "And what emerges at the end is not the belief that entered — It is the belief that survived the journey."
                    </p>
                    <p className="text-[10px] text-blue-500 font-bold tracking-[0.3em] uppercase">
                        Survival is what we eventually call truth.
                    </p>
                </div>
            </div>
        </FadeSection>

      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

const SectionHeader = ({ num, title }: { num: string, title: string }) => (
    <div className="mb-8 mt-24 border-b border-zinc-900 pb-4 flex items-baseline gap-4">
        <span className="text-xs font-mono text-blue-900">{num}</span>
        <h2 className="text-sm md:text-base text-zinc-300 uppercase tracking-widest font-bold">{title}</h2>
    </div>
);

const QuoteBox = ({ children }: { children: ReactNode }) => (
    <div className="my-8 pl-6 border-l-2 border-zinc-800 italic text-zinc-300 font-serif text-lg leading-relaxed opacity-80">
        {children}
    </div>
);

const ProjectRow = ({ title, sub, color, active }: any) => (
    <div className={`p-6 flex flex-col md:flex-row justify-between items-baseline ${active ? "bg-zinc-900/30" : "bg-[#050505] opacity-50"}`}>
        <span className={`font-bold tracking-tight ${color}`}>{title}</span>
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{sub}</span>
    </div>
);

const DetailBlock = ({ title, desc, tag, color }: any) => (
    <div className={`p-6 border-l-2 ${color} bg-zinc-900/5 hover:bg-zinc-900/10 transition-colors`}>
        <h4 className="text-white font-bold mb-2 text-sm">{title}</h4>
        <p className="text-xs md:text-sm text-zinc-400 leading-relaxed mb-4">{desc}</p>
        <p className={`text-xs font-mono uppercase tracking-widest ${color.split(" ")[1]}`}>{tag}</p>
    </div>
);

const EngineCard = ({ title, desc }: any) => (
    <div className="p-6 border border-zinc-800 bg-zinc-900/10 hover:border-zinc-600 transition-colors group">
        <div className="text-[10px] text-blue-900 font-bold mb-2 uppercase group-hover:text-blue-500 transition-colors">{title}</div>
        <div className="text-xs text-zinc-400 leading-relaxed">{desc}</div>
    </div>
);