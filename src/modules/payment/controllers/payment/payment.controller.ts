import { Controller, Post, Body, Param, Get, ParseUUIDPipe, Put } from '@nestjs/common';
import { CreatePaymentDto } from '../../dtos/CreatePaymentDto';
import { PaymentService } from '../../services/payment/payment.service';
import { UpdatePaymentParam } from 'src/utils/types';


@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post(':customerId')
async createPayment(
  @Param('customerId', ParseUUIDPipe) customerId: string,
  @Body() createPaymentDto: CreatePaymentDto,
) {
  return this.paymentService.createPayment(customerId, createPaymentDto);
}

  @Get()
  findPayment() {
    return this.paymentService.findPayment();
  }

  @Get(':customerId')
  async getPaymentsByCustomer(@Param('customerId', ParseUUIDPipe) customerId: string) {
    return this.paymentService.findpaymentByCustomerID(customerId);
  }

  @Put(':customerId/refund')
async refundPayment(
  @Param('customerId', ParseUUIDPipe) customerId: string,
  @Body() updatePaymentDto: UpdatePaymentParam,
) {
  return this.paymentService.refundPayment(customerId, updatePaymentDto);
}

  @Put(':id/status')

  async updatePaymentStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePaymentDto: UpdatePaymentParam,
  ) {
    return this.paymentService.updatePaymentStatus(id, updatePaymentDto);
  }
  @Get(':id')
  async getPaymentById(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentService.getPaymentById(id);
  }
}