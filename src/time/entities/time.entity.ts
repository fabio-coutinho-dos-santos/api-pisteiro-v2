import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type TimeDocument = Time & Document;

@Schema({ timestamps: true })
export class Time {
  @Prop({ required: true })
  idRefUser: string;

  @Prop({ required: true })
  idRefCategoria: string;

  @Prop()
  cavalos: string[];

  @Prop()
  pontos: number[];

  @Prop()
  resultado: number;
}

export const TimeSchema = SchemaFactory.createForClass(Time);
TimeSchema.plugin(mongoosePaginate);
