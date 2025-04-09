import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/database/entities/orders.entity';
import { CreateOrderParams, UpdateOrderParams } from 'src/utils/types';
import { CustomersService } from 'src/customers/services/customers/customers.service';
import { OrderItem } from 'src/database/entities/orderItems.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
        private customersService: CustomersService,
    ) {}

    findOrders() {
        return this.orderRepository.find({ 
            relations: ['customer', 'orderItems', 'orderStatus', 'coupon'] 
        });
    }

    findOrderById(id: string) {
        return this.orderRepository.findOne({ 
            where: { id },
            relations: ['customer', 'orderItems', 'orderStatus', 'coupon']
        });
    }

    async findOrdersByCustomerId(customerId: string) {
        // Verify customer exists first
        const customer = await this.customersService.findCustomerById(customerId);
        if (!customer) {
            throw new NotFoundException('Customer not found');
        }
        
        return this.orderRepository.find({
            where: { customer_id: customerId },
            relations: ['orderItems', 'orderStatus', 'coupon']
        });
    }

    async createOrder(orderDetails: CreateOrderParams) {
        // Verify customer exists first
        const customer = await this.customersService.findCustomerById(orderDetails.customer_id);
        if (!customer) {
            throw new NotFoundException('Customer not found');
        }

        // Generate order number
        const orderNo = `ORD-${Date.now()}`;
        
        // Create and save the order
        const newOrder = this.orderRepository.create({
            ...orderDetails,
            order_no: orderNo,
            created_at: new Date(),
            updated_at: new Date(),
            created_by: orderDetails.customer_id, // Using customer_id as created_by
            updated_by: orderDetails.customer_id  // Using customer_id as updated_by
        });
        
        const savedOrder = await this.orderRepository.save(newOrder);
        
        // Create order items if provided
        if (orderDetails.orderItems && orderDetails.orderItems.length > 0) {
            const orderItems = orderDetails.orderItems.map(item => {
                return this.orderItemRepository.create({
                    ...item,
                    order_id: savedOrder.id
                });
            });
            await this.orderItemRepository.save(orderItems);
        }
        
        return this.findOrderById(savedOrder.id);
    }

    async updateOrder(id: string, updateOrderDetails: UpdateOrderParams) {
        const order = await this.orderRepository.findOne({ where: { id } });
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        
        await this.orderRepository.update(id, {
            ...updateOrderDetails,
            updated_at: new Date(),
            updated_by: updateOrderDetails.updated_by || order.updated_by
        });
        
        return this.findOrderById(id);
    }

    async deleteOrder(id: string) {
        const order = await this.orderRepository.findOne({ where: { id } });
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        
        // Delete associated order items first
        await this.orderItemRepository.delete({ order_id: id });
        
        // Then delete the order
        return this.orderRepository.delete(id);
    }
}