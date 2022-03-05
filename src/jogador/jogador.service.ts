import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { CognitoJWTDto } from 'src/auth/dto/cognito-jwt.dto';
import { ListaScoresDto } from './dto/lista-scores.dto';
import { ScoreDto } from './dto/score.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Balance, BalanceDocument } from 'src/balance/entities/balance.entity';
import {
  Categoria,
  CategoriaDocument,
} from 'src/categoria/entities/categoria.entity';
import { Cavalo, CavaloDocument } from 'src/cavalo/entities/cavalo.entity';
import { Colete, ColeteDocument } from 'src/colete/entities/colete.entity';
import { ScoreScope } from 'src/score/entities/score-scope.entity';
import { Score, ScoreDocument } from 'src/score/entities/score.entity';
import { Time, TimeDocument } from 'src/time/entities/time.entity';
import { User, UserDocument } from 'src/user/entities/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class JogadorService {
  constructor(
    @InjectModel(Categoria.name)
    private categoriaModel: Model<CategoriaDocument>,
    @InjectModel(Colete.name) private coleteModel: Model<ColeteDocument>,
    @InjectModel(Cavalo.name) private cavaloModel: Model<CavaloDocument>,
    @InjectModel(Time.name) private timeModel: Model<TimeDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Score.name) private scoreModel: Model<ScoreDocument>,
    @InjectModel(Balance.name) private balanceModel: Model<BalanceDocument>,
  ) {}

  findUserByAuthId(idRefAuth: string) {
    return this.userModel.findOne({ idRefAuth: idRefAuth }).exec();
  }

  meuCadastro(user: any) {
    return user.dbUser;
  }

  registro(createUserDto: CreateUserDto, user: CognitoJWTDto) {
    const timestamp = Date.now().toFixed(0);
    const hash = createUserDto.cpf
      ? crypto
          .createHash('sha256')
          .update(createUserDto.cpf.toFixed(0).concat(timestamp))
          .digest('hex')
      : null;
    const created = new this.userModel({
      idRefAuth: user.cognitoUsername,
      nome: createUserDto.nome,
      sobrenome: createUserDto.sobrenome,
      timestampRegistro: timestamp,
      hashCPF: hash,
      apelido: createUserDto.apelido,
      avatar: createUserDto.avatar,
    });
    return created.save();
  }

  update(userData: UpdateUserDto, user: CognitoJWTDto) {
    const userId = this.checkUser(user.dbUser);
    return this.userModel.updateOne({ _id: userId }, userData).exec();
  }

  meusTimes(user: CognitoJWTDto) {
    const userId = this.checkUser(user.dbUser);
    return this.timeModel
      .find({
        idRefUser: userId,
      })
      .exec();
  }

  meuTime(categoria: string, user: CognitoJWTDto) {
    const userId = this.checkUser(user.dbUser);
    return this.timeModel
      .findOne({
        idRefUser: userId,
        idRefCategoria: categoria,
      })
      .exec();
  }

  async meuTimeValores(idCategoria: string, user: CognitoJWTDto) {
    const userId = this.checkUser(user.dbUser);
    let timeCavalos = [];
    let valor = 0;
    let cavalosSelecionados = 0;
    let numeroCavalos = 0;
    let saldoLivre = 0;
    let saldoTotal = 0;
    let saldoBonus = 0;
    const [time, categoria] = await Promise.all([
      this.timeModel
        .findOne({
          idRefUser: userId,
          idRefCategoria: idCategoria,
        })
        .exec(),
      this.categoriaModel.findById(idCategoria).exec(),
    ]);
    if (time && time.cavalos && time.cavalos.length > 0) {
      const cavalos = time.cavalos;
      const { result, valorTime } = await this.detalhesCavalos(
        cavalos,
        idCategoria,
        categoria,
      );
      timeCavalos = result;
      valor = valorTime;
      cavalosSelecionados = cavalos.length;
    }
    if (categoria) {
      numeroCavalos = categoria.numeroCavalos;
    }
    const userBalance = await this.balanceModel
      .findOne({ idRefUser: userId, idRefCategoria: idCategoria })
      .exec();
    if (userBalance) {
      saldoLivre = userBalance.balance - valor;
      saldoTotal = userBalance.balance;
      saldoBonus = userBalance.balance - categoria.saldoInicial;
    }
    return {
      id: idCategoria,
      time: timeCavalos,
      valor: valor,
      cavalosSelecionados: cavalosSelecionados,
      numeroCavalos: numeroCavalos,
      saldoLivre: saldoLivre,
      saldoTotal: saldoTotal,
      saldoBonus: saldoBonus,
    };
  }

  async meusTimesValores(idsCategorias: string[], user: CognitoJWTDto) {
    const promises = [];
    idsCategorias.forEach((idCategoria) => {
      promises.push(this.meuTimeValores(idCategoria, user));
    });
    return Promise.all(promises);
  }

  async meusScores(user: CognitoJWTDto) {
    const userId = this.checkUser(user.dbUser);
    const [listaCampeonato, listaCategoria] = await Promise.all([
      this.scoreModel
        .find({
          idRefUser: userId,
          scope: ScoreScope.campeonato,
        })
        .exec(),
      this.scoreModel
        .find({
          idRefUser: userId,
          scope: ScoreScope.categoria,
        })
        .exec(),
    ]);
    const lista: ListaScoresDto[] = [];
    for (let index = 0; index < listaCampeonato.length; index++) {
      const campeonatoScore = listaCampeonato[index];
      const categoriaScores: ScoreDto[] = await this.calcScore(
        campeonatoScore,
        listaCategoria,
      );
      lista.push({
        id: campeonatoScore?.idRefScore,
        score: campeonatoScore?.score,
        categorias: categoriaScores,
      });
    }
    return lista;
  }

  async meuScoreCampeonatoLista(idRefCampeonato: string, user: CognitoJWTDto) {
    const userId = this.checkUser(user.dbUser);
    const [campeonatoScore, listaCategoria] = await Promise.all([
      this.scoreModel
        .findOne({
          idRefUser: userId,
          idRefScore: idRefCampeonato,
          scope: ScoreScope.campeonato,
        })
        .exec(),
      this.scoreModel
        .find({
          idRefUser: userId,
          scope: ScoreScope.categoria,
        })
        .exec(),
    ]);
    const categoriaScores: ScoreDto[] = await this.calcScore(
      campeonatoScore,
      listaCategoria,
    );
    const result: ListaScoresDto = new ListaScoresDto();
    [result.id, result.score, result.categorias] = [
      campeonatoScore?.idRefScore,
      campeonatoScore?.score,
      categoriaScores,
    ];
    return result;
  }

  meuScoreCampeonato(idRefCampeonato: string, user: CognitoJWTDto) {
    const userId = this.checkUser(user.dbUser);
    return this.scoreModel
      .findOne({
        idRefUser: userId,
        idRefScore: idRefCampeonato,
        scope: ScoreScope.campeonato,
      })
      .exec();
  }

  meuScoreCategoria(idRefCategoria: string, user: CognitoJWTDto) {
    const userId = this.checkUser(user.dbUser);
    return this.scoreModel
      .findOne({
        idRefUser: userId,
        idRefScore: idRefCategoria,
        scope: ScoreScope.categoria,
      })
      .exec();
  }

  async meuRankingCampeonato(idRefCampeonato: string, user: CognitoJWTDto) {
    const userId = this.checkUser(user.dbUser);
    const allScores = await this.scoreModel
      .find({
        idRefScore: idRefCampeonato,
        scope: ScoreScope.campeonato,
      })
      .sort({ score: -1, timestampRef: 1 })
      .exec();
    return allScores.findIndex((score) => score.idRefUser == userId);
  }

  async meuRankingCategoria(idRefCategoria: string, user: CognitoJWTDto) {
    const userId = this.checkUser(user.dbUser);
    const allScores = await this.scoreModel
      .find({
        idRefScore: idRefCategoria,
        scope: ScoreScope.categoria,
      })
      .sort({ score: -1, timestampRef: 1 })
      .exec();
    return allScores.findIndex((score) => score.idRefUser == userId);
  }

  async meusCampeonatos(user: CognitoJWTDto) {
    const userId = this.checkUser(user.dbUser);
    const categorias = await this.balanceModel
      .find({ idRefUser: userId, balance: { $gt: 0 } }, { idRefCategoria: 1 })
      .exec();
    const idsCampeonatos = categorias.map((cat) => cat.idRefCategoria);
    return [...new Set(idsCampeonatos)];
  }

  minhasCategorias(user: CognitoJWTDto) {
    const userId = this.checkUser(user.dbUser);
    return this.balanceModel
      .find({ idRefUser: userId, balance: { $gt: 0 } }, { idRefCategoria: 1 })
      .exec();
  }

  async checarCategoria(idCategoria: string, user: CognitoJWTDto) {
    const userId = this.checkUser(user.dbUser);
    const balance = await this.balanceModel
      .findOne({
        idRefCategoria: idCategoria,
        idRefUser: userId,
      })
      .exec();
    return balance?.balance > 0;
  }

  async inscreverCategoria(idCategoria: string, user: CognitoJWTDto) {
    const userId = this.checkUser(user.dbUser);
    await this.checkInscrever(userId, idCategoria);
    const categoria = await this.checkCategoria(idCategoria);
    this.checkCategoriaStatus(categoria);
    const [updateBalance, updateScoreCategoria, updateScoreCampeonato] =
      await Promise.all([
        this.balanceModel
          .updateOne(
            { idRefUser: userId, idRefCategoria: idCategoria },
            { balance: categoria.saldoInicial },
            { upsert: true },
          )
          .exec(),
        this.scoreModel
          .updateOne(
            {
              idRefUser: userId,
              idRefScore: idCategoria,
              scope: ScoreScope.categoria,
            },
            { score: 0 },
            { upsert: true },
          )
          .exec(),
        this.scoreModel
          .updateOne(
            {
              idRefUser: userId,
              idRefScore: categoria.idRefCampeonato,
              scope: ScoreScope.campeonato,
            },
            { score: 0 },
            { upsert: true },
          )
          .exec(),
      ]);
    return {
      updateBalance: updateBalance,
      updateScoreCategoria: updateScoreCategoria,
      updateScoreCampeonato: updateScoreCampeonato,
    };
  }

  async escolherTime(
    idCategoria: string,
    idsCavalos: string[],
    user: CognitoJWTDto,
  ) {
    const userId = this.checkUser(user.dbUser);
    const categoria = await this.checkCategoria(idCategoria);
    this.checkCategoriaStatus(categoria);
    const userBalance = await this.checkInscrito(userId, idCategoria);
    this.checkRepetidos(idsCavalos);
    this.checkNumeroCavalos(categoria, idsCavalos);
    const cavalos = await this.checkCavalos(idsCavalos);
    await this.checkBalance(cavalos, categoria, userBalance.balance);
    return this.timeModel
      .updateOne(
        { idRefUser: userId, idRefCategoria: idCategoria },
        { cavalos: idsCavalos },
        { upsert: true },
      )
      .exec();
  }

  private checkCategoriaStatus(categoria: CategoriaDocument) {
    if (categoria.fechado)
      throw new HttpException(
        `Categoria de id ${categoria._id} já foi fechada`,
        400,
      );
  }

  private async calcScore(
    campeonatoScore: ScoreDocument,
    listaCategoria: ScoreDocument[],
  ) {
    const categoriasCampeonato = await this.categoriaModel
      .find({ idRefCampeonato: campeonatoScore.idRefScore })
      .select({ _id: 1 })
      .exec();
    const categoriaScores: ScoreDto[] = [];
    categoriasCampeonato.forEach((categoriaCampeonato) => {
      const categoriaScore = listaCategoria.find(
        (categoria) => categoria.idRefScore == categoriaCampeonato._id,
      );
      categoriaScores.push({
        id: categoriaCampeonato._id,
        score: categoriaScore ? categoriaScore.score : 0,
      });
    });
    return categoriaScores;
  }

  private async detalhesCavalos(
    cavalos: string[],
    idCategoria: string,
    categoria: CategoriaDocument,
  ) {
    const result = [];
    let valorTime = 0;
    for (let index = 0; index < cavalos.length; index++) {
      const idCavalo = cavalos[index];
      if (idCavalo.length == 0) continue;
      const [cavalo, colete] = await Promise.all([
        this.cavaloModel.findById(idCavalo).exec(),
        this.coleteModel
          .findOne({
            idRefCavalo: idCavalo,
            idRefCategoria: idCategoria,
          })
          .exec(),
      ]);
      const valor = this.valorCavalo(categoria, cavalo);
      valorTime += valor;
      result.push({
        index: index,
        cavalo: cavalo,
        colete: colete,
        valor: valor,
      });
    }
    return { result, valorTime };
  }

  private async checkInscrever(userId: string, idCategoria: string) {
    const userBalance = await this.balanceModel
      .findOne({ idRefUser: userId, idRefCategoria: idCategoria })
      .exec();
    if (userBalance && userBalance.balance > 0)
      throw new HttpException(
        `O jogador já está inscrito na categoria de ID ${idCategoria}`,
        400,
      );
    return userBalance;
  }

  private async checkInscrito(userId: string, idCategoria: string) {
    const userBalance = await this.balanceModel
      .findOne({ idRefUser: userId, idRefCategoria: idCategoria })
      .exec();
    if (!userBalance || userBalance.balance == 0)
      throw new HttpException(
        `O jogador não está inscrito na categoria de ID ${idCategoria}`,
        400,
      );
    return userBalance;
  }

  private async checkBalance(
    cavalos: CavaloDocument[],
    categoria: CategoriaDocument,
    userBalance: number,
  ) {
    let valorTime = 0;
    for (let index = 0; index < cavalos.length; index++) {
      valorTime += this.valorCavalo(categoria, cavalos[index]);
    }
    if (userBalance < valorTime)
      throw new HttpException('Saldo insuficiente', 400);
  }

  private async checkCategoria(idCategoria: string) {
    const categoria = await this.categoriaModel.findById(idCategoria).exec();
    if (!categoria)
      throw new HttpException(
        `A categoria de ID ${idCategoria} não foi encontrada`,
        400,
      );
    return categoria;
  }

  private checkRepetidos(idsCavalos: string[]) {
    const repetidos = idsCavalos.filter(
      (item, index) => item.length > 0 && idsCavalos.indexOf(item) !== index,
    );
    if (repetidos.length > 0)
      throw new HttpException(
        'Total de ' +
          repetidos.length +
          ' cavalo' +
          (repetidos.length > 1 ? 's' : '') +
          ' repetido' +
          (repetidos.length > 1 ? 's' : ''),
        400,
      );
  }

  private checkNumeroCavalos(
    categoria: CategoriaDocument,
    idsCavalos: string[],
  ) {
    if (categoria.numeroCavalos < idsCavalos.length)
      throw new HttpException(
        `Foram escolhidos ${
          idsCavalos.length - categoria.numeroCavalos
        } cavalos a mais`,
        400,
      );
  }

  private async checkCavalos(idsCavalos: string[]) {
    const cavalos: CavaloDocument[] = [];
    for (let index = 0; index < idsCavalos.length; index++) {
      if (idsCavalos[index].length == 0) continue;
      const cavalo = await this.cavaloModel.findById(idsCavalos[index]).exec();
      if (!cavalo)
        throw new HttpException(
          `O cavalo de ID ${idsCavalos[index]} não foi encontrado`,
          400,
        );
      cavalos.push(cavalo);
    }
    return cavalos;
  }

  private valorCavalo(categoria: CategoriaDocument, cavalo: CavaloDocument) {
    return (
      categoria.valorBase +
      categoria.valorMod1 * cavalo.titulos +
      categoria.valorMod2 * cavalo.premios
    );
  }

  private checkUser(dbUser: UserDocument): string {
    if (!dbUser) throw new HttpException('Jogador não encontrado', 400);
    return dbUser._id;
  }
}
