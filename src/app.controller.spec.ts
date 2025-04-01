import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should fetch replicate for images', async () => {
      const expectedResult = {
        images: ['image1'],
      };

      jest.spyOn(appController, 'generateFont');
      jest
        .spyOn(appService, 'generateReplicateFont')
        .mockResolvedValue(expectedResult);

      const result = await appController.generateFont({
        styleId: 1,
        text: 'hello',
        numSamples: 1,
      });

      expect(result).toBe(expectedResult);
      expect(result.images.length).toBe(1);
    });

    it('should default to 3 samples if numSamples is not provided', async () => {
      const expectedResult = {
        images: ['image1'],
      };

      jest.spyOn(appController, 'generateFont');
      jest
        .spyOn(appService, 'generateReplicateFont')
        .mockResolvedValue(expectedResult);

      const result = await appController.generateFont({
        styleId: 1,
        text: 'hello',
      });

      expect(result).toBe(expectedResult);
      expect(appController.generateFont).toHaveBeenCalledWith({
        styleId: 1,
        text: 'hello',
        numSamples: 3,
      });
    });
  });
});
