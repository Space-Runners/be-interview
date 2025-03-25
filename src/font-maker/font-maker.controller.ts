import { Controller, Post, Body } from '@nestjs/common';
import { FontMakerService } from './font-maker.service';

export interface FontMakerRequest {
  text: string;
  styleId: number;
  numSamples: number;
}

@Controller()
export class FontMakerController {
  constructor(private readonly fontMakerService: FontMakerService) {}

  @Post('/fontmaker')
  newFont(@Body() data: FontMakerRequest): Promise<string> {
    return this.fontMakerService.createFont(data);
  }
}
