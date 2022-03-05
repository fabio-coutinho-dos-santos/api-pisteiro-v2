import { Test, TestingModule } from '@nestjs/testing';
import { CampeonatoService } from './campeonato.service';

describe('CampeonatoService', () => {
  let service: CampeonatoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampeonatoService],
    }).compile();

    service = module.get<CampeonatoService>(CampeonatoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
