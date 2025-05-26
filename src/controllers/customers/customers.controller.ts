import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CustomersService } from '../../Services/customers/customers.service';
import { CreateCustomerDto } from 'src/DTOs/CustomerDTO/CreateCustomer.dto';
import { UpdateCustomerDto } from 'src/DTOs/CustomerDTO/UpdateCustomer.dto';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { StaffGuard, UserGuard } from 'src/security/auth/guards';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Get()
    async getCustomers() {
        // Logic to get all customers
        // const customers = await this.customersService.findCustomer();
        // return customers; // Return the list of customers
        return this.customersService.findCustomer(); // Assuming findCustomer returns a Promise
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get(':id')
    async getCustomerById(@Param('id', ParseUUIDPipe) id: string) {
        // Logic to get a customer by ID
        // const customer = await this.customersService.findCustomerById(id);
        // return customer; // Return the customer details
        return this.customersService.findCustomerById(id);
    }

    @Post()
    createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        // Logic to create a new customer
        return this.customersService.createCustomer(createCustomerDto);
    }

    @UseGuards(CustomerGuard)
    @Put(':id')
    async updateCustomerById(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateCustomerDto: UpdateCustomerDto,) {
            await this.customersService.updateCustomer(id, updateCustomerDto);
            return this.customersService.findCustomerById(id);
    }

    
    @UseGuards(CustomerGuard)
    @Delete(':id')
    async deleteCustomerById(
        @Param('id', ParseUUIDPipe) id: string) {
        // Logic to delete an customer by ID
        const result = await this.customersService.deleteCustomer(id);
        if (result.affected && result.affected > 0) {
                return {success: true, message: 'Customer deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
    }
}