import { Test, TestingModule } from '@nestjs/testing';
import { ColeteController } from './colete.controller';
import { ColeteService } from './colete.service';

describe('ColeteController', () => {
  let controller: ColeteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColeteController],
      providers: [ColeteService],
    }).compile();

    controller = module.get<ColeteController>(ColeteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
