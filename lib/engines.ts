import { Belief, FramingVector } from "./types";

export const createBelief = (input: string, vector: FramingVector = "FEAR"): Belief => ({
  text: input,
  originalText: input,
  emotion: "neutral",
  reach: 0,
  visibility: 1.0,
  vector: vector
});

export const runFramingEngine = (belief: Belief): Belief => {
  let prefix = "";
  let emotion: Belief["emotion"] = "neutral";

  switch (belief.vector) {
    case "FEAR":
      prefix = "THEY ARE HIDING THE FACT THAT ";
      emotion = "fear";
      break;
    case "OUTRAGE":
      prefix = "IT IS DISGUSTING THAT ";
      emotion = "anger";
      break;
    case "VALIDATION":
      prefix = "YOU WERE RIGHT ALL ALONG: ";
      emotion = "authority";
      break;
    case "CONFUSION":
      prefix = "EXPERTS ARE DIVIDED ON WHETHER ";
      emotion = "confusion";
      break;
    default:
      prefix = "BREAKING: ";
      emotion = "fear";
  }

  return {
    ...belief,
    text: `${prefix}${belief.originalText.toUpperCase()}`,
    emotion: emotion,
  };
};

// UPDATED: Now accepts an 'entropy' slider value (0-100)
export const runMutationEngine = (text: string, entropy: number = 50): string => {
  const words = text.split(" ");
  
  // High entropy = keep fewer words (more destruction)
  // Low entropy = keep more words (more stability)
  const retentionRate = Math.max(0.2, 1 - (entropy / 100)); 
  const keepCount = Math.max(2, Math.floor(words.length * retentionRate));
  
  const short = words.slice(0, keepCount).join(" ");
  
  // Chaotic Suffixes based on Entropy level
  const suffixes = ["...", "!", " [LINK]", " #TRUTH", "!!!", " (WAKE UP)"];
  
  // Higher entropy = more likely to get a louder suffix
  const noiseLevel = Math.floor((entropy / 100) * suffixes.length);
  const selectedSuffix = suffixes[Math.min(noiseLevel, suffixes.length - 1)];

  return short + selectedSuffix;
};

export const checkSuppressionThreshold = (reach: number): boolean => {
  return reach > 5000;
};