"use client";

import { useState, useEffect } from "react";

interface InputConsoleProps {
  onStart: (text: string) => void;
}

export function InputConsole({ onStart }: InputConsoleProps) {
  const [input, setInput] = useState("");
  const [isReady, setIsReady] = useState(false);

  // Mechanical typing effect for placeholder
  const [placeholder, setPlaceholder] = useState("");
  const fullPlaceholder = "INPUT_BELIEF_FOR_PROCESSING...";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setPlaceholder(fullPlaceholder.slice(0, i));
      i++;
      if (i > fullPlaceholder.length) clearInterval(t);
    }, 50);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onStart(input);
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center animate-in fade-in duration-1000">
      
      {/* System Status Indicators */}
      <div className="w-full flex justify-between text-[10px] text-zinc-600 uppercase tracking-widest mb-12 border-b border-zinc-900 pb-2">
        <span>MODULE: INGESTION</span>
        <span className={input.length > 0 ? "text-blue-500" : "text-zinc-600"}>
          DATA_STREAM: {input.length > 0 ? "ACTIVE" : "IDLE"}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-16 relative">
        <div className="relative group">
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent text-center text-3xl md:text-5xl font-bold outline-none text-white caret-blue-500 tracking-tight z-10 relative uppercase font-mono"
            maxLength={60}
          />
          {/* Ghost Placeholder */}
          {!input && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-zinc-800 text-3xl md:text-5xl uppercase font-mono tracking-tight blur-[1px]">
                {placeholder}
              </span>
            </div>
          )}
        </div>
        
        {/* Execution Trigger */}
        <div className="flex justify-center">
            <button 
                type="submit"
                disabled={!input.trim()}
                className="
                group relative px-12 py-4 
                border border-zinc-800 bg-zinc-950
                text-xs tracking-[0.3em] text-zinc-500 uppercase 
                hover:text-white hover:border-blue-600 hover:bg-blue-950/10
                transition-all duration-300
                disabled:opacity-0 disabled:translate-y-4 disabled:pointer-events-none
                "
            >
                <span className="relative z-10 group-hover:animate-pulse">INITIATE_SEQUENCE</span>
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-600 group-hover:border-blue-500 transition-colors"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-600 group-hover:border-blue-500 transition-colors"></div>
            </button>
        </div>
      </form>
    </div>
  );
}