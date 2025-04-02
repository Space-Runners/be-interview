import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Image } from './app.types';

interface CreateFontStyleDto {
  text: string;
  styleId: number;
  numSamples: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('fontmaker')
  async createFontStyles(@Body() data: CreateFontStyleDto): Promise<Image[]> {
    console.log(data);

    return await this.appService.createFontStyles(data);
  }
}
