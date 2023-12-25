import axios from 'axios';
import { ElevenLabsOptions, TextToSpeechOptions } from './types';

export class ElevenLabs {
  readonly apiKey?: string;
  readonly voiceId: string;
  readonly baseUrl: string;

  constructor(options?: ElevenLabsOptions) {
    this.apiKey =
      options?.apiKey || process.env.ELEVENLABS_API_KEY || undefined;
    this.voiceId = options?.voiceId ? options.voiceId : 'pFZP5JQG7iQjIQuC4Bku';
    this.baseUrl = options?.baseUrl
      ? options.baseUrl
      : 'https://api.elevenlabs.io/v1';

    if (!this.apiKey) {
      throw new Error('No API key provided');
    }
  }

  async textToSpeech(options: TextToSpeechOptions) {
    const voiceId = this.voiceId;
    const voiceURL = `${this.baseUrl}/text-to-speech/${voiceId}`;
    const text = options.text;
    const stability = options.stability ?? 0.5;
    const similarityBoost = options.similarityBoost ?? 0.75;
    const style = options.style ?? 0;
    const speakerBoost = options.speakerBoost ?? true;
    const modelId = options.modelId ?? 'eleven_multilingual_v2';

    if (!text) {
      throw new Error('Missing parameter: text');
    }

    const { data } = await axios({
      method: 'POST',
      url: voiceURL,
      data: {
        text,
        voice_settings: {
          stability,
          similarity_boost: similarityBoost,
          style,
          use_speaker_boost: speakerBoost,
        },
        model_id: modelId,
      },
      headers: {
        Accept: 'audio/mpeg',
        'xi-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });

    return data as Buffer;
  }
}
