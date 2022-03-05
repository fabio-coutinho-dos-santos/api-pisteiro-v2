import {
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { TimeService } from './time.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ErrorHandlerInterceptor } from 'src/interceptors/error-handler.interceptor';

@ApiBearerAuth()
@ApiTags('time')
@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Get('count/')
  @UseInterceptors(ErrorHandlerInterceptor)
  countAll() {
    return this.timeService.countAll();
  }
}
