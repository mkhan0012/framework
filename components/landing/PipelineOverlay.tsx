import { SystemPhase } from "@/components/SystemModel";

interface PipelineOverlayProps {
  phase: SystemPhase;
  hoverData: { label: string; desc: string } | null;
}

export const PipelineOverlay = ({ phase, hoverData }: PipelineOverlayProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 md:p-12 z-20">
      
      {/* TOP: SYSTEM STATUS */}
      <div className="flex justify-between items-start font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
        <div className="flex flex-col gap-1">
            <span className="text-white font-bold">FRAMEWORK_OS v2.4</span>
            <span>BELIEF_PIPELINE_VIEW</span>
        </div>
        <div className="text-right flex flex-col gap-1">
            <span>ACTIVE_PHASE: <span className={phase === "CONFLICT" ? "text-red-500" : phase === "PERCEPTION" ? "text-purple-500" : "text-blue-500"}>{phase}</span></span>
            {phase === "ORIGIN" && <span>OBSERVATION: Infrastructure Influence Detected.</span>}
            {phase === "PERCEPTION" && <span>OBSERVATION: Perception Distortion Active.</span>}
            {phase === "CONFLICT" && <span>OBSERVATION: Conflict Rigidity Increasing.</span>}
        </div>
      </div>

      {/* CENTER: HOVER DATA OR PHASE IDENTITY */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl text-center">
        
        {/* Priority: Hover Data */}
        {hoverData ? (
            <div className="bg-black/80 border border-zinc-800 p-6 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
                <div className="text-xs text-blue-400 font-bold mb-2 tracking-widest">{hoverData.label}</div>
                <div className="text-sm text-zinc-300 font-mono">{hoverData.desc}</div>
            </div>
        ) : (
            // Fallback: Phase Narrative
            <div className="transition-all duration-700">
                {phase === "ORIGIN" && (
                    <div className="space-y-4">
                        <div className="text-xs text-blue-500 tracking-[0.3em]">FRAMEWORK — TRUTH UNDER SYSTEMS</div>
                        <h2 className="text-2xl md:text-4xl text-white font-light">"Belief is engineered for<br/>systemic compatibility."</h2>
                        <div className="text-[10px] text-zinc-600 bg-zinc-900/50 inline-block px-3 py-1">ORIGINAL VARIANT: DETECTED</div>
                    </div>
                )}
                {phase === "PERCEPTION" && (
                    <div className="space-y-4">
                        <div className="text-xs text-purple-500 tracking-[0.3em]">TRUTH IS OPTIONAL — TRUTH UNDER PERCEPTION</div>
                        <h2 className="text-2xl md:text-4xl text-white font-light blur-[0.5px]">"Belief is shaped by<br/>what becomes visible."</h2>
                        <div className="text-[10px] text-purple-900 bg-purple-950/10 inline-block px-3 py-1">STATE CHANGE: DISTORTION APPLIED</div>
                    </div>
                )}
                {phase === "CONFLICT" && (
                    <div className="space-y-4">
                        <div className="text-xs text-red-500 tracking-[0.3em]">ARGUELY — TRUTH UNDER CONFLICT</div>
                        <h2 className="text-2xl md:text-4xl text-white font-bold">"Belief becomes rigid when<br/>it must be defended."</h2>
                        <div className="text-[10px] text-red-900 bg-red-950/10 inline-block px-3 py-1">STATE CHANGE: RIGIDITY DETECTED</div>
                    </div>
                )}
            </div>
        )}
      </div>

      {/* BOTTOM: PIPELINE DIAGRAM */}
      <div className="flex justify-center items-end">
         <div className="flex items-center gap-4 text-[9px] md:text-[10px] uppercase tracking-widest text-zinc-600 font-mono">
            <span className={phase === "ORIGIN" ? "text-white" : ""}>[ Infrastructure ]</span>
            <span>→</span>
            <span className={phase === "PERCEPTION" ? "text-white" : ""}>[ Perception ]</span>
            <span>→</span>
            <span className={phase === "CONFLICT" ? "text-white" : ""}>[ Conflict ]</span>
         </div>
      </div>
    </div>
  );
};