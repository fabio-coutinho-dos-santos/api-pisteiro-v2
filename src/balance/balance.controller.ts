import {
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { BalanceService } from './balance.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ErrorHandlerInterceptor } from 'src/interceptors/error-handler.interceptor';

@ApiBearerAuth()
@ApiTags('balance')
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get('count/')
  @UseInterceptors(ErrorHandlerInterceptor)
  countAll() {
    return this.balanceService.countAll();
  }
}
