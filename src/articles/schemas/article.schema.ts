import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({ required: true })
  authorId: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  text: string;

  @Prop({ default: false })
  isPublished: boolean;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
