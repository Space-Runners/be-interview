import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FontMakerController } from './fontmaker.controller';
import { FontMakerService } from './fontmaker.service';

@Module({
  imports: [HttpModule],
  controllers: [FontMakerController],
  providers: [FontMakerService],
})
export class FontMakerModule {}
