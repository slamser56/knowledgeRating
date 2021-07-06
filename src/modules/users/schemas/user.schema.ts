import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'enums/role.enum';
import { Document, Schema as MongoSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  language: string;

  @Prop()
  specialization: string;

  @Prop({ enum: Role, default: Role.User, required: true, type: MongoSchema.Types.String })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
