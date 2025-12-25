export type EngineState = "IDLE" | "FRAMING" | "AMPLIFICATION" | "SUPPRESSION" | "MUTATION" | "LOG";

// Updated to allow string for custom vectors
export type FramingVector = "FEAR" | "OUTRAGE" | "VALIDATION" | "CONFUSION" | string;

export type CustomVectorConfig = {
    label: string;
    color: string; // Tailwind class like 'text-pink-500' or hex
    hex: string;
    glow: string;
    border: string;
};

export type Belief = {
  text: string;
  originalText: string;
  emotion: "neutral" | "fear" | "authority" | "anger" | "confusion" | string;
  reach: number;
  visibility: number;
  vector?: FramingVector; 
  aiRenderedText?: string;
};

export type LogEntry = {
  timestamp: string;
  message: string;
  note?: string;
};