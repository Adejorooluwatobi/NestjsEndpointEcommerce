import { Test, TestingModule } from '@nestjs/testing';
import { ProductShippingService } from './product-shipping.service';

describe('ProductShippingService', () => {
  let service: ProductShippingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductShippingService],
    }).compile();

    service = module.get<ProductShippingService>(ProductShippingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
