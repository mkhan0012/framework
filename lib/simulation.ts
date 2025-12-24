import { Belief } from "./types";
import { 
  runFramingEngine as _runFramingEngine, 
  createBelief as _createBelief 
} from "./engines";
import { generateGroqVisualization, generateDeepAnalysis } from "./ai"; // <--- IMPORT IT HERE

// --- CRITICAL: EXPORT EVERYTHING THE UI NEEDS ---
export { createBelief, runFramingEngine, runMutationEngine } from "./engines";
export { generateDeepAnalysis }; // <--- EXPORT IT HERE

export const runHybridSimulation = async (belief: Belief, entropy: number = 50): Promise<Belief> => {
  // 1. Run Deterministic Logic
  const nextState = _runFramingEngine(belief);
  
  // 2. Define AI Instruction
  let instruction = "Keep it objective.";
  if (nextState.emotion === "fear") {
    instruction = "Make it sound paranoid, urgent, and slightly glitchy.";
  }

  // 3. AI Layer
  try {
    const aiText = await generateGroqVisualization(
      nextState.text, 
      nextState.emotion, 
      instruction
    );

    return {
      ...nextState,
      aiRenderedText: aiText 
    };
  } catch (e) {
    return nextState;
  }
};