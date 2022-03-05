import { Test, TestingModule } from '@nestjs/testing';
import { ColeteService } from './colete.service';

describe('ColeteService', () => {
  let service: ColeteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColeteService],
    }).compile();

    service = module.get<ColeteService>(ColeteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
