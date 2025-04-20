import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { CreateCustomerAddressDto } from '../../dtos/CreateCustomerAddress.dto';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { CustomerAddressService } from '../../services/customer-address/customer-address.service';

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
}