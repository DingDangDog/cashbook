import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DistDocument = Dist & Document;

@Schema()
export class Dist extends Document {
  @Prop({ index: true, unique: true })
  id: number;

  @Prop()
  type: string;

  @Prop()
  distKey: string;

  @Prop()
  distValue: string;

  @Prop()
  sort: number;
}

export const DistSchema = SchemaFactory.createForClass(Dist);
