import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type ColeteDocument = Colete & Document;

@Schema()
export class Colete {
  @Prop({ required: true })
  codigo: string;

  @Prop({ required: true })
  idRefCategoria: string;

  @Prop({ required: true })
  idRefCavalo: string;

  @Prop()
  expositor: string;

  @Prop()
  status: boolean;

  @Prop()
  resultado: number;
}

export const ColeteSchema = SchemaFactory.createForClass(Colete);
ColeteSchema.plugin(mongoosePaginate);
