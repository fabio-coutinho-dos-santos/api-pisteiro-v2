import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Pais } from './pais.entity';
import { Pelagem } from './pelagem.entity';
import { Raca } from './raca.entity';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type CavaloDocument = Cavalo & Document;

@Schema()
export class Cavalo {
  @Prop({ required: true })
  nome: string;

  @Prop()
  pai: string;

  @Prop()
  mae: string;

  @Prop({ required: true })
  raca: Raca;

  @Prop()
  pelagem: Pelagem;

  @Prop({ required: true })
  macho: boolean;

  @Prop({ required: true })
  nascimento: number;

  @Prop()
  registro: string;

  @Prop({ required: true, unique: true })
  chip: string;

  @Prop()
  nacionalidade: Pais;
  
  @Prop()
  estado: string;
  
  @Prop()
  cidade: string;

  @Prop()
  criador: string;

  @Prop()
  titulos: number;

  @Prop()
  premios: number;

  @Prop()
  vivo: boolean;

  @Prop()
  castrado: boolean;

  @Prop()
  bloqueado: boolean;

  @Prop()
  descricao: string;

  @Prop()
  listagem: string[];

  @Prop()
  avatarURL: string;
}

export const CavaloSchema = SchemaFactory.createForClass(Cavalo);
CavaloSchema.plugin(mongoosePaginate);
