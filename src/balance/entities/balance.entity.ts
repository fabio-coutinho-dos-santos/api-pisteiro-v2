import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type BalanceDocument = Balance & Document;

@Schema()
export class Balance {
  @Prop({ required: true })
  idRefUser: string;

  @Prop({ required: true })
  idRefCategoria: string;

  @Prop()
  balance: number;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);
BalanceSchema.plugin(mongoosePaginate);


