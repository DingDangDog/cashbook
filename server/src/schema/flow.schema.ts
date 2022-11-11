import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlowDocument = Flow & Document;

/**
 * 流水账实体
 */
@Schema()
export class Flow extends Document {
  @Prop({ index: true, unique: true })
  id: number;

  @Prop()
  userId: number;

  @Prop()
  day: Date;

  @Prop()
  type: string;

  @Prop()
  money: number;

  @Prop()
  payType: string;

  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const FlowSchema = SchemaFactory.createForClass(Flow);
