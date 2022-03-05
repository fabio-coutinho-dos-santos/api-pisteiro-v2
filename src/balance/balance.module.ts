import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Balance, BalanceSchema } from './entities/balance.entity';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Balance.name, schema: BalanceSchema }],
      'USER',
    ),
  ],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
