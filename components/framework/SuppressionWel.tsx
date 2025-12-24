import { Belief } from "@/lib/types";

interface SuppressionWellProps {
  belief: Belief;
}

export function SuppressionWell({ belief }: SuppressionWellProps) {
  return (
    <div className="text-center w-full max-w-md">
      <div className="text-red-600 text-[10px] tracking-[0.3em] font-mono mb-6 animate-pulse">
        ALGORITHM ALERT // SUPPRESSION ACTIVE
      </div>
      
      <h2 
        className="text-3xl font-bold text-zinc-500 transition-all duration-300 will-change-[opacity,filter]" 
        style={{ 
          opacity: belief.visibility, 
          filter: `blur(${(1 - belief.visibility) * 12}px)` 
        }}
      >
        {belief.text}
      </h2>

      <div className="w-full h-[2px] bg-zinc-900 mt-12 relative overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-zinc-600 transition-all duration-300 ease-linear" 
          style={{ width: `${belief.visibility * 100}%` }} 
        />
      </div>
      
      <div className="flex justify-between text-[10px] text-zinc-700 font-mono mt-3 uppercase">
        <span>Signal Strength</span>
        <span>{(belief.visibility * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
}