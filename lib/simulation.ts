import { Belief } from "./types";
// Import the engines strictly for internal use
import { 
  runFramingEngine as _runFramingEngine, 
  runMutationEngine as _runMutationEngine 
} from "./engines";
import { generateGroqVisualization } from "./ai";

// --- CRITICAL: Re-export the old functions so page.tsx can find them ---
export { createBelief, runFramingEngine, runMutationEngine } from "./engines";

/**
 * HYBRID SIMULATION
 * Calls the deterministic engine first, then the AI visualizer.
 */
export const runHybridSimulation = async (belief: Belief): Promise<Belief> => {
  // 1. Run Deterministic Logic (The Truth)
  const nextState = _runFramingEngine(belief);
  
  // 2. Define AI Instruction based on the result
  let instruction = "Keep it objective.";
  if (nextState.emotion === "fear") {
    instruction = "Make it sound paranoid, urgent, and slightly glitchy.";
  }

  // 3. Run AI Visualization (Server Action)
  try {
    const aiText = await generateGroqVisualization(
      nextState.text, 
      nextState.emotion, 
      instruction
    );

    return {
      ...nextState,
      aiRenderedText: aiText // Store the AI flavor text
    };
  } catch (e) {
    return nextState;
  }
};