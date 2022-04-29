import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  idRefAuth: string;

  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  sobrenome: string;

  @Prop()
  hashCPF: string;

  @Prop()
  timestampRegistro: number;

  @Prop()
  apelido: string;

  @Prop()
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongoosePaginate);
