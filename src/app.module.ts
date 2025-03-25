import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FontMakerModule } from './fontmaker/fontmaker.module';
import { StyleModule } from './style/style.module';

@Module({
  imports: [FontMakerModule, StyleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
