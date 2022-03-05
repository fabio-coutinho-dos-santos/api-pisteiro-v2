import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Time, TimeDocument } from './entities/time.entity';

@Injectable()
export class TimeService {
  constructor(@InjectModel(Time.name) private timeModel: Model<TimeDocument>) {}

  countAll() {
    return this.timeModel.count().exec();
  }
}
