import { IsString, IsBoolean } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  name: string;

  @IsString()
  text: string;

  @IsBoolean()
  isPublished: boolean;
}
