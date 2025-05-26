import { Test, TestingModule } from '@nestjs/testing';
import { VariantAttributeValueController } from './variant-attribute-value.controller';

describe('VariantAttributeValueController', () => {
  let controller: VariantAttributeValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariantAttributeValueController],
    }).compile();

    controller = module.get<VariantAttributeValueController>(VariantAttributeValueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
