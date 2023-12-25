export type ElevenLabsOptions = {
  apiKey?: string;
  voiceId?: string;
  baseUrl?: string;
};

export type TextToSpeechOptions = {
  text: string;
  modelId?: string;
  stability?: number;
  similarityBoost?: number;
  style?: number;
  speakerBoost?: boolean;
};
