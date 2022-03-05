import { Module } from '@nestjs/common';
import { CavaloService } from './cavalo.service';
import { CavaloController } from './cavalo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cavalo, CavaloSchema } from './entities/cavalo.entity';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Cavalo.name, schema: CavaloSchema }],
      'USER',
    ),
  ],
  controllers: [CavaloController],
  providers: [CavaloService],
})
export class CavaloModule {}
