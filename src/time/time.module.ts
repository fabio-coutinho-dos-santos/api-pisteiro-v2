import { Module } from '@nestjs/common';
import { TimeService } from './time.service';
import { TimeController } from './time.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Time, TimeSchema } from './entities/time.entity';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Time.name, schema: TimeSchema }],
      'USER',
    ),
  ],
  controllers: [TimeController],
  providers: [TimeService],
})
export class TimeModule {}
