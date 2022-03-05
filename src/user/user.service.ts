import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  countAll() {
    return this.userModel.count().exec();
  }
  findOnePublicProfile(id: string) {
    return this.userModel
      .findOne({ _id: id }, { _id: 1, apelido: 1, avatar: 1 })
      .exec();
  }

  findSomePublicProfile(ids: string[]) {
    return this.userModel
      .find({ _id: { $in: ids } }, { _id: 1, apelido: 1, avatar: 1 })
      .exec();
  }
}
