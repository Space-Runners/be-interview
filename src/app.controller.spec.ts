import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('createFontStyles', () => {
    it('should return an array of images', async () => {
      const response = await appController.createFontStyles({
        text: 'Testing text',
        styleId: 1,
        numSamples: 1,
      });

      expect(response).toStrictEqual([
        {
          id: expect.any(String),
          url: expect.any(String),
          styleId: 1,
          createdAt: expect.any(Date),
        },
      ]);
    });
  });
});
