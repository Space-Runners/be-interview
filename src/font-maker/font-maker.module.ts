import { Module } from '@nestjs/common';
import { FontMakerController } from './font-maker.controller';
import { FontMakerService } from './font-maker.service';

@Module({
  imports: [],
  controllers: [FontMakerController],
  providers: [FontMakerService],
})
export class FontMakerModule {}
