"use client";

import { useState } from "react";

export default function PerceptionEngine({ text, onClose }: { text: string, onClose: () => void }) {
    const [mode, setMode] = useState<"TWITTER" | "NEWS" | "NOTIF">("TWITTER");

    return (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-black">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500">Perception Layer Preview</span>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white">&times;</button>
                </div>
                
                <div className="flex border-b border-zinc-800">
                    <button onClick={() => setMode("TWITTER")} className={`flex-1 py-2 text-[10px] uppercase ${mode === "TWITTER" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:bg-zinc-800/50"}`}>Social X</button>
                    <button onClick={() => setMode("NEWS")} className={`flex-1 py-2 text-[10px] uppercase ${mode === "NEWS" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:bg-zinc-800/50"}`}>Ticker</button>
                    <button onClick={() => setMode("NOTIF")} className={`flex-1 py-2 text-[10px] uppercase ${mode === "NOTIF" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:bg-zinc-800/50"}`}>Lock Screen</button>
                </div>

                <div className="p-8 min-h-[300px] flex items-center justify-center bg-zinc-950 relative overflow-hidden">
                    
                    {/* SOCIAL MODE */}
                    {mode === "TWITTER" && (
                        <div className="bg-black border border-zinc-800 p-4 rounded-lg w-full max-w-sm">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-zinc-800"></div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-white text-sm">TruthSeeker</span>
                                        <span className="text-zinc-600 text-xs">@veritas_xr &middot; 2m</span>
                                    </div>
                                    <p className="text-zinc-300 text-sm mt-1 leading-normal">{text}</p>
                                    <div className="flex gap-4 mt-3 text-zinc-600 text-xs">
                                        <span>REPOST 12K</span>
                                        <span>LIKE 45K</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* NEWS TICKER MODE */}
                    {mode === "NEWS" && (
                        <div className="w-full relative">
                            <div className="bg-red-600 text-white font-bold px-2 py-1 text-xs inline-block mb-0 relative z-10">BREAKING NEWS</div>
                            <div className="bg-white text-black p-4 font-bold text-lg uppercase tracking-tight leading-none border-l-4 border-red-600 shadow-lg">
                                {text}
                            </div>
                            <div className="mt-2 text-[10px] text-zinc-600 uppercase">Live Coverage &middot; Global Impact</div>
                        </div>
                    )}

                    {/* NOTIFICATION MODE */}
                    {mode === "NOTIF" && (
                        <div className="w-full max-w-[280px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white shadow-xl">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-1">
                                    <div className="w-4 h-4 bg-blue-500 rounded text-[8px] flex items-center justify-center">N</div>
                                    <span className="text-[10px] uppercase opacity-70">News Alert</span>
                                </div>
                                <span className="text-[10px] opacity-50">now</span>
                            </div>
                            <div className="text-xs font-semibold mb-1">System Notification</div>
                            <div className="text-xs opacity-90 leading-snug">{text}</div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}