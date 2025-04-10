import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { OrderItemsService } from '../../services/order-items/order-items.service';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { CreateOrderItemDto } from '../../dtos/CreateOrderItems.dto';
import { UpdateOrderItemDto } from '../../dtos/UpdateOrderItems.dto';

@Controller('order-items')
export class OrderItemsController {
    constructor(private orderItemsService: OrderItemsService) {}

    @UseGuards(CustomerGuard)
    @Get()
    async getOrderItems() {
        return this.orderItemsService.findOrderItems();
    }

    @UseGuards(CustomerGuard)
    @Get(':id')
    async getOrderItemById(@Param('id', ParseUUIDPipe) id: string) {
        return this.orderItemsService.findOrderItemById(id);
    }

    @UseGuards(CustomerGuard)
    @Get('order/:orderId')
    async getOrderItemsByOrderId(@Param('orderId', ParseUUIDPipe) orderId: string) {
        return this.orderItemsService.findOrderItemsByOrderId(orderId);
    }

    @UseGuards(CustomerGuard)
    @Post()
    createOrderItem(@Body() createOrderItemDto: CreateOrderItemDto) {
        return this.orderItemsService.createOrderItem(createOrderItemDto);
    }

    @UseGuards(CustomerGuard)
    @Put(':id')
    async updateOrderItemById(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateOrderItemDto: UpdateOrderItemDto) {
            return this.orderItemsService.updateOrderItem(id, updateOrderItemDto);
    }

    @UseGuards(CustomerGuard)
    @Delete(':id')
    async deleteOrderItemById(
        @Param('id', ParseUUIDPipe) id: string) {
        await this.orderItemsService.deleteOrderItem(id);
    }
}