import { Belief } from "@/lib/types";

interface AmplificationNetworkProps {
  belief: Belief;
}

export function AmplificationNetwork({ belief }: AmplificationNetworkProps) {
  return (
    <div className="w-full max-w-3xl relative py-20 flex flex-col items-center">
      
      {/* Network Grid Background */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 gap-4 opacity-[0.02]">
         {[...Array(18)].map((_, i) => (
             <div key={i} className="border border-white/50"></div>
         ))}
      </div>

      <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-12">
        PHASE 02: AMPLIFICATION
      </div>
      
      <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-16 text-center z-10 max-w-2xl">
        "{belief.text}"
      </h2>
      
      {/* Metrics Dashboard */}
      <div className="grid grid-cols-3 gap-8 w-full border-y border-zinc-900 py-8 bg-black/50 z-10 backdrop-blur-sm">
        
        <MetricBox 
            label="VELOCITY" 
            value={(belief.reach * 1.42).toFixed(0)} 
            unit="ops/sec" 
            color="text-blue-500"
        />
        <MetricBox 
            label="TOTAL REACH" 
            value={belief.reach.toLocaleString()} 
            unit="users" 
            color="text-white"
        />
        <MetricBox 
            label="SATURATION" 
            value={(belief.reach / 50).toFixed(1)} 
            unit="%" 
            color="text-zinc-400"
        />

      </div>
    </div>
  );
}

const MetricBox = ({ label, value, unit, color }: any) => (
    <div className="flex flex-col items-center justify-center border-r last:border-r-0 border-zinc-900">
        <span className="text-[10px] text-zinc-600 mb-2">{label}</span>
        <span className={`text-2xl font-mono ${color}`}>{value}</span>
        <span className="text-[10px] text-zinc-700 mt-1">{unit}</span>
    </div>
)