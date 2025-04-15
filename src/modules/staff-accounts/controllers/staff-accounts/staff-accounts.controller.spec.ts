import { Test, TestingModule } from '@nestjs/testing';
import { StaffAccountsController } from './staff-accounts.controller';

describe('StaffAccountsController', () => {
  let controller: StaffAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffAccountsController],
    }).compile();

    controller = module.get<StaffAccountsController>(StaffAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
