import { IsInt, IsString } from 'class-validator';

export class GenerateFontDto {
  @IsInt()
  styleId: number;

  @IsString()
  text: string;

  numSamples?: number;
}
