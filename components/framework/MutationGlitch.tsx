import { Belief } from "@/lib/types";
import { useEffect, useState } from "react";

export function MutationGlitch({ belief }: { belief: Belief }) {
  const [glitchText, setGlitchText] = useState(belief.text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";

  // Active glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
        const textArray = belief.text.split("");
        const corrupted = textArray.map((char, i) => {
            if (char === " ") return " ";
            // 10% chance to glitch a character per frame
            return Math.random() > 0.9 ? chars[Math.floor(Math.random() * chars.length)] : char;
        });
        setGlitchText(corrupted.join(""));
    }, 50);

    return () => clearInterval(interval);
  }, [belief.text]);

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl">
       <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-12">
            PHASE 04: MUTATION
       </div>

       <h1 className="text-5xl md:text-8xl font-black text-white uppercase leading-none tracking-tighter mix-blend-difference">
         {glitchText}
       </h1>
       
       <div className="mt-8 text-xs font-mono text-zinc-500">
           &gt; OPTIMIZING_FOR_RETENTION...
       </div>
    </div>
  );
}