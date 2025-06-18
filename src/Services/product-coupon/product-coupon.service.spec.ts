import { Test, TestingModule } from '@nestjs/testing';
import { ProductCouponService } from './product-coupon.service';


describe('ProductCouponService', () => {
  let service: ProductCouponService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCouponService],
    }).compile();

    service = module.get<ProductCouponService>(ProductCouponService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
