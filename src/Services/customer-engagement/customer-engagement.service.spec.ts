import { Test, TestingModule } from '@nestjs/testing';
import { CustomerEngagementService } from './customer-engagement.service';

describe('CustomerEngagementService', () => {
  let service: CustomerEngagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerEngagementService],
    }).compile();

    service = module.get<CustomerEngagementService>(CustomerEngagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
