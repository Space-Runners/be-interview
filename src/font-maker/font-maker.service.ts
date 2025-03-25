import { Injectable } from '@nestjs/common';
import { FontMakerRequest } from './font-maker.controller';

const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;
const promptMap = new Map<number, string>([
  [1, 'the art deco style of art by William Morris, art nouveau.'],
  [2, 'paper collage style of Hannah Hoch, Kurt Schwitters, and Man Ray'],
  [3, 'Prompt 3'],
  [4, 'Prompt 1'],
  [5, 'Prompt 2'],
  [6, 'Prompt 3'],
  [7, 'Prompt 1'],
  [8, 'Prompt 2'],
  [9, 'Prompt 3'],
  [10, 'Prompt 1'],
  [11, 'Prompt 2'],
]);

@Injectable()
export class FontMakerService {
  async createFont(body: FontMakerRequest): Promise<string> {
    const { styleId, text } = body;
    const prompt = promptMap.get(styleId);
    if (!prompt) {
      throw new Error('Invalid style ID');
    }

    const promptToUse = `The text '${text}' in ${prompt} Text should spelled exactly like the word in quotes and no other text should be in the image`;
    const url = await this.callReplicate(promptToUse);

    await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${REPLICATE_API_KEY}`,
      },
    });

    const json = (await response.json()) as { output: string[] };
    const output = json.output[0];
    return output.toString();
  }

  private async callReplicate(prompt: string): Promise<string> {
    const endPoint =
      'https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions';
    const headers = {
      Authorization: `Bearer ${REPLICATE_API_KEY}`,
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({ input: { prompt } });
    const response = await fetch(endPoint, {
      method: 'POST',
      headers,
      body,
    });

    const data = (await response.json()) as { urls: { get: string } };
    const { urls } = data;
    return urls.get;
  }
}
