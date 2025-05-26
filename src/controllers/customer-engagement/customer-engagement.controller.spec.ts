import { Test, TestingModule } from '@nestjs/testing';
import { CustomerEngagementController } from './customer-engagement.controller';

describe('CustomerEngagementController', () => {
  let controller: CustomerEngagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerEngagementController],
    }).compile();

    controller = module.get<CustomerEngagementController>(CustomerEngagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
