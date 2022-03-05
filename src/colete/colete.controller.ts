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
import { ColeteService } from './colete.service';

@ApiBearerAuth()
@ApiTags('colete')
@Controller('colete')
export class ColeteController {
  constructor(private readonly coleteService: ColeteService) {}

  @Get('count/')
  @UseInterceptors(ErrorHandlerInterceptor)
  countAll() {
    return this.coleteService.countAll();
  }

  @Get('paginate/')
  @UseInterceptors(ErrorHandlerInterceptor)
  paginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    return this.coleteService.paginate({
      page: page,
      limit: limit,
      sort: { codigo: 1 },
    });
  }

  @Get(':id')
  @UseInterceptors(ErrorHandlerInterceptor)
  findOne(@Param('id') id: string) {
    return this.coleteService.findOne(id);
  }

  @Get('select/:ids')
  @UseInterceptors(ErrorHandlerInterceptor)
  findSome(@Param('ids') ids: string) {
    return this.coleteService.findSome(ids.split(','));
  }

  @Get('query/:prop/:value')
  @UseInterceptors(ErrorHandlerInterceptor)
  findBy(@Param('prop') prop: string, @Param('value') value: string) {
    return this.coleteService.findBy(prop, value);
  }

  @Get('categoria/:value')
  @UseInterceptors(ErrorHandlerInterceptor)
  findByCategoria(@Param('value') value: string) {
    return this.coleteService.findBy('idRefCategoria', value);
  }

  @Get('cavalo/:value')
  @UseInterceptors(ErrorHandlerInterceptor)
  findByCavalo(@Param('value') value: string) {
    return this.coleteService.findBy('idRefCavalo', value);
  }

  @Get('search/:idCategoria/:idCavalo')
  @UseInterceptors(ErrorHandlerInterceptor)
  findByCombo(
    @Param('idCategoria') idCategoria: string,
    @Param('idCavalo') idCavalo: string,
  ) {
    return this.coleteService.findByCombo({
      idRefCategoria: idCategoria,
      idRefCavalo: idCavalo,
    });
  }

  @Get('resultado-categoria/:idRefCategoria')
  @UseInterceptors(ErrorHandlerInterceptor)
  resultadoCategoria(@Param('idRefCategoria') idRefCategoria: string) {
    return this.coleteService.resultadoCategoria(idRefCategoria);
  }
}
