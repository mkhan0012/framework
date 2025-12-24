"use server";

import Groq from "groq-sdk";

export async function generateGroqVisualization(
  baseText: string,
  emotion: string,
  instruction: string
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error("⚠️ GROQ_API_KEY missing. Returning base text.");
    return baseText;
  }

  const groq = new Groq({ apiKey });

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a text rendering engine. Rewrite the input to match the emotion. Do not add facts.",
        },
        {
          role: "user",
          content: `Input: "${baseText}"\nTarget Emotion: ${emotion}\nInstruction: ${instruction}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    return completion.choices[0]?.message?.content || baseText;
  } catch (error) {
    console.error("Groq Error:", error);
    return baseText; 
  }
}

// --- NEW FUNCTION: DEEP ANALYSIS ---
export async function generateDeepAnalysis(text: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  // Fallback if no API key
  if (!apiKey) {
    return "ANALYSIS ::\n> High emotional resonance detected.\n> Brevity increases transmission velocity.\n> Keywords aligned with current anxiety vectors.\n> Survival probability: 94%.";
  }

  const groq = new Groq({ apiKey });

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a cybernetic system analyzer. Analyze the given viral statement. Explain WHY it is effective using cold, technical, system-theory language. Focus on: structural simplicity, emotional hooks, and memetic fitness. Keep it under 40 words. Format as bullet points starting with '> '."
        },
        {
          role: "user",
          content: `Analyze this survivor variant: "${text}"`
        }
      ],
      model: "llama-3.3-70b-versatile",
    });

    return completion.choices[0]?.message?.content || "ANALYSIS FAILED.";
  } catch (error) {
    return "CONNECTION LOST. ANALYSIS UNAVAILABLE.";
  }
}