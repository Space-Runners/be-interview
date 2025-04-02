import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Image } from './app.types';
import config from './config';

interface CreateFontStyleData {
  text: string;
  styleId: number;
  numSamples: number;
}

@Injectable()
export class AppService {
  async createFontStyles(data: CreateFontStyleData): Promise<Image[]> {
    const prompt = `The text '${data.text}' in the art deco style of art by William Morris, art nouveau`;

    console.log(config);

    const response = await fetch(
      `${config.fluxApiUrl}/models/black-forest-labs/flux-schnell/predictions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.fluxApiKey}`,
          Prefer: 'wait',
        },
        body: JSON.stringify({ input: { prompt } }),
      },
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const responseData = (await response.json()) as { output: string[] };

    const images: Image[] =
      responseData?.output.map((imageUrl) => ({
        id: v4(),
        url: imageUrl || '',
        styleId: data.styleId,
        createdAt: new Date(),
      })) || [];

    return images;
  }
}
