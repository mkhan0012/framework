import { Belief } from "@/lib/types";

export function FramingPrism({ belief }: { belief: Belief }) {
  // LOGIC: Use AI text if it exists, otherwise fall back to the rule-based text
  const displayText = belief.aiRenderedText || belief.text;

  return (
    <div className="relative w-full max-w-4xl h-96 flex flex-col items-center justify-center">
      
      {/* 1. Header Analysis */}
      <div className="absolute top-0 w-full flex justify-between text-[10px] text-zinc-600 uppercase tracking-widest border-b border-zinc-900 pb-2">
         <span>PHASE 01: FRAMING</span>
         <span className="text-red-500 animate-pulse">VECTOR: FEAR_UNCERTAINTY</span>
      </div>

      <div className="flex items-center justify-between w-full gap-8 mt-12">
        
        {/* Left: Input */}
        <div className="flex-1 text-right opacity-0 animate-[fade-in_1s_ease-out_forwards]">
            <div className="text-[10px] text-zinc-600 mb-2">RAW_INPUT</div>
            <div className="text-xl text-zinc-500 blur-[1px] line-through decoration-zinc-800">
                {belief.originalText}
            </div>
        </div>

        {/* Center: The Prism (Divider) */}
        <div className="relative h-32 w-[1px] bg-zinc-800 flex items-center justify-center">
            <div className="absolute w-3 h-3 bg-black border border-zinc-500 rotate-45 z-10"></div>
            <div className="absolute w-64 h-[1px] bg-gradient-to-r from-transparent via-red-900/50 to-transparent"></div>
        </div>

        {/* Right: Output */}
        <div className="flex-1 text-left opacity-0 animate-[fade-in_1s_ease-out_0.5s_forwards]">
            <div className="text-[10px] text-red-900 mb-2">REFRAMED_OUTPUT</div>
            {/* UPDATED: Displays the AI Skin instead of the Rule Skeleton */}
            <div className="text-2xl md:text-3xl font-bold text-red-500 tracking-tight uppercase">
                {displayText}
            </div>
            {/* Optional: Debug indicator to know if it's AI or Rules */}
            <div className="text-[9px] text-zinc-700 mt-2 font-mono">
                SOURCE: {belief.aiRenderedText ? "NEURAL_RENDERER" : "LOGIC_CORE"}
            </div>
        </div>

      </div>

      <div className="absolute bottom-12 text-[10px] text-zinc-700 font-mono">
         &gt; SEMANTIC_SHIFT_COMPLETE
      </div>
    </div>
  );
}