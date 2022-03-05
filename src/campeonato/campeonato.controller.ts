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
import { CampeonatoService } from './campeonato.service';

@ApiBearerAuth()
@ApiTags('campeonato')
@Controller('campeonato')
export class CampeonatoController {
  constructor(private readonly campeonatoService: CampeonatoService) {}
  OBJECT_LIMIT = 50;

  @Get('count/')
  @UseInterceptors(ErrorHandlerInterceptor)
  countAll() {
    return this.campeonatoService.countAll();
  }

  @Get('paginate/')
  @UseInterceptors(ErrorHandlerInterceptor)
  paginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    if (limit > this.OBJECT_LIMIT) limit = this.OBJECT_LIMIT;
    return this.campeonatoService.paginate({
      page: page,
      limit: limit,
      sort: { abertura: -1, nome: 1 },
    });
  }

  @Get(':id')
  @UseInterceptors(ErrorHandlerInterceptor)
  findOne(@Param('id') id: string) {
    return this.campeonatoService.findOne(id);
  }

  @Get('select/:ids')
  @UseInterceptors(ErrorHandlerInterceptor)
  findSome(@Param('ids') ids: string) {
    return this.campeonatoService.findSome(ids.split(','));
  }

  @Get('query/:prop/:value')
  @UseInterceptors(ErrorHandlerInterceptor)
  findBy(@Param('prop') prop: string, @Param('value') value: string) {
    return this.campeonatoService.findBy(prop, value);
  }

  @Get('status/futuros')
  @UseInterceptors(ErrorHandlerInterceptor)
  futuros(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    if (limit > this.OBJECT_LIMIT) limit = this.OBJECT_LIMIT;
    return this.campeonatoService.paginateByStatus(
      { $or: [{ iniciado: false }, { iniciado: null }] },
      { page: page, limit: limit },
    );
  }

  @Get('status/abertos')
  @UseInterceptors(ErrorHandlerInterceptor)
  abertos(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    if (limit > this.OBJECT_LIMIT) limit = this.OBJECT_LIMIT;
    return this.campeonatoService.paginateByStatus(
      { iniciado: true, $or: [{ ativo: false }, { ativo: null }] },
      { page: page, limit: limit },
    );
  }

  @Get('status/ativos')
  @UseInterceptors(ErrorHandlerInterceptor)
  ativos(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    if (limit > this.OBJECT_LIMIT) limit = this.OBJECT_LIMIT;
    return this.campeonatoService.paginateByStatus(
      { ativo: true, $or: [{ finalizado: false }, { finalizado: null }] },
      { page: page, limit: limit },
    );
  }

  @Get('status/finalizados')
  @UseInterceptors(ErrorHandlerInterceptor)
  finalizados(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    if (limit > this.OBJECT_LIMIT) limit = this.OBJECT_LIMIT;
    return this.campeonatoService.paginateByStatus(
      { finalizado: true },
      { page: page, limit: limit },
    );
  }
}
