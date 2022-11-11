import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

/**
 * 用户实体
 */
@Schema()
export class User extends Document {
  @Prop({ index: true, unique: true })
  id: number;

  @Prop()
  userName: string;

  @Prop({ unique: true })
  userKey: string;

  @Prop()
  createDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
