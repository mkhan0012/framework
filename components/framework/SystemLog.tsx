import { Belief } from "@/lib/types";

interface SystemLogProps {
  initialInput: string;
  finalBelief: Belief;
  onReset: () => void;
}

export function SystemLog({ initialInput, finalBelief, onReset }: SystemLogProps) {
  // LOGIC: Select the best version of the text
  const finalOutput = finalBelief.aiRenderedText || finalBelief.text;

  return (
    <div className="font-mono text-sm w-full max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      <div className="w-full border border-zinc-800 bg-zinc-950 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20">
            <div className="w-16 h-16 border border-zinc-700 grid grid-cols-4 grid-rows-4"></div>
        </div>

        <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-8 border-b border-zinc-900 pb-4">
            SIMULATION_REPORT_LOG_#8821
        </h3>

        <div className="space-y-8">
            <LogItem 
                label="01. ORIGINAL INPUT" 
                value={initialInput} 
                sub="Source: User Input"
            />
            
            <LogItem 
                label="02. APPLIED FRAME" 
                value="FEAR_VECTOR [Heavy]" 
                valueColor="text-red-500"
                sub="Engine: FramingPrism v1.0"
            />

            <LogItem 
                label="03. PEAK REACH" 
                value={`${finalBelief.reach.toLocaleString()} NODES`} 
                valueColor="text-blue-500"
                sub="Engine: AmplificationNetwork"
            />

            <LogItem 
                label="04. FINAL MUTATION" 
                value={finalOutput} 
                valueColor="text-white font-bold text-lg border-l-2 border-white pl-4 mt-2"
                sub={finalBelief.aiRenderedText ? "Source: Generative Layer" : "Source: Deterministic Rule"}
            />
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 flex justify-between items-center">
             <div className="text-[10px] text-zinc-700">END OF LINE.</div>
             <button 
                onClick={onReset} 
                className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white hover:underline transition-colors"
             >
                [ RESET SYSTEM ]
             </button>
        </div>

      </div>
    </div>
  );
}

const LogItem = ({ label, value, sub, valueColor = "text-zinc-300" }: any) => (
    <div>
        <div className="text-[10px] text-zinc-600 mb-1">{label}</div>
        <div className={valueColor}>{value}</div>
        {sub && <div className="text-[10px] text-zinc-700 mt-1">{sub}</div>}
    </div>
)