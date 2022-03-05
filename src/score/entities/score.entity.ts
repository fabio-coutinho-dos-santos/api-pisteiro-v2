import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { ScoreScope } from './score-scope.entity';

export type ScoreDocument = Score & Document;

@Schema({ timestamps: true })
export class Score {
  @Prop({ required: true })
  idRefUser: string;

  @Prop({ required: true })
  idRefScore: string;

  @Prop()
  score: number;

  @Prop()
  scope: ScoreScope;

  @Prop()
  timestampRef: number;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
ScoreSchema.plugin(mongoosePaginate);


