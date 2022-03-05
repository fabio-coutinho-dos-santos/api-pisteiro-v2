import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './entities/score.entity';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Score.name, schema: ScoreSchema }],
      'USER',
    ),
  ],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
