import { IsString, IsBoolean } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  name: string;

  @IsString()
  text: string;

  @IsBoolean()
  isPublished: boolean;
}
