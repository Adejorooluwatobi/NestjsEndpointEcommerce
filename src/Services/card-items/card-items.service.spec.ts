import { Test, TestingModule } from '@nestjs/testing';
import { CardItemsService } from './card-items.service';

describe('CardItemsService', () => {
  let service: CardItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardItemsService],
    }).compile();

    service = module.get<CardItemsService>(CardItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});