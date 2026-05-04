import { IsString, IsOptional } from 'class-validator';

export class CreateWordDto {
  @IsString()
  word!: string;

  @IsString()
  meaning!: string;

  @IsOptional()
  @IsString()
  example?: string;
}
