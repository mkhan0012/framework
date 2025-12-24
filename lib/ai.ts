"use server";

import Groq from "groq-sdk";

export async function generateGroqVisualization(
  baseText: string,
  emotion: string,
  instruction: string
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    // Fail gracefully if key is missing so the app doesn't crash
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
    return baseText; // Fallback to original text on error
  }
}