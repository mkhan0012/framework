export type EngineState = "IDLE" | "FRAMING" | "AMPLIFICATION" | "SUPPRESSION" | "MUTATION" | "LOG";

export type FramingVector = "FEAR" | "OUTRAGE" | "VALIDATION" | "CONFUSION";

export type Belief = {
  text: string;
  originalText: string;
  emotion: "neutral" | "fear" | "authority" | "anger" | "confusion";
  reach: number;
  visibility: number;
  vector?: FramingVector; // <--- ADDED
  aiRenderedText?: string;
};

export type LogEntry = {
  timestamp: string;
  message: string;
  note?: string;
};