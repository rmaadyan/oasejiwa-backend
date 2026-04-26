import { Test, TestingModule } from '@nestjs/testing';
import { TesController } from './tes.controller';

describe('TesController', () => {
  let controller: TesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TesController],
    }).compile();

    controller = module.get<TesController>(TesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
