import { Belief } from "@/lib/types";

export function MutationGlitch({ belief }: { belief: Belief }) {
  return (
    <div className="text-center">
       <h1 className="text-7xl font-black text-white animate-glitch uppercase leading-tight tracking-tighter">
         {belief.text}
       </h1>
    </div>
  );
}