import { IsOptional, IsString } from 'class-validator';

export class UpdateWordDto {
  @IsOptional()
  @IsString()
  word?: string;

  @IsOptional()
  @IsString()
  meaning?: string;

  @IsOptional()
  @IsString()
  example?: string;

  @IsOptional()
  @IsString()
  status?: 'NEW' | 'LEARNING' | 'REVIEW' | 'MASTERED';
}
