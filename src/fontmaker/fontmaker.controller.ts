import {
  Body,
  Controller,
  Post,
  PreconditionFailedException,
} from '@nestjs/common';
import { FontMakerService } from './fontmaker.service';
import { FontMakerRequest, FontMakerResponse } from './fontmaker.dto';

@Controller('/fontmaker')
export class FontMakerController {
  constructor(private readonly fontmakerService: FontMakerService) {}

  @Post('/')
  async createImagesFromFont(
    @Body() fontMaker: FontMakerRequest,
  ): Promise<FontMakerResponse[]> {
    if (!fontMaker?.text || fontMaker.text.trim() === '') {
      throw new PreconditionFailedException('fontmaker text is empty');
    }

    if (!fontMaker?.styleId || typeof fontMaker.styleId !== 'number') {
      throw new PreconditionFailedException(
        'fontmaker styleId does not meet the requirements',
      );
    }

    if (fontMaker.styleId > 2) {
      throw new PreconditionFailedException(
        `Font styleId should not be greater than 2`,
      );
    }

    return this.fontmakerService.makeFont(fontMaker);
  }
}
