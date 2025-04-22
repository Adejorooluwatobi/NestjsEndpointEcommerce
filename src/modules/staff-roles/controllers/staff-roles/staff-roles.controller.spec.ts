import { Test, TestingModule } from '@nestjs/testing';
import { StaffRolesController } from './staff-roles.controller';

describe('StaffRolesController', () => {
  let controller: StaffRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffRolesController],
    }).compile();

    controller = module.get<StaffRolesController>(StaffRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
