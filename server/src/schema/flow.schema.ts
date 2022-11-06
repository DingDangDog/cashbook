import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlowDocument = Flow & Document;

@Schema()
export class Flow extends Document {
    @Prop({ index: true, unique: true })
    id: number;
    
    @Prop()
    userId: string;

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