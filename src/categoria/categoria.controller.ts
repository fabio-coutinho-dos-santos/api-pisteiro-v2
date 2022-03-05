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
import { CategoriaService } from './categoria.service';

@ApiBearerAuth()
@ApiTags('categoria')
@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}
  OBJECT_LIMIT = 50;

  @Get('count/')
  @UseInterceptors(ErrorHandlerInterceptor)
  countAll() {
    return this.categoriaService.countAll();
  }

  @Get('paginate/')
  @UseInterceptors(ErrorHandlerInterceptor)
  paginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    if (limit > this.OBJECT_LIMIT) limit = this.OBJECT_LIMIT;
    return this.categoriaService.paginate({
      page: page,
      limit: limit,
      sort: { inicio: 1, nome: 1 },
    });
  }

  @Get(':id')
  @UseInterceptors(ErrorHandlerInterceptor)
  findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(id);
  }

  @Get('select/:ids')
  @UseInterceptors(ErrorHandlerInterceptor)
  findSome(@Param('ids') ids: string) {
    return this.categoriaService.findSome(ids.split(','));
  }

  @Get('query/:prop/:value')
  @UseInterceptors(ErrorHandlerInterceptor)
  findBy(
    @Param('prop') prop: string,
    @Param('value') value: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    if (limit > this.OBJECT_LIMIT) limit = this.OBJECT_LIMIT;
    return this.categoriaService.findBy(prop, value, page, limit);
  }

  @Get('campeonato/:id')
  @UseInterceptors(ErrorHandlerInterceptor)
  findByCampeonato(
    @Param('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    if (limit > this.OBJECT_LIMIT) limit = this.OBJECT_LIMIT;
    return this.categoriaService.findBy('idRefCampeonato', id, page, limit);
  }
}
