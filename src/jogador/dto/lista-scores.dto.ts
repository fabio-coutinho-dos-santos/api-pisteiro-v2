import { ScoreDto } from "./score.dto";

export class ListaScoresDto {
  id: string;
  score: number;
  categorias: ScoreDto[];
}
