"use client";

import { useRef, useEffect, useState } from "react";

export default function ArtifactGenerator({ text, vector, onClose }: { text: string, vector: string, onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. SETUP CANVAS (High Res Poster)
    canvas.width = 1080;
    canvas.height = 1350; // 4:5 Aspect Ratio (Social Media Standard)

    // 2. BACKGROUND & NOISE
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Heavy Noise Texture
    for (let i = 0; i < 80000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 3, 3);
    }

    // 3. COLOR THEME
    let primaryColor = "#ffffff";
    if (vector === "FEAR") primaryColor = "#ef4444";
    if (vector === "OUTRAGE") primaryColor = "#f97316";
    if (vector === "VALIDATION") primaryColor = "#10b981";
    if (vector === "CONFUSION") primaryColor = "#a855f7";

    // 4. DRAW BORDERS & UI
    const padding = 60;
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 15;
    ctx.strokeRect(padding, padding, canvas.width - (padding * 2), canvas.height - (padding * 2));

    // Corners
    ctx.fillStyle = primaryColor;
    ctx.fillRect(padding - 5, padding - 5, 40, 40); // Top Left
    ctx.fillRect(canvas.width - padding - 35, padding - 5, 40, 40); // Top Right
    ctx.fillRect(padding - 5, canvas.height - padding - 35, 40, 40); // Bottom Left
    ctx.fillRect(canvas.width - padding - 35, canvas.height - padding - 35, 40, 40); // Bottom Right

    // Header Info
    ctx.font = "bold 30px Courier New";
    ctx.fillStyle = primaryColor;
    ctx.fillText(`VECTOR // ${vector}`, 100, 130);
    ctx.textAlign = "right";
    ctx.fillText(new Date().toLocaleDateString().toUpperCase(), canvas.width - 100, 130);

    // 5. DYNAMIC TEXT SCALING & CENTERING
    const maxContentWidth = canvas.width - 200; // Margins
    const maxContentHeight = canvas.height - 500; // Leave room for header/footer
    let fontSize = 120; // Start huge
    let lines: string[] = [];
    let lineHeight = 0;

    // Loop to find the perfect font size
    ctx.textAlign = "center";
    ctx.font = `bold ${fontSize}px Arial`;

    do {
        ctx.font = `bold ${fontSize}px Arial`;
        lineHeight = fontSize * 1.1;
        lines = [];
        const words = text.toUpperCase().split(" ");
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = ctx.measureText(currentLine + " " + word).width;
            if (width < maxContentWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);

        // Check total height
        const totalHeight = lines.length * lineHeight;
        if (totalHeight > maxContentHeight) {
            fontSize -= 5; // Shrink font if too tall
        } else {
            break; // Fits!
        }
    } while (fontSize > 40); // Minimum safe size

    // 6. DRAW THE TEXT CENTERED
    const blockHeight = lines.length * lineHeight;
    let startY = (canvas.height - blockHeight) / 2 + (lineHeight / 3); // Vertical Center

    ctx.fillStyle = "#ffffff";
    lines.forEach((line) => {
        ctx.fillText(line, canvas.width / 2, startY);
        startY += lineHeight;
    });

    // 7. FOOTER STAMP
    const footerY = canvas.height - 180;
    ctx.fillStyle = primaryColor;
    ctx.globalAlpha = 0.1;
    ctx.fillRect(padding + 20, footerY, canvas.width - (padding * 2 + 40), 100);
    
    ctx.globalAlpha = 1.0;
    ctx.font = "bold 30px Courier New";
    ctx.textAlign = "center";
    ctx.fillText("FRAMEWORK // TRUTH IS OPTIONAL", canvas.width / 2, footerY + 60);

    // 8. GENERATE IMAGE
    setDownloadUrl(canvas.toDataURL("image/png"));

  }, [text, vector]);

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
        
        <div className="text-zinc-500 font-mono text-xs mb-4 uppercase tracking-widest">
            Artifact Rendering Complete
        </div>
        
        {/* VISUAL PREVIEW CONTAINER */}
        <div className="relative shadow-2xl shadow-black border border-zinc-800 max-h-[70vh] overflow-hidden">
            <canvas ref={canvasRef} className="h-full w-auto object-contain max-h-[70vh]" />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 mt-8">
            <a 
                href={downloadUrl || "#"} 
                download={`FRAMEWORK_ARTIFACT_${Date.now()}.png`}
                className="bg-white text-black px-8 py-3 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-blue-500 hover:text-white transition-colors"
            >
                Download Poster
            </a>
            <button 
                onClick={onClose}
                className="bg-transparent border border-zinc-700 text-zinc-500 px-8 py-3 font-bold uppercase tracking-widest text-xs md:text-sm hover:border-white hover:text-white transition-colors"
            >
                Close
            </button>
        </div>
    </div>
  );
}