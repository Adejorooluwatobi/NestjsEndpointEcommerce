import { Test, TestingModule } from '@nestjs/testing';
import { SlideBannerController } from './slide-banner.controller';


describe('SlideBannerController', () => {
  let controller: SlideBannerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlideBannerController],
    }).compile();

    controller = module.get<SlideBannerController>(SlideBannerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
