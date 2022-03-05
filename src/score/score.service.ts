import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateOptions, PaginateModel } from 'mongoose';
import { ScoreScope } from './entities/score-scope.entity';
import { Score, ScoreDocument } from './entities/score.entity';

@Injectable()
export class ScoreService {
  constructor(
    @InjectModel(Score.name) private scoreModel: Model<ScoreDocument>,
  ) {}

  countAll() {
    return this.scoreModel.count().exec();
  }

  rankingCategoria(idRefCategoria: string, page: number, limit: number) {
    return (this.scoreModel as PaginateModel<ScoreDocument>).paginate(
      {
        idRefScore: idRefCategoria,
        scope: ScoreScope.categoria,
        score: { $gt: 0 },
      },
      {
        page: page,
        limit: limit,
        sort: { score: -1, timestampRef: 1, _id: 1 },
        projection: { idRefUser: 1, score: 1, timestampRef: 1 },
      },
    );
  }

  rankingCampeonato(idRefCampeonato: string, page: number, limit: number) {
    return (this.scoreModel as PaginateModel<ScoreDocument>).paginate(
      {
        idRefScore: idRefCampeonato,
        scope: ScoreScope.campeonato,
        score: { $gt: 0 },
      },
      {
        page: page,
        limit: limit,
        sort: { score: -1, timestampRef: 1, _id: 1 },
        projection: { idRefUser: 1, score: 1, timestampRef: 1 },
      },
    );
  }
}
