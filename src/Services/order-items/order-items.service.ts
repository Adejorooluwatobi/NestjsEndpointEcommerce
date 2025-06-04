import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from 'src/database/entities/orderItems.entity';
import { CreateOrderItemParams, UpdateOrderItemParams } from 'src/utils/types';
import { OrdersService } from 'src/Services/orders/orders.service';
import { Order } from 'src/database/entities/orders.entity';

@Injectable()
export class OrderItemsService {
    constructor(
        @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
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
        where: { order: { id: orderId } }, // Fix: use relation
        relations: ['product']
    });
    }

    async createOrderItem(orderItemDetails: CreateOrderItemParams & { orderId: string }) {
        // Verify order exists first
        const order = await this.ordersService.findOrderById(orderItemDetails.orderId);
        if (!order) {
            throw new NotFoundException('Order not found');
        }

        // Create and save the order item
       const itemsToCreate = orderItemDetails.productId.map((productId, idx) => ({
        productId,
        price: orderItemDetails.price[idx],
        quantity: orderItemDetails.quantity[idx],
        order: order,
    }));

    const newOrderItems = this.orderItemRepository.create(itemsToCreate);
    return this.orderItemRepository.save(newOrderItems);
}

    async updateOrderItem(id: string, updateOrderItemDetails: UpdateOrderItemParams) {
        const orderItem = await this.orderItemRepository.findOne({ where: { id } });
        if (!orderItem) {
            throw new NotFoundException('Order item not found');
        }
        
        // Only update with single values, not arrays
        const { productId, price, quantity } = updateOrderItemDetails;
        await this.orderItemRepository.update(id, {
            ...(productId && { productId: Array.isArray(productId) ? productId[0] : productId }),
            ...(price && { price: Array.isArray(price) ? price[0] : price }),
            ...(quantity && { quantity: Array.isArray(quantity) ? quantity[0] : quantity }),
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