import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from 'src/database/entities/orderItems.entity';
import { CreateOrderItemParams, UpdateOrderItemParams } from 'src/utils/types';
import { OrdersService } from 'src/Services/orders/orders.service';

@Injectable()
export class OrderItemsService {
    constructor(
        @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
        private ordersService: OrdersService,
    ) {}

    findOrderItems() {
        return this.orderItemRepository.find({ 
            relations: ['order', 'product'] 
        });
    }

    findOrderItemById(id: string) {
        return this.orderItemRepository.findOne({ 
            where: { id },
            relations: ['order', 'product']
        });
    }

    async findOrderItemsByOrderId(orderId: string) {
        // Verify order exists first
        const order = await this.ordersService.findOrderById(orderId);
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        
        return this.orderItemRepository.find({
            where: { orderId: orderId },
            relations: ['product']
        });
    }

    async createOrderItem(orderItemDetails: CreateOrderItemParams) {
        // Verify order exists first
        const order = await this.ordersService.findOrderById(orderItemDetails.orderId);
        if (!order) {
            throw new NotFoundException('Order not found');
        }

        // Create and save the order item
        const newOrderItem = this.orderItemRepository.create({
            ...orderItemDetails
        });
        
        return this.orderItemRepository.save(newOrderItem);
    }

    async updateOrderItem(id: string, updateOrderItemDetails: UpdateOrderItemParams) {
        const orderItem = await this.orderItemRepository.findOne({ where: { id } });
        if (!orderItem) {
            throw new NotFoundException('Order item not found');
        }
        
        await this.orderItemRepository.update(id, {
            ...updateOrderItemDetails
        });
        
        return this.findOrderItemById(id);
    }

    async deleteOrderItem(id: string) {
        const orderItem = await this.orderItemRepository.findOne({ where: { id } });
        if (!orderItem) {
            throw new NotFoundException('Order item not found');
        }
        
        return this.orderItemRepository.delete(id);
    }
}