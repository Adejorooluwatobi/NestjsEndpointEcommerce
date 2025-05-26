import { Test, TestingModule } from '@nestjs/testing';
import { StaffAccountsService } from './staff-accounts.service';

describe('StaffAccountsService', () => {
  let service: StaffAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffAccountsService],
    }).compile();

    service = module.get<StaffAccountsService>(StaffAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
