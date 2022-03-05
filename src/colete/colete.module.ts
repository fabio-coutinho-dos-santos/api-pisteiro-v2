import { Module } from '@nestjs/common';
import { ColeteService } from './colete.service';
import { ColeteController } from './colete.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Colete, ColeteSchema } from './entities/colete.entity';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Colete.name, schema: ColeteSchema }],
      'USER',
    ),
  ],
  controllers: [ColeteController],
  providers: [ColeteService],
})
export class ColeteModule {}
