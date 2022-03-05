import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, PaginateOptions } from 'mongoose';
import { Colete, ColeteDocument } from './entities/colete.entity';

@Injectable()
export class ColeteService {
  constructor(
    @InjectModel(Colete.name) private coleteModel: Model<ColeteDocument>,
  ) {}

  countAll() {
    return this.coleteModel.count().exec();
  }

  paginate(options: PaginateOptions) {
    return (this.coleteModel as PaginateModel<ColeteDocument>).paginate(
      {},
      options,
    );
  }

  findOne(id: string) {
    return this.coleteModel.findOne({ _id: id }).exec();
  }

  findSome(ids: string[]) {
    return this.coleteModel.find({ _id: { $in: ids } }).exec();
  }

  findBy(prop: string, value: string) {
    return this.coleteModel.find({ [prop]: value }).exec();
  }

  findByCombo(combo: Object) {
    return this.coleteModel.find(combo).exec();
  }
  
  resultadoCategoria(idCategoria: string) {
    return this.coleteModel
      .find({ idRefCategoria: idCategoria })
      .sort({ resultado: -1 });
  }
}
