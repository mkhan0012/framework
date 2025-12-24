import { Belief } from "@/lib/types";

interface SuppressionWellProps {
  belief: Belief;
}

export function SuppressionWell({ belief }: SuppressionWellProps) {
  // Calculate visual properties based on visibility score (1.0 -> 0.0)
  const blurAmount = (1 - belief.visibility) * 20; 
  const opacity = Math.max(0.1, belief.visibility);
  const isCritical = belief.visibility < 0.35;

  return (
    <div className="w-full max-w-2xl flex flex-col items-center justify-center h-full">
      
      <div className="w-full flex justify-between text-[10px] text-zinc-600 uppercase tracking-widest mb-16 border-b border-zinc-900 pb-2">
         <span>PHASE 03: SUPPRESSION</span>
         <span className={isCritical ? "text-red-500 animate-pulse" : "text-zinc-600"}>
            STATUS: {isCritical ? "SHADOWBAN_ACTIVE" : "MONITORING"}
         </span>
      </div>

      <div className="relative w-full text-center py-12">
          
          {/* The Content Being Suppressed */}
          <h2 
            className="text-4xl md:text-6xl font-bold text-white transition-all duration-200" 
            style={{ 
              opacity: opacity, 
              filter: `blur(${blurAmount}px)`,
              transform: `scale(${0.9 + (belief.visibility * 0.1)})`
            }}
          >
            {belief.text}
          </h2>

          {/* Overlay Warning when visibility is low */}
          {isCritical && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="border border-red-900 bg-red-950/20 text-red-500 px-4 py-1 text-xs tracking-widest uppercase animate-pulse backdrop-blur-md">
                      Sensitive Content Warning
                  </div>
              </div>
          )}
      </div>

      {/* Visibility Bar */}
      <div className="w-64 mt-16 space-y-2">
         <div className="flex justify-between text-[10px] text-zinc-500 uppercase">
             <span>Visibility Index</span>
             <span>{(belief.visibility * 100).toFixed(0)}%</span>
         </div>
         <div className="w-full h-1 bg-zinc-900 overflow-hidden">
            <div 
                className="h-full bg-zinc-500 transition-all duration-200"
                style={{ width: `${belief.visibility * 100}%` }}
            ></div>
         </div>
      </div>

    </div>
  );
}