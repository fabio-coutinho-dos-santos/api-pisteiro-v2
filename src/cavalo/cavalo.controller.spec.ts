import { Test, TestingModule } from '@nestjs/testing';
import { CavaloController } from './cavalo.controller';
import { CavaloService } from './cavalo.service';

describe('CavaloController', () => {
  let controller: CavaloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CavaloController],
      providers: [CavaloService],
    }).compile();

    controller = module.get<CavaloController>(CavaloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
