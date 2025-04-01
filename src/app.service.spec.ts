import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { GenerateFontDto } from './dto/generate-font.dto';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  it('should throw an error if styleId is invalid', async () => {
    const invalidDto: GenerateFontDto = {
      styleId: 999,
      text: 'Test',
      numSamples: 1,
    };

    await expect(appService.generateReplicateFont(invalidDto)).rejects.toThrow(
      'Invalid styleId',
    );
  });

  it('should call fetch with correct parameters', async () => {
    const validDto: GenerateFontDto = {
      styleId: 1,
      text: 'Test',
      numSamples: 1,
    };

    const mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ output: 'mockOutput' }),
    });

    // Note: resetting fetch here for testing
    global.fetch = mockFetch as any;

    const result = await appService.generateReplicateFont(validDto);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json',
          Prefer: 'wait',
        },
        body: JSON.stringify({
          input: {
            prompt:
              'The text Test in the art deco style of art by William Morris, art nouveau. Text should be spelled exactly like the word in quotes and no other text should be in the image',
            num_outputs: 1,
          },
        }),
      },
    );

    expect(result).toBe('mockOutput');
  });

  it('should return the correct output from the API', async () => {
    const validDto: GenerateFontDto = {
      styleId: 2,
      text: 'Hello',
      numSamples: 2,
    };

    const mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ output: ['image1', 'image2'] }),
    });

    global.fetch = mockFetch as any;

    const result = await appService.generateReplicateFont(validDto);

    expect(result).toEqual(['image1', 'image2']);
  });

  it('should handle API errors gracefully', async () => {
    const validDto: GenerateFontDto = {
      styleId: 3,
      text: 'ErrorTest',
      numSamples: 1,
    };

    const mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockRejectedValue(new Error('API Error')),
    });

    global.fetch = mockFetch as any;

    await expect(appService.generateReplicateFont(validDto)).rejects.toThrow();
  });
});
