import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { Repository } from 'typeorm';
import { Payment } from 'src/database/entities/payment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('PaymentService', () => {
  let service: PaymentService;
  let repository: Repository<Payment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService,
        {
          provide: getRepositoryToken(Payment),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    repository = module.get<Repository<Payment>>(getRepositoryToken(Payment));
  });

  it('should create a payment', async () => {
    // Mock data as if a customer is making a payment
    const customerId = 'customer-123';
    const paymentData = {
      orderId: 'order-456',
      customerId,
      paymentMethod: 'credit_card',
      transactionId: 'txn-789',
      amount: 99.99,
      status: 'pending',
      createdAt: new Date(),
      refundedAt: null,
    } as unknown as Payment;

    jest.spyOn(repository, 'save').mockResolvedValue(paymentData);

    const result = await service.createPayment(customerId, paymentData)
    expect(result).toEqual(paymentData);
  });
});
