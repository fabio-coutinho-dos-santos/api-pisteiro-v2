import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseInterceptors,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ErrorHandlerInterceptor } from 'src/interceptors/error-handler.interceptor';
import { JogadorService } from './jogador.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { EscolherTimeDto } from './dto/escolher-time.dto';
import { inscreverCategoriaDto } from './dto/inscrever-categoria.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@ApiTags('jogador')
@Controller('jogador')
export class JogadorController {
  constructor(private readonly jogadorService: JogadorService) {}
  OBJECT_LIMIT = 50;

  @Get('')
  @UseInterceptors(ErrorHandlerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  meuCadastro(@Req() req) {
    return this.jogadorService.meuCadastro(req.user);
  }

  @Post('registro')
  @UseInterceptors(ErrorHandlerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createUserDto: CreateUserDto, @Req() req) {
    return this.jogadorService.registro(createUserDto, req.user);
  }

  @Patch('registro')
  @UseInterceptors(ErrorHandlerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  update(@Body() userData: UpdateUserDto, @Req() req) {
    const filteredData = Object.fromEntries(Object.entries(userData).filter(([_, v]) => v != null));
    return this.jogadorService.update(filteredData, req.user);
  }

  @Get('meus-campeonatos')
  @UseInterceptors(ErrorHandlerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  meusCampeonatos(@Req() req) {
    return this.jogadorService.meusCampeonatos(req.user);
  }

  @Get('minhas-categorias')
  @UseInterceptors(ErrorHandlerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  minhasCategorias(@Req() req) {
    return this.jogadorService.minhasCategorias(req.user);
  }

  @Get('checar-categoria')
  @UseInterceptors(ErrorHandlerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  checarCategoria(@Query('categoria') categoria: string, @Req() req) {
    return this.jogadorService.checarCategoria(categoria, req.user);
  }

  @Post('inscrever-categoria')
  @UseInterceptors(ErrorHandlerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  inscreverCategoria(
    @Body() inscreverCategoriaDto: inscreverCategoriaDto,
    @Req() req,
  ) {
    return this.jogadorService.inscreverCategoria(
      inscreverCategoriaDto.categoria,
      req.user,
    );
  }

  @Get('meus-times')
  @UseInterceptors(ErrorHandlerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  meusTimes(@Req() req) {
    return this.jogadorService.meusTimes(req.user);
  }

  @Get('meu-time')
  @UseInterceptors(ErrorHandlerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  meuTime(@Query('categoria') categoria: string, @Req() req) {
    return this.jogadorService.meuTime(categoria, req.user);
  }

  @Get('meu-time-valores')
  @UseInterceptors(ErrorHandlerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  meuTimeValores(@Query('categoria') categoria: string, @Req() req) {
    return this.jogadorService.meuTimeValores(categoria, req.user);
  }

  @Get('meus-times-valores')
  @UseInterceptors(ErrorHandlerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  meusTimesValores(@Query('categorias') categorias: string[], @Req() req) {
    const arrayCategorias = typeof categorias === "string" ? [categorias] : categorias 
    return this.jogadorService.meusTimesValores(arrayCategorias, req.user);
  }

  @Post('escolher-meu-time')
  @UseInterceptors(ErrorHandlerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  escolherMeuTime(@Body() escolherTimeDto: EscolherTimeDto, @Req() req) {
    return this.jogadorService.escolherTime(
      escolherTimeDto.categoria,
      escolherTimeDto.idsCavalos,
      req.user,
    );
  }

  @Get('meus-scores')
  @UseInterceptors(ErrorHandlerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  meusScores(@Req() req) {
    return this.jogadorService.meusScores(req.user);
  }

  @Get('meu-score-campeonato-categorias')
  @UseInterceptors(ErrorHandlerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  meuScoreCampeonatoLista(
    @Query('idRefCampeonato') idRefCampeonato: string,
    @Req() req,
  ) {
    return this.jogadorService.meuScoreCampeonatoLista(
      idRefCampeonato,
      req.user,
    );
  }

  @Get('meu-score-campeonato')
  @UseInterceptors(ErrorHandlerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  meuScoreCampeonato(
    @Query('idRefCampeonato') idRefCampeonato: string,
    @Req() req,
  ) {
    return this.jogadorService.meuScoreCampeonato(idRefCampeonato, req.user);
  }

  @Get('meu-score-categoria')
  @UseInterceptors(ErrorHandlerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  meuScoreCategoria(
    @Query('idRefCategoria') idRefCategoria: string,
    @Req() req,
  ) {
    return this.jogadorService.meuScoreCategoria(idRefCategoria, req.user);
  }

  @Get('meu-ranking-campeonato')
  @UseInterceptors(ErrorHandlerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  meuRankingCampeonato(
    @Query('idRefCampeonato') idRefCampeonato: string,
    @Req() req,
  ) {
    return this.jogadorService.meuRankingCampeonato(idRefCampeonato, req.user);
  }

  @Get('meu-ranking-categoria')
  @UseInterceptors(ErrorHandlerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  meuRankingCategoria(
    @Query('idRefCategoria') idRefCategoria: string,
    @Req() req,
  ) {
    return this.jogadorService.meuRankingCategoria(idRefCategoria, req.user);
  }
}
