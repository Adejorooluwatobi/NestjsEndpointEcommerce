import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, UseGuards, Req } from '@nestjs/common';
import { CreateCustomerAddressDto } from '../../DTOs/CustomerAddressDTO/CreateCustomerAddress.dto';
import { CustomerGuard, UniversalGuard} from 'src/security/auth/guards';
import { CustomerAddressService } from '../../Services/customer-address/customer-address.service';
import { UpdateCustomerAddressDto } from '../../DTOs/CustomerAddressDTO/UpdateCustomerAddress.dto';
import { ApiResponseDto, CustomerAddressResponseDto, ErrorResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';

@ApiExtraModels(CustomerAddressResponseDto)
@Controller('customers/:id/customerAddress')
export class CustomerAddressController {
  constructor(private readonly customerAddressService: CustomerAddressService) {}

  @UseGuards(CustomerGuard)
  @Post()
  @ApiOperation({ summary: 'Create a customer address' })
      @ApiCreatedResponse({
          description: 'Customer Address created successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: { $ref: getSchemaPath(CustomerAddressResponseDto) }
                      }
                  }
              ]
          }
      })
      @ApiBadRequestResponse({
              description: 'Invalid input data',
              type: ErrorResponseDto
          })
  async createCustomerAddress(
    // @Param('id', ParseUUIDPipe) id: string,
    @Body() createCustomerAddressDto: CreateCustomerAddressDto, @Req() req
  ) {
    const customerId = req.customer.sub;
    const cusAddress = await this.customerAddressService.createCustomerAddress(customerId, createCustomerAddressDto);
    return {
      succeeded: true,
      message: 'Customer Address created successfully',
      statusCode: 201,
      resultData: cusAddress,
    };
  }

  @UseGuards(UniversalGuard)
  @ApiBearerAuth()
      @ApiOperation({ summary: 'Get all customer Address' })
      @ApiOkResponse({
          description: 'Customer Address retrieved successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: {
                              type: 'array',
                              items: { $ref: getSchemaPath(CustomerAddressResponseDto) }
                          }
                      }
                  }
              ]
          }
      })
  @Get()
  async getCustomerAddress(@Param('id', ParseUUIDPipe) id: string) {
    const cusAddress = await this.customerAddressService.getCustomerAddress(id);
    if( !cusAddress) {
        throw new Error(`Customer Address with ID ${id} not found`);
        }
    return {
      succeeded: true,
      message: 'Customer Address retrieved successfully',
      statusCode: 200,
      resultData: cusAddress,
    };
  }


  @UseGuards(CustomerGuard)
  @ApiBearerAuth()
      @ApiOperation({ summary: 'Update customer Address by customer ID' })
      @ApiOkResponse({
          description: 'Customer Address updated successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: { $ref: getSchemaPath(CustomerAddressResponseDto) }
                      }
                  }
              ]
          }
      })
      @ApiNotFoundResponse({
          description: 'Customer not found',
          type: ErrorResponseDto
      })
      @ApiBadRequestResponse({
          description: 'Invalid input data',
          type: ErrorResponseDto
      })
  @Put(':id')
  async updateCustomerAddressById (
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCustomerAddressDto: UpdateCustomerAddressDto,) {
      const cusAddress = await this.customerAddressService.updateCustomerAddress(id,  updateCustomerAddressDto);
      return {
        succeeded: true,
        message: 'Customer Address updated successfully',
        statusCode: 200,
        resultData: cusAddress,
      };
 }
}