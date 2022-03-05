import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ErrorHandlerInterceptor } from 'src/interceptors/error-handler.interceptor';
import { CavaloService } from './cavalo.service';
@ApiBearerAuth()
@ApiTags('cavalo')
@Controller('cavalo')
export class CavaloController {
  OBJECT_LIMIT = 50;

  constructor(private readonly cavaloService: CavaloService) {}

  @Get('count/')
  @UseInterceptors(ErrorHandlerInterceptor)
  countAll() {
    return this.cavaloService.countAll();
  }

  @Get('destaques/')
  @UseInterceptors(ErrorHandlerInterceptor)
  destaques(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    if (limit > this.OBJECT_LIMIT) limit = this.OBJECT_LIMIT;
    return this.cavaloService.destaques(page, limit);
  }

  @Get('paginate/')
  @UseInterceptors(ErrorHandlerInterceptor)
  paginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    if (limit > this.OBJECT_LIMIT) limit = this.OBJECT_LIMIT;
    return this.cavaloService.paginate({
      page: page,
      limit: limit,
      sort: { nome: 1, nascimento: -1 },
    });
  }

  @Get(':id')
  @UseInterceptors(ErrorHandlerInterceptor)
  findOne(@Param('id') id: string) {
    return this.cavaloService.findOne(id);
  }

  @Get('select/:ids')
  @UseInterceptors(ErrorHandlerInterceptor)
  findSome(@Param('ids') ids: string) {
    let arrayIds = ids.split(',');
    if (arrayIds.length === 0) return null;
    if (arrayIds.length > 0)
      arrayIds = arrayIds.slice(0, this.OBJECT_LIMIT - 1);
    return this.cavaloService.findSome(arrayIds);
  }

  @Get('registro/:registro')
  @UseInterceptors(ErrorHandlerInterceptor)
  findReg(@Param('registro') registro: string) {
    return this.cavaloService.findReg(registro);
  }

  @Get('chip/:chip')
  @UseInterceptors(ErrorHandlerInterceptor)
  findKey(@Param('chip') chip: string) {
    return this.cavaloService.findKey(chip);
  }

  @Get('idade/')
  @UseInterceptors(ErrorHandlerInterceptor)
  findByAge(
    @Query('nascimentoInicio', ParseIntPipe) nascimentoInicio: number,
    @Query('nascimentoFim', ParseIntPipe) nascimentoFim: number,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 50,
  ) {
    return this.cavaloService.findByAge(
      nascimentoInicio,
      nascimentoFim,
      page,
      limit,
    );
  }

  @Get('query-paginate/:prop/:value')
  @UseInterceptors(ErrorHandlerInterceptor)
  findByPaginate(
    @Param('prop') prop: string,
    @Param('value') value: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 50,
  ) {
    console.log(value);
    if (limit > this.OBJECT_LIMIT) limit = this.OBJECT_LIMIT;
    return this.cavaloService.findByPaginate(page, limit, prop, value);
  }
}
