import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from 'src/database/entities/payment.entity';
import { Customer } from 'src/database/entities';
import { CreatePaymentParam, UpdatePaymentParam } from 'src/utils/types';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
  ) {}

  findPayment() {
    return this.paymentRepository.find({ relations: ['order', 'customer'] });
  }

  findpaymentByCustomerID(customerId: string) {
    return this.paymentRepository.findOne({ where: { customerId }, relations: ['order', 'customer'] });
  }


  async createPayment(
      id: string,
      createCustomerPaymentDetails: CreatePaymentParam,
    ) {
      const customer = await this.customerRepository.findOneBy({ id });
      if (!customer) {
        throw new HttpException(
          'Customer not found, Cannot create payment',
          HttpStatus.BAD_REQUEST,
        );
      }
  
      const newPayment = this.paymentRepository.create(createCustomerPaymentDetails);
      const savedPayment = await this.paymentRepository.save(newPayment);
      return this.customerRepository.save(savedPayment);
    }

  refundPayment(customerId: string, updateCustomerPaymentDetails: UpdatePaymentParam) {
    return this.paymentRepository.update(customerId, updateCustomerPaymentDetails);
  }

  deletePayment(customerId: string) {
    return this.paymentRepository.delete(customerId);
  }
}