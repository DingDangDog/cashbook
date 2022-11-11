import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

/**
 * 用户实体
 */
@Schema()
export class Book extends Document {
  @Prop({ index: true, unique: true })
  id: number;

  @Prop()
  bookName: string;

  @Prop({ unique: true })
  bookKey: string;

  @Prop()
  createDate: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
