import { Module } from '@nestjs/common';
import { CampeonatoService } from './campeonato.service';
import { CampeonatoController } from './campeonato.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Campeonato, CampeonatoSchema } from './entities/campeonato.entity';
import {
  Categoria,
  CategoriaSchema,
} from 'src/categoria/entities/categoria.entity';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Campeonato.name, schema: CampeonatoSchema },
        { name: Categoria.name, schema: CategoriaSchema },
      ],
      'USER',
    ),
  ],
  controllers: [CampeonatoController],
  providers: [CampeonatoService],
})
export class CampeonatoModule {}
