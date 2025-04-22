import { Test, TestingModule } from '@nestjs/testing';
import { CardItemsController } from './card-items.controller';

describe('CardItemsController', () => {
  let controller: CardItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardItemsController],
    }).compile();

    controller = module.get<CardItemsController>(CardItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
