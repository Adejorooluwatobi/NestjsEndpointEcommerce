import { Test, TestingModule } from '@nestjs/testing';
import { ProductCouponController } from './product-coupon.controller';

describe('ProductCouponController', () => {
  let controller: ProductCouponController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCouponController],
    }).compile();

    controller = module.get<ProductCouponController>(ProductCouponController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
