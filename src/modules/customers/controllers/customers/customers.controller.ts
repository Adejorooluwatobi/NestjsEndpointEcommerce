import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CustomersService } from '../../services/customers/customers.service';
import { CreateCustomerDto } from 'src/modules/customers/dtos/CreateCustomer.dto';
import { UpdateCustomerDto } from 'src/modules/customers/dtos/UpdateCustomer.dto';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) {}

    @UseGuards(CustomerGuard)
    @Get()
    async getCustomers() {
        // Logic to get all customers
        // const customers = await this.customersService.findCustomer();
        // return customers; // Return the list of customers
        return this.customersService.findCustomer(); // Assuming findCustomer returns a Promise
    }

    @UseGuards(CustomerGuard)
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
    }

    
    @UseGuards(CustomerGuard)
    @Delete(':id')
    async deleteCustomerById(
        @Param('id', ParseUUIDPipe) id: string) {
        // Logic to delete an customer by ID
        await this.customersService.deleteCustomer(id);
    }
}