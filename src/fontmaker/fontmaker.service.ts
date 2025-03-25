import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { FontMakerRequest, FontMakerResponse } from './fontmaker.dto';
import { STYLES } from 'src/common/constants';

@Injectable()
export class FontMakerService {
  constructor(private readonly httpService: HttpService) {}

  async makeFont(
    fontmakeRequest: FontMakerRequest,
  ): Promise<FontMakerResponse[]> {
    const input = {
      prompt: `The text '${fontmakeRequest.text}' in ${STYLES[fontmakeRequest.styleId].prompt}. Text should be spelled exactly like the word in quotes, the full text in quotes should be in the image, and no other text should be in the image.`,
    };

    try {
      const response = await firstValueFrom(
        await this.httpService.post(
          'https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions',
          {
            input,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
              Prefer: 'wait',
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      if (!response?.data) {
        throw new NotFoundException(
          `could not create image for ${JSON.stringify(fontmakeRequest)}`,
        );
      }

      const { created_at, id, output } = response?.data as any;
      return output.map((url: string) => ({
        createdAt: created_at,
        id,
        url,
        styleId: fontmakeRequest.styleId,
      }));
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
