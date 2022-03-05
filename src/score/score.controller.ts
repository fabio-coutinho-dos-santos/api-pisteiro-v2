import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ErrorHandlerInterceptor } from 'src/interceptors/error-handler.interceptor';

@ApiBearerAuth()
@ApiTags('score')
@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get('count/')
  @UseInterceptors(ErrorHandlerInterceptor)
  countAll() {
    return this.scoreService.countAll();
  }

  @Get('ranking-campeonato/')
  @UseInterceptors(ErrorHandlerInterceptor)
  rankingCampeonato(
    @Query('idRefCampeonato') idRefCampeonato: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.scoreService.rankingCampeonato(idRefCampeonato, page, limit);
  }

  @Get('ranking-categoria/')
  @UseInterceptors(ErrorHandlerInterceptor)
  rankingCategoria(
    @Query('idRefCategoria') idRefCategoria: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.scoreService.rankingCategoria(idRefCategoria, page, limit);
  }
}
