import { Test, TestingModule } from '@nestjs/testing';
import { CavaloService } from './cavalo.service';

describe('CavaloService', () => {
  let service: CavaloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CavaloService],
    }).compile();

    service = module.get<CavaloService>(CavaloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
