import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from '../../services/orders/orders.service';
import { CreateOrderDto } from 'src/orders/dtos/CreateOrder.dto';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { UpdateOrderDto } from 'src/orders/dtos/UpdateOrder.dto';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @UseGuards(CustomerGuard)
    @Get()
    async getOrders() {
        return this.ordersService.findOrders();
    }

    @UseGuards(CustomerGuard)
    @Get(':id')
    async getOrderById(@Param('id', ParseUUIDPipe) id: string) {
        return this.ordersService.findOrderById(id);
    }

    @UseGuards(CustomerGuard)
    @Get('customer/:customerId')
    async getOrdersByCustomerId(@Param('customerId', ParseUUIDPipe) customerId: string) {
        return this.ordersService.findOrdersByCustomerId(customerId);
    }

    @UseGuards(CustomerGuard)
    @Post()
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.createOrder(createOrderDto);
    }

    @UseGuards(CustomerGuard)
    @Put(':id')
    async updateOrderById(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateOrderDto: UpdateOrderDto,) {
            return this.ordersService.updateOrder(id, updateOrderDto);
    }

    @UseGuards(CustomerGuard)
    @Delete(':id')
    async deleteOrderById(
        @Param('id', ParseUUIDPipe) id: string) {
        await this.ordersService.deleteOrder(id);
    }
}