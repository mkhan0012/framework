"use client";

import { useState } from "react";

interface InputConsoleProps {
  onStart: (text: string) => void;
}

export function InputConsole({ onStart }: InputConsoleProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onStart(input);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-xl flex flex-col items-center gap-12 animate-in fade-in duration-1000"
    >
      <input
        autoFocus
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="ENTER BELIEF..."
        className="w-full bg-transparent text-center text-3xl font-light outline-none text-white placeholder-zinc-800 caret-white tracking-tight"
        maxLength={60}
      />
      
      {/* Simulation Trigger Button */}
      <button 
        type="submit"
        disabled={!input.trim()}
        className="
          px-8 py-3 
          border border-zinc-800 
          text-[10px] tracking-[0.3em] text-zinc-600 uppercase 
          hover:text-white hover:border-zinc-500 hover:bg-white/5
          transition-all duration-500
          cursor-pointer
          disabled:opacity-0 disabled:translate-y-4 disabled:pointer-events-none
        "
      >
        Initialize Simulation
      </button>
    </form>
  );
}