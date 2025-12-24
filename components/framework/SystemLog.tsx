import { Belief } from "@/lib/types";

interface SystemLogProps {
  initialInput: string;
  finalBelief: Belief;
  onReset: () => void;
}

export function SystemLog({ initialInput, finalBelief, onReset }: SystemLogProps) {
  return (
    <div className="font-mono text-sm w-full max-w-lg animate-in fade-in duration-1000">
      <div className="border-l border-zinc-800 pl-6 space-y-8">
        <div>
          <div className="text-zinc-600 text-[10px] uppercase tracking-widest mb-2">Original Input</div>
          <div className="text-zinc-400">{initialInput}</div>
        </div>
        <div>
          <div className="text-zinc-600 text-[10px] uppercase tracking-widest mb-2">Framing Vector</div>
          <div className="text-[#ff3333]">FEAR_AUTONOMY</div>
        </div>
        <div>
          <div className="text-zinc-600 text-[10px] uppercase tracking-widest mb-2">Final Output</div>
          <div className="text-white font-bold text-lg">{finalBelief.text}</div>
        </div>
      </div>
      
      <button 
        onClick={onReset} 
        className="mt-16 text-zinc-600 hover:text-white hover:border-white transition-all text-[10px] uppercase tracking-[0.2em] border border-zinc-800 px-8 py-3"
      >
        Reset System
      </button>
    </div>
  );
}