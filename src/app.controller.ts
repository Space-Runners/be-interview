import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { GenerateFontDto } from './dto/generate-font.dto';
import { GenerateFontResponse } from './dto/generate-font-response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/fontmaker')
  async generateFont(
    @Body(ValidationPipe) body: GenerateFontDto,
  ): Promise<GenerateFontResponse> {
    if (!body.numSamples) {
      body.numSamples = 3;
    }

    const generatedFonts = await this.appService.generateReplicateFont(body);
    return generatedFonts;
  }
}
