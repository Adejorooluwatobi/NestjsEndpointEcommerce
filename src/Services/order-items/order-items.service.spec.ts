import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemsService } from './order-items.service';

describe('OrderItemsService', () => {
  let service: OrderItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderItemsService],
    }).compile();

    service = module.get<OrderItemsService>(OrderItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
describe('createOrderItem', () => {
    let service: OrderItemsService;
    let orderItemRepository: any;
    let ordersService: any;

    beforeEach(async () => {
        orderItemRepository = {
            create: jest.fn(),
            save: jest.fn(),
        };
        ordersService = {
            findOrderById: jest.fn(),
        };

        service = new OrderItemsService(
            orderItemRepository as any,
            {} as any,
            ordersService as any,
        );
    });

    it('should throw NotFoundException if order does not exist', async () => {
        ordersService.findOrderById.mockResolvedValue(null);
        const params = { orderId: 'order1', productId: ['p1'], price: [10], quantity: [2] };
        await expect(service.createOrderItem(params as any)).rejects.toThrow('Order not found');
        expect(ordersService.findOrderById).toHaveBeenCalledWith('order1');
    });

    it('should create and save a new order item if order exists', async () => {
        const order = { id: 'order1' };
        ordersService.findOrderById.mockResolvedValue(order);
        const params = { orderId: 'order1', productId: ['p1'], price: [10], quantity: [2] };
        const createdOrderItem = { ...params };
        const savedOrderItem = { id: 'oi1', ...params };

        orderItemRepository.create.mockReturnValue(createdOrderItem);
        orderItemRepository.save.mockResolvedValue(savedOrderItem);

        const result = await service.createOrderItem(params as any);

        expect(ordersService.findOrderById).toHaveBeenCalledWith('order1');
        expect(orderItemRepository.create).toHaveBeenCalledWith(params);
        expect(orderItemRepository.save).toHaveBeenCalledWith(createdOrderItem);
        expect(result).toEqual(savedOrderItem);
    });
});
