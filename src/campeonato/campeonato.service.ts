import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, PaginateOptions } from 'mongoose';
import { Campeonato, CampeonatoDocument } from './entities/campeonato.entity';

@Injectable()
export class CampeonatoService {
  constructor(
    @InjectModel(Campeonato.name)
    private campeonatoModel: Model<CampeonatoDocument>,
  ) {}

  countAll() {
    return this.campeonatoModel.count().exec();
  }

  paginate(options: PaginateOptions) {
    return (this.campeonatoModel as PaginateModel<CampeonatoDocument>).paginate(
      {},
      options,
    );
  }

  findOne(id: string) {
    return this.campeonatoModel.findOne({ _id: id }).exec();
  }

  findSome(ids: string[]) {
    return this.campeonatoModel.find({ _id: { $in: ids } }).exec();
  }

  findBy(prop: string, value: string) {
    return this.campeonatoModel.find({ [prop]: value }).exec();
  }

  paginateByStatus(statusQuery: Object, options: PaginateOptions) {
    return (this.campeonatoModel as PaginateModel<CampeonatoDocument>).paginate(
      statusQuery,
      options,
    );
  }
}
