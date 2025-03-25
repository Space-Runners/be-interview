import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FontMakerModule } from './font-maker/font-maker.module';

@Module({
  imports: [FontMakerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
