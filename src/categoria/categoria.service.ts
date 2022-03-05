import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, PaginateOptions } from 'mongoose';
import { Categoria, CategoriaDocument } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectModel(Categoria.name)
    private categoriaModel: Model<CategoriaDocument>,
  ) {}

  countAll() {
    return this.categoriaModel.count().exec();
  }

  paginate(options: PaginateOptions) {
    return (this.categoriaModel as PaginateModel<CategoriaDocument>).paginate(
      {},
      options,
    );
  }

  findOne(id: string) {
    return this.categoriaModel.findOne({ _id: id }).exec();
  }

  findSome(ids: string[]) {
    return this.categoriaModel.find({ _id: { $in: ids } }).exec();
  }

  findBy(prop: string, value: string, page: number, limit: number) {
    return (this.categoriaModel as PaginateModel<CategoriaDocument>).paginate(
      { [prop]: value },
      { sort: { inicio: 1, nome: 1, _id: 1 }, page: page, limit: limit },
    );
  }
}
