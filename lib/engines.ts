import { Belief } from "./types";

export const createBelief = (input: string): Belief => ({
  text: input,
  originalText: input,
  emotion: "neutral",
  reach: 0,
  visibility: 1.0,
});

export const runFramingEngine = (belief: Belief): Belief => {
  // Deterministic framing logic
  return {
    ...belief,
    text: `THEY ARE HIDING ${belief.originalText.toUpperCase()}`,
    emotion: "fear",
  };
};

export const runMutationEngine = (text: string): string => {
  // Reduces complexity: keeps first 3 words, adds noise
  const words = text.split(" ");
  const short = words.slice(0, Math.min(words.length, 3)).join(" ");
  return short + "!!!";
};

export const checkSuppressionThreshold = (reach: number): boolean => {
  return reach > 5000;
};