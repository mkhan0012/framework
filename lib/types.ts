export type EngineState = "IDLE" | "FRAMING" | "AMPLIFICATION" | "SUPPRESSION" | "MUTATION" | "LOG";

export type Belief = {
  text: string;           // The logical truth (Rules)
  originalText: string;
  emotion: "neutral" | "fear" | "authority";
  reach: number;
  visibility: number; 
  
  // ADD THIS OPTIONAL FIELD
  aiRenderedText?: string; // The visual representation (AI)
};

export type LogEntry = {
  timestamp: string;
  message: string;
};