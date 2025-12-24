import { Belief } from "@/lib/types";

export function FramingPrism({ belief }: { belief: Belief }) {
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      {/* Abstract Prism Line */}
      <div className="absolute w-[1px] h-32 bg-white/30 rotate-45" />
      
      <div className="flex justify-between w-full opacity-0 animate-[pulse_1s_ease-in_forwards]">
        <span className="w-1/3 text-right pr-12 text-zinc-700 blur-[2px] font-mono text-sm">
          {belief.originalText}
        </span>
        <span className="w-1/3 text-left pl-12 font-bold text-[#ff3333] tracking-widest text-lg">
          {belief.text}
        </span>
      </div>
    </div>
  );
}