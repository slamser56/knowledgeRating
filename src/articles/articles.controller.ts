import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { Public } from 'decorators/public.decorator';
import { ExcludeNullInterceptor } from 'interceptors/excludeNull.interceptor';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/createArticle';
import { UpdateArticleDto } from './dto/updateArticle';
import { ArticleDocument } from './schemas/article.schema';

@Controller('articles')
@UseInterceptors(new ExcludeNullInterceptor())
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Public()
  @Get()
  findAll(): Promise<ArticleDocument[]> {
    return this.articleService.findAll();
  }

  @Public()
  @Get(':id')
  findById(@Param('id') id: string): Promise<ArticleDocument> {
    return this.articleService.findById(id);
  }

  @Post()
  create(@Body() articleDto: CreateArticleDto): Promise<ArticleDocument> {
    return this.articleService.create(articleDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() articleDto: UpdateArticleDto): Promise<ArticleDocument> {
    return this.articleService.update(id, articleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<ArticleDocument> {
    return this.articleService.delete(id);
  }
}
