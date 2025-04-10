import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { OrdersService } from './services/orders/orders.service';
import { Order } from 'src/database/entities/orders.entity';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { UseGuards } from '@nestjs/common';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { UpdateOrderDto } from './dtos/UpdateOrder.dto';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private ordersService: OrdersService) {}

  @Query(() => [Order], { name: 'orders' })
  @UseGuards(CustomerGuard)
  async findOrders(): Promise<Order[]> {
    return this.ordersService.findOrders();
  }

  @Query(() => Order, { name: 'order' })
  @UseGuards(CustomerGuard)
  async findOrderById(@Args('id') id: string): Promise<Order> {
    const order = await this.ordersService.findOrderById(id);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  @Query(() => [Order], { name: 'customerOrders' })
  @UseGuards(CustomerGuard)
  async findOrdersByCustomerId(@Args('customerId') customerId: string): Promise<Order[]> {
    return this.ordersService.findOrdersByCustomerId(customerId);
  }

  @Mutation(() => Order)
  @UseGuards(CustomerGuard)
  async createOrder(@Args('createOrderInput') createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.ordersService.createOrder(createOrderDto);
    if (!order) {
      throw new Error('Order creation failed');
    }
    return order;
  }

  @Mutation(() => Order)
  @UseGuards(CustomerGuard)
  async updateOrder(
    @Args('id') id: string, 
    @Args('updateOrderInput') updateOrderDto: UpdateOrderDto
  ): Promise<Order> {
    const updatedOrder = await this.ordersService.updateOrder(id, updateOrderDto);
    if (!updatedOrder) {
      throw new Error('Order update failed');
    }
    return updatedOrder;
  }

  @Mutation(() => Boolean)
  @UseGuards(CustomerGuard)
  async deleteOrder(@Args('id') id: string): Promise<boolean> {
    await this.ordersService.deleteOrder(id);
    return true;
  }
}