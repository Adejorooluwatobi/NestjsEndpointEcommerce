import { Test, TestingModule } from '@nestjs/testing';
import { VariantAttributeValueService } from './variant-attribute-value.service';

describe('VariantAttributeValueService', () => {
  let service: VariantAttributeValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariantAttributeValueService],
    }).compile();

    service = module.get<VariantAttributeValueService>(VariantAttributeValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
