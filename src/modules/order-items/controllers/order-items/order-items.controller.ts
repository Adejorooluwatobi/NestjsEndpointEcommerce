import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { OrderItemsService } from '../../services/order-items/order-items.service';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { CreateOrderItemDto } from '../../dtos/CreateOrderItems.dto';
import { UpdateOrderItemDto } from '../../dtos/UpdateOrderItems.dto';
import { StaffGuard, UserGuard } from 'src/security/auth/guards';

@Controller('order-items')
export class OrderItemsController {
    constructor(private orderItemsService: OrderItemsService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Get()
    async getOrderItems() {
        return this.orderItemsService.findOrderItems();
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get(':id')
    async getOrderItemById(@Param('id', ParseUUIDPipe) id: string) {
        return this.orderItemsService.findOrderItemById(id);
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
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
            await this.orderItemsService.updateOrderItem(id, updateOrderItemDto);
            return this.orderItemsService.findOrderItemById(id)
    }

    @UseGuards(CustomerGuard)
    @Delete(':id')
    async deleteOrderItemById(
        @Param('id', ParseUUIDPipe) id: string) {
        const result = await this.orderItemsService.deleteOrderItem(id);
        if (result.affected && result.affected > 0) {
                return {success: true, message: 'OrderItems deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
    }
}