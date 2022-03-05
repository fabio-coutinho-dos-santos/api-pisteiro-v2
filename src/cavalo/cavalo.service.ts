import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, PaginateOptions } from 'mongoose';
import { Cavalo, CavaloDocument } from './entities/cavalo.entity';

@Injectable()
export class CavaloService {
  constructor(
    @InjectModel(Cavalo.name) private cavaloModel: Model<CavaloDocument>,
  ) {}

  countAll() {
    return this.cavaloModel.count().exec();
  }

  paginate(options: PaginateOptions) {
    return (this.cavaloModel as PaginateModel<CavaloDocument>).paginate(
      {},
      options,
    );
  }

  findOne(id: string) {
    return this.cavaloModel.findOne({ _id: id }).exec();
  }

  findSome(ids: string[]) {
    return this.cavaloModel.find({ _id: { $in: ids } }).exec();
  }

  findReg(registro: string) {
    return this.cavaloModel.find({ registro: registro }).exec();
  }

  findKey(chip: string) {
    return this.cavaloModel.find({ chip: chip }).exec();
  }

  findByPaginate(page: number, limit: number, prop: string, value: string) {
    return (this.cavaloModel as PaginateModel<CavaloDocument>).paginate(
      { [prop]: { $regex: new RegExp(value, 'i') } },
      { page: page, limit: limit, sort: { nome: 1 } },
    );
  }

  findByAge(
    nascimentoInicio: number,
    nascimentoFim: number,
    page: number,
    limit: number,
  ) {
    return (this.cavaloModel as PaginateModel<CavaloDocument>).paginate(
      { nascimento: { $gte: nascimentoInicio, $lte: nascimentoFim } },
      { page: page, limit: limit },
    );
  }

  destaques(page: number, limit: number) {
    return (this.cavaloModel as PaginateModel<CavaloDocument>).paginate(
      { bloqueado: false },
      {
        page: page,
        limit: limit,
        sort: { titulos: -1, premios: -1, nascimento: 1 },
      },
    );
  }
}
