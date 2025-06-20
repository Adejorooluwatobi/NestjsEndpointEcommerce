import { Test, TestingModule } from '@nestjs/testing';
import { CustomerVerificationController } from './emailVerification.controller';



describe('CustomerVerificationController', () => {
  let controller: CustomerVerificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerVerificationController],
    }).compile();

    controller = module.get<CustomerVerificationController>(CustomerVerificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
