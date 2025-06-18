import { Test, TestingModule } from '@nestjs/testing';
import { ProductShippingController } from './product-shipping.controller';


describe('ProductShippingController', () => {
  let controller: ProductShippingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductShippingController],
    }).compile();

    controller = module.get<ProductShippingController>(ProductShippingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
