import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type CategoriaDocument = Categoria & Document;

@Schema()
export class Categoria {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  idRefCampeonato: string;

  @Prop({ required: true })
  inicio: number;

  @Prop()
  descricao: string;

  @Prop()
  numeroCavalos: number;

  @Prop()
  saldoInicial: number;

  @Prop()
  valorBase: number;

  @Prop()
  valorMod1: number;

  @Prop()
  valorMod2: number;

  @Prop()
  chavePontos: number[];

  @Prop()
  chaveBonus: number[];

  @Prop()
  iniciado: boolean;

  @Prop()
  fechado: boolean;

  @Prop()
  finalizado: boolean;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
CategoriaSchema.plugin(mongoosePaginate);
