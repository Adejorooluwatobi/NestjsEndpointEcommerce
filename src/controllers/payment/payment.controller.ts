import { Controller, Post, Body, Param, Get, ParseUUIDPipe, Put, Delete } from '@nestjs/common';
import { CreatePaymentDto } from '../../DTOs/PaymentDTO/CreatePayment.dto';
import { PaymentService } from '../../Services/payment/payment.service';
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
  await this.paymentService.refundPayment(customerId, updatePaymentDto);
  return this.paymentService.findpaymentByCustomerID(customerId);
}

  @Put(':id/status')

  async updatePaymentStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePaymentDto: UpdatePaymentParam,
  ) {
    await this.paymentService.updatePaymentStatus(id, updatePaymentDto);
    return this.paymentService.getPaymentById(id);
  }

  @Get(':id')
  async getPaymentById(@Param('id', ParseUUIDPipe) id: string) {
    await this.paymentService.getPaymentById(id);
    return this.paymentService.getPaymentById(id);
  }

  @Delete(':customerId')
  async deletePayment(@Param('customerId') customerId: string) {
    const result = await this.paymentService.deletePayment(customerId);
    if (result && result.affected && result.affected > 0) {
      return { success: true, message: 'Payment deleted successfully.' };
    } else {
      return { error: true, message: 'Payment not found.' };
    }
  }
}