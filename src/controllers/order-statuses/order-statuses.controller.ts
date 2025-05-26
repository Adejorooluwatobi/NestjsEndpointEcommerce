import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { OrderStatusesService } from '../../Services/order-statuses/order-statuses.service';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { CreateOrderStatusDto } from '../../DTOs/OrderStatus/CreateOrderStatus.dto';
import { UpdateOrderStatusDto } from '../../DTOs/OrderStatus/UpdateOrderStatus.dto';
import { StaffGuard, UserGuard } from 'src/security/auth/guards';

@Controller('order-statuses')
export class OrderStatusesController {
    constructor(private orderStatusesService: OrderStatusesService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Get()
    async getOrderStatuses() {
        return this.orderStatusesService.findOrderStatuses();
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get(':id')
    async getOrderStatusById(@Param('id', ParseIntPipe) id: number) {
        return this.orderStatusesService.findOrderStatusById(id);
    }

    @UseGuards(CustomerGuard, UserGuard)
    @Post()
    createOrderStatus(@Body() createOrderStatusDto: CreateOrderStatusDto) {
        return this.orderStatusesService.createOrderStatus(createOrderStatusDto);
    }

    @UseGuards(CustomerGuard)
    @Put(':id')
    async updateOrderStatusById(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
            await this.orderStatusesService.updateOrderStatus(id, updateOrderStatusDto);
            return this.orderStatusesService.findOrderStatusById(id);
    }

    @UseGuards(CustomerGuard)
    @Delete(':id')
    async deleteOrderStatusById(
        @Param('id', ParseIntPipe) id: number) {
        const result = await this.orderStatusesService.deleteOrderStatus(id);
        if (result.affected && result.affected > 0) {
                return {success: true, message: 'Order Status deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
    }
}