import { Module } from '@nestjs/common';
import { JogadorService } from './jogador.service';
import { JogadorController } from './jogador.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { Balance, BalanceSchema } from 'src/balance/entities/balance.entity';
import {
  Categoria,
  CategoriaSchema,
} from 'src/categoria/entities/categoria.entity';
import { Cavalo, CavaloSchema } from 'src/cavalo/entities/cavalo.entity';
import { Colete, ColeteSchema } from 'src/colete/entities/colete.entity';
import { Score, ScoreSchema } from 'src/score/entities/score.entity';
import { Time, TimeSchema } from 'src/time/entities/time.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Categoria.name, schema: CategoriaSchema },
        { name: Colete.name, schema: ColeteSchema },
        { name: Cavalo.name, schema: CavaloSchema },
        { name: Time.name, schema: TimeSchema },
        { name: User.name, schema: UserSchema },
        { name: Score.name, schema: ScoreSchema },
        { name: Balance.name, schema: BalanceSchema },
      ],
      'USER',
    ),
  ],
  controllers: [JogadorController],
  providers: [JogadorService, JwtStrategy],
})
export class JogadorModule {}
