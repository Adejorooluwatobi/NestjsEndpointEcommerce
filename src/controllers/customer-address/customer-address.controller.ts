import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CreateCustomerAddressDto } from '../../DTOs/CustomerAddressDTO/CreateCustomerAddress.dto';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { CustomerAddressService } from '../../Services/customer-address/customer-address.service';
import { UpdateCustomerAddressDto } from '../../DTOs/CustomerAddressDTO/UpdateCustomerAddress.dto';

@Controller('customers/:id/customerAddress')
export class CustomerAddressController {
  constructor(private readonly customerAddressService: CustomerAddressService) {}

  @UseGuards(CustomerGuard)
  @Post()
  createCustomerAddress(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createCustomerAddressDto: CreateCustomerAddressDto,
  ) {
    return this.customerAddressService.createCustomerAddress(id, createCustomerAddressDto);
  }

  @UseGuards(CustomerGuard, UserGuard, StaffGuard)
  @Get()
  getCustomerAddress(@Param('id', ParseUUIDPipe) id: string) {
    return this.customerAddressService.getCustomerAddress(id.toString());
  }

  @UseGuards(CustomerGuard)
  @Put(':id')
  async updateCustomerAddressById (
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCustomerAddressDto: UpdateCustomerAddressDto,) {
      await this.customerAddressService.updateCustomerAddress(id,  updateCustomerAddressDto);
 }
}