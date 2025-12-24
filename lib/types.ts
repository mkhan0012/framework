export type EngineState = "IDLE" | "FRAMING" | "AMPLIFICATION" | "SUPPRESSION" | "MUTATION" | "LOG";

export type Belief = {
  text: string;
  originalText: string;
  emotion: "neutral" | "fear" | "authority";
  reach: number;
  visibility: number; // 1.0 (visible) -> 0.0 (hidden)
};

export type LogEntry = {
  timestamp: string;
  message: string;
};