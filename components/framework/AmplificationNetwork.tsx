import { Belief } from "@/lib/types";

interface AmplificationNetworkProps {
  belief: Belief;
}

export function AmplificationNetwork({ belief }: AmplificationNetworkProps) {
  return (
    <div className="text-center relative py-20">
      {/* Background Pulse Effect */}
      <div className="animate-pulse-network absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-10" />
      
      <h2 className="text-4xl font-bold tracking-tight text-white mb-8">
        {belief.text}
      </h2>
      
      <div className="grid grid-cols-2 gap-12 text-xs font-mono text-zinc-500 uppercase tracking-widest">
        <div className="flex flex-col gap-2">
          <span>Velocity</span>
          <span className="text-white text-xl">{(belief.reach * 1.42).toFixed(0)}/s</span>
        </div>
        <div className="flex flex-col gap-2">
          <span>Total Reach</span>
          <span className="text-white text-xl">{belief.reach.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}