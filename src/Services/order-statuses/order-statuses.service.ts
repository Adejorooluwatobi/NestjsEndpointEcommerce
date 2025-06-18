import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from 'src/database/entities/orderStatuses.entity';
import { Order } from 'src/database/entities/orders.entity';
import { CreateOrderStatusParams, UpdateOrderStatusParams } from 'src/utils/types';

@Injectable()
export class OrderStatusesService {
    constructor(
        @InjectRepository(OrderStatus) private orderStatusRepository: Repository<OrderStatus>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
    ) {}

    findOrderStatuses() {
        return this.orderStatusRepository.find({ 
            relations: ['orders'] 
        });
    }

    findOrderStatusById(id: number) {
        return this.orderStatusRepository.findOne({ 
            where: { id },
            relations: ['orders']
        });
    }

    async createOrderStatus(orderStatusDetails: CreateOrderStatusParams) {
        const newOrderStatus = this.orderStatusRepository.create({
            ...orderStatusDetails,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        return this.orderStatusRepository.save(newOrderStatus);
    }

    async updateOrderStatus(id: number, updateOrderStatusDetails: UpdateOrderStatusParams) {
        const orderStatus = await this.orderStatusRepository.findOne({ where: { id } });
        if (!orderStatus) {
            throw new NotFoundException('Order status not found');
        }
        
        await this.orderStatusRepository.update(id, {
            ...updateOrderStatusDetails,
            updatedAt: new Date()
        });
        
        return this.findOrderStatusById(id);
    }

    async deleteOrderStatus(id: number) {
        const orderStatus = await this.orderStatusRepository.findOne({ where: { id } });
        if (!orderStatus) {
            throw new NotFoundException('Order status not found');
        }
        
        // Check if there are orders associated with this status
        const orderCount = await this.orderStatusRepository
            .createQueryBuilder('orderStatus')
            .leftJoin('orderStatus.orders', 'order')
            .where('orderStatus.id = :id', { id })
            .andWhere('order.id IS NOT NULL')
            .getCount();
        
        if (orderCount > 0) {
            throw new Error('Cannot delete order status that is used by existing orders');
        }
        
        return this.orderStatusRepository.delete(id);
    }
}