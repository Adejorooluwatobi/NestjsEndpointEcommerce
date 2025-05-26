import { Test, TestingModule } from '@nestjs/testing';
import { ProductTagController } from './product-tag.controller';

describe('ProductTagController', () => {
  let controller: ProductTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductTagController],
    }).compile();

    controller = module.get<ProductTagController>(ProductTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
