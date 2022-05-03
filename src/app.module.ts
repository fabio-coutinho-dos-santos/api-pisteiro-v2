import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JogadorModule } from './jogador/jogador.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { BalanceModule } from './balance/balance.module';
import { CampeonatoModule } from './campeonato/campeonato.module';
import { CategoriaModule } from './categoria/categoria.module';
import { CavaloModule } from './cavalo/cavalo.module';
import { ColeteModule } from './colete/colete.module';
import { ScoreModule } from './score/score.module';
import { TimeModule } from './time/time.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // MongooseModule.forRoot(
    //   `${process.env.MONGO_CONNECTION_STRING_BASE}://${
    //     process.env.MONGO_USER
    //   }:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER_USER}.${
    //     process.env.MONGO_CLUSTER_DOMAIN
    //   }/${process.env.MONGO_DATABASE_USER}${
    //     process.env.MONGO_CONNECTION_STRING_OPTIONS &&
    //     process.env.MONGO_CONNECTION_STRING_OPTIONS.length > 0
    //       ? '?' + process.env.MONGO_CONNECTION_STRING_OPTIONS
    //       : ''
    //   }`,
    //   { connectionName: 'USER' },
    // ),
    MongooseModule.forRoot(
      'mongodb://nodeauth:nodeauth@db-api-v2-user:27017/nodeauth?authSource=admin',{ connectionName: 'USER' }
    ),
    BalanceModule,
    CampeonatoModule,
    CategoriaModule,
    CavaloModule,
    ColeteModule,
    JogadorModule,
    ScoreModule,
    TimeModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
