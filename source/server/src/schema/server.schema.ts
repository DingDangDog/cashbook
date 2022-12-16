import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServerDocument = Server & Document;

/**
 * 服务信息
 */
@Schema()
export class Server extends Document {
  @Prop({ index: true, unique: true })
  id: number;

  @Prop()
  version: string;

  @Prop()
  environment: string;

  @Prop()
  createDate: Date;

  @Prop()
  startDate: Date;
}

export const ServerSchema = SchemaFactory.createForClass(Server);
