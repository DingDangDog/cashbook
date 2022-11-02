import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlowDocument = Flow & Document;

@Schema()
export class Flow extends Document {
    @Prop({ index: true, unique: true })
    id: number;

    @Prop()
    day: Date;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    money: number;

    @Prop()
    type: string;
}

export const FlowSchema = SchemaFactory.createForClass(Flow);