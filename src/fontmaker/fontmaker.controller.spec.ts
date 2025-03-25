import { Test, TestingModule } from '@nestjs/testing';
import { FontMakerController } from './fontmaker.controller';
import { FontMakerService } from './fontmaker.service';

describe('FontMakerController', () => {
  let fontMakerController: FontMakerController;
  let fontMakerService: FontMakerService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FontMakerController],
      providers: [FontMakerService],
    }).compile();

    fontMakerController = app.get<FontMakerController>(FontMakerController);
    fontMakerService = app.get<FontMakerService>(FontMakerService);
  });

  describe('root', () => {
    let makeFontSpy: jest.SpyInstance;

    beforeEach(() => {
      makeFontSpy = jest.spyOn(fontMakerService, 'makeFont');
    });

    it('should throw precondition error when text is not defined', async () => {
      await expect(
        fontMakerController.createImagesFromFont({} as any),
      ).rejects.toThrow('fontmaker text is empty');
      expect(makeFontSpy).not.toHaveBeenCalled();
    });

    it('should throw precondition error when text is empty', async () => {
      await expect(
        fontMakerController.createImagesFromFont({ text: '   ' } as any),
      ).rejects.toThrow('fontmaker text is empty');
      expect(makeFontSpy).not.toHaveBeenCalled();
    });

    it('should throw precondition error when styleId is not a number', async () => {
      await expect(
        fontMakerController.createImagesFromFont({
          text: 'hello_word',
          styleId: '1',
        } as any),
      ).rejects.toThrow('fontmaker styleId does not meet the requirements');
      expect(makeFontSpy).not.toHaveBeenCalled();
    });

    it('should call makeFont if validation passes', async () => {
      makeFontSpy.mockResolvedValueOnce({});
      await fontMakerController.createImagesFromFont({
        text: 'my text',
        styleId: 1,
      });
      expect(makeFontSpy).toHaveBeenCalled();
    });
  });
});
