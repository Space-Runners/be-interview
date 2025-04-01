import { Injectable } from '@nestjs/common';
import { GenerateFontResponse } from './dto/generate-font-response.dto';
import { GenerateFontDto } from './dto/generate-font.dto';

const FontStylesMap = new Map<number, string>([
  [1, 'the art deco style of art by William Morris, art nouveau.'],
  [2, 'paper collage style of Hannah Hoch, Kurt Schwitters, and Man Ray'],
  [3, 'style of graffiti street art, neo-expressionalism.'],
  [4, 'the kidult style of cute drawings done by a preschooler'],
  [5, 'the linocut style of minimalistic stylised line work'],
  [6, 'retro sepia style of Charles Willson Peale.'],
  [7, 'origami style of Greg Rutkowski'],
  [8, 'risograph / grain print effect style'],
  [9, 'sculpted, polygonal style'],
  [
    10,
    'the vintage American poster style of Roger Broders, Otto Baumberger, Percy Trompf, Gert Sellheim.',
  ],
]);

const REPLICATE_API_URL =
  'https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions';

@Injectable()
export class AppService {
  async generateReplicateFont(
    data: GenerateFontDto,
  ): Promise<GenerateFontResponse> {
    if (!FontStylesMap.has(data.styleId)) {
      throw new Error('Invalid styleId');
    }

    const artStylePromptText = FontStylesMap.get(data.styleId);
    const prompt = `The text ${data.text} in ${artStylePromptText} Text should be spelled exactly like the word in quotes and no other text should be in the image`;
    const replicateBody = { input: { prompt, num_outputs: data.numSamples } };

    const response = await fetch(REPLICATE_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
        Prefer: 'wait',
      },
      body: JSON.stringify(replicateBody),
    });

    const replicateResponse = await response.json();
    return replicateResponse.output;
  }
}
