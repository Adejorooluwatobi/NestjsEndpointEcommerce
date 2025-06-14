import { Controller, Post, Body, Param, Get, ParseUUIDPipe, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { CreatePaymentDto } from '../../DTOs/PaymentDTO/CreatePayment.dto';
import { PaymentService } from '../../Services/payment/payment.service';
import { UpdatePaymentParam } from 'src/utils/types';
import { ApiResponseDto, ErrorResponseDto, PaymentResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { CustomerGuard, StaffGuard, UniversalGuard, UserGuard } from 'src/security/auth/guards';

@ApiExtraModels(PaymentResponseDto)
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(CustomerGuard)
  @Post(':customerId')
  @ApiOperation({ summary: 'Create a Payment with  customer ID' })
      @ApiCreatedResponse({
          description: 'Payment created successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: { $ref: getSchemaPath(PaymentResponseDto) }
                      }
                  }
              ]
          }
      })
      @ApiBadRequestResponse({
              description: 'Invalid input data',
              type: ErrorResponseDto
          })
async createPayment(
  // @Param('customerId', ParseUUIDPipe) customerId: string,
  @Body() createPaymentDto: CreatePaymentDto, @Req() req
) {
  const customerId = req.customer.sub;
  const payment = await this.paymentService.createPayment(customerId, createPaymentDto);
  return {
    succeeded: true,
    message: 'Payment created successfully',
    statusCode: 201,
    resultData: payment,
  }
}

@UseGuards(UniversalGuard)
@ApiBearerAuth()
    @ApiOperation({ summary: 'Get all Payment' })
    @ApiOkResponse({
        description: 'Payment retrieved successfully',
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: {
                            type: 'array',
                            items: { $ref: getSchemaPath(PaymentResponseDto) }
                        }
                    }
                }
            ]
        }
    })
  @Get()
  async findPayment() {
    const payment = await this.paymentService.findPayment();
    return {
      succeeded: true,
      message: 'Payment retrieved successfully',
      statusCode: 200,
      resultData: payment,
    };
  }

  @UseGuards(UniversalGuard)
  @ApiBearerAuth()
      @ApiOperation({ summary: 'Get Payment by customer ID' })
      @ApiOkResponse({
          description: 'Customer Payment retrieved successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: { $ref: getSchemaPath(PaymentResponseDto) }
                      }
                  }
              ]
          }
      })
      @ApiNotFoundResponse({
          description: 'Payment not found',
          type: ErrorResponseDto
      })
  @Get(':customerId')
  async getPaymentsByCustomer(@Param('customerId', ParseUUIDPipe) customerId: string) {
    const payment = await this.paymentService.findpaymentByCustomerID(customerId);
    if (!payment) {
      throw new Error(`Payment with the customer ID ${customerId} not found`);
    }
    return {
      succeeded: true,
      message: 'Payment retrieved successfully',
      statusCode: 200,
      resultData: payment,
    };
  }

  @UseGuards(StaffGuard)
  @ApiBearerAuth()
      @ApiOperation({ summary: 'Update payment refund by customer ID' })
      @ApiOkResponse({
          description: 'Payment refund updated successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: { $ref: getSchemaPath(PaymentResponseDto) }
                      }
                  }
              ]
          }
      })
      @ApiNotFoundResponse({
          description: 'Payment not found',
          type: ErrorResponseDto
      })
      @ApiBadRequestResponse({
          description: 'Invalid input data',
          type: ErrorResponseDto
      })
  @Put(':customerId/refund')
async refundPayment(
  @Param('customerId', ParseUUIDPipe) customerId: string,
  @Body() updatePaymentDto: UpdatePaymentParam,
) {
  const payment = await this.paymentService.refundPayment(customerId, updatePaymentDto);
  if (!payment) {
    throw new Error(`Payment with customer ID ${customerId} not found`);
  }
  return {
    succeeded: true,
    message: 'Payment refund updated successfully',
    statusCode: 200,
    resultData: payment,
  };
}

@UseGuards(StaffGuard)
  @ApiBearerAuth()
      @ApiOperation({ summary: 'Update payment status by ID' })
      @ApiOkResponse({
          description: 'Payment status updated successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: { $ref: getSchemaPath(PaymentResponseDto) }
                      }
                  }
              ]
          }
      })
      @ApiNotFoundResponse({
          description: 'Payment not found',
          type: ErrorResponseDto
      })
      @ApiBadRequestResponse({
          description: 'Invalid input data',
          type: ErrorResponseDto
      })
  @Put(':id/status')
  async updatePaymentStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePaymentDto: UpdatePaymentParam,
  ) {
    const payment = await this.paymentService.updatePaymentStatus(id, updatePaymentDto);
    if (!payment) {
      throw new Error(`Payment with ID ${id} not found`);
    }
    return {
      succeeded: true,
      message: 'Payment status updated successfully',
      statusCode: 200,
      resultData: payment,
    };
  }

  @UseGuards(UniversalGuard)
  @ApiOperation({ summary: 'Get Payment by ID' })
      @ApiOkResponse({
          description: 'Customer Payment retrieved successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: { $ref: getSchemaPath(PaymentResponseDto) }
                      }
                  }
              ]
          }
      })
      @ApiNotFoundResponse({
          description: 'Payment not found',
          type: ErrorResponseDto
      })
  @Get(':id')
  async getPaymentById(@Param('id', ParseUUIDPipe) id: string) {
    const payment = await this.paymentService.getPaymentById(id);
    if (!payment) {
      throw new Error(`Payment with ID ${id} not found`);
    }
    return {
      succeeded: true,
      message: 'Payment retrieved successfully',
      statusCode: 200,
      resultData: payment,
    };
  }

  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @Delete(':customerId')
  @ApiOperation({ summary: 'Delete by ID' })
          @ApiNoContentResponse({ description: 'deleted successfully' })
          @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
  async deletePayment(@Param('customerId') customerId: string) {
    const result = await this.paymentService.deletePayment(customerId);
    if (result && result.affected && result.affected > 0) {
      return { success: true, message: 'Payment deleted successfully.' };
    } else {
      return { error: true, message: 'Payment not found.' };
    }
  }
}