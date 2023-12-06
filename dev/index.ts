import 'dotenv/config';
import { ElevenLabs } from '../src';

(async () => {
  const voice = new ElevenLabs();

  const result = await voice.textToSpeech({
    text: 'This is a test of the ElevenLabs API.',
    fileName: 'test.mp3',
  });

  console.log(result);
})();
