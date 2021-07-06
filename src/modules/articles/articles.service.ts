import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/createArticle';
import { UpdateArticleDto } from './dto/updateArticle';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async create(articleDto: CreateArticleDto): Promise<ArticleDocument> {
    const newArticle = new this.articleModel(articleDto);
    return newArticle.save();
  }

  async update(id: string, articleDto: UpdateArticleDto): Promise<ArticleDocument> {
    return this.articleModel.findByIdAndUpdate(id, articleDto).exec();
  }

  async findAll(): Promise<ArticleDocument[]> {
    return this.articleModel.find().exec();
  }

  async findById(id: string): Promise<ArticleDocument> {
    return this.articleModel.findById(id).exec();
  }

  async delete(id: string): Promise<ArticleDocument> {
    return this.articleModel.findByIdAndDelete(id).exec();
  }
}
