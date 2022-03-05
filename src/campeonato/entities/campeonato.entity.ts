import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type CampeonatoDocument = Campeonato & Document;

@Schema()
export class Campeonato {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  inicio: number;

  @Prop({ required: true })
  abertura: number;

  @Prop()
  logoURL: string;

  @Prop()
  bannerURL: string;

  @Prop()
  descricao: string;

  @Prop()
  jurados: string[];

  @Prop()
  tipo: string;

  @Prop()
  iniciado: boolean;

  @Prop()
  ativo: boolean;

  @Prop()
  finalizado: boolean;
}

export const CampeonatoSchema = SchemaFactory.createForClass(Campeonato);
CampeonatoSchema.plugin(mongoosePaginate);
