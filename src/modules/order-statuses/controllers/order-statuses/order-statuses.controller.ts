import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { OrderStatusesService } from '../../services/order-statuses/order-statuses.service';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { CreateOrderStatusDto } from '../../dtos/CreateOrderStatus.dto';
import { UpdateOrderStatusDto } from '../../dtos/UpdateOrderStatus.dto';
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

    @UseGuards(CustomerGuard)
    @Post()
    createOrderStatus(@Body() createOrderStatusDto: CreateOrderStatusDto) {
        return this.orderStatusesService.createOrderStatus(createOrderStatusDto);
    }

    @UseGuards(CustomerGuard)
    @Put(':id')
    async updateOrderStatusById(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
            return this.orderStatusesService.updateOrderStatus(id, updateOrderStatusDto);
    }

    @UseGuards(CustomerGuard)
    @Delete(':id')
    async deleteOrderStatusById(
        @Param('id', ParseIntPipe) id: number) {
        await this.orderStatusesService.deleteOrderStatus(id);
    }
}