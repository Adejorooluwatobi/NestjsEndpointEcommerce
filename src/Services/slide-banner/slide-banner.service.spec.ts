import { Test, TestingModule } from '@nestjs/testing';
import { SlideBannerService } from './slide-banner.service';


describe('SlideBannerService', () => {
  let service: SlideBannerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlideBannerService],
    }).compile();

    service = module.get<SlideBannerService>(SlideBannerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
