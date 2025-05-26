import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { OrderStatusesService } from '../../Services/order-statuses/order-statuses.service';
import { OrderStatus } from 'src/database/entities/orderStatuses.entity';
import { UseGuards } from '@nestjs/common';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { CreateOrderStatusDto } from '../../DTOs/OrderStatus/CreateOrderStatus.dto';
import { UpdateOrderStatusDto } from '../../DTOs/OrderStatus/UpdateOrderStatus.dto';

@Resolver(() => OrderStatus)
export class OrderStatusesResolver {
  constructor(private orderStatusesService: OrderStatusesService) {}

  @Query(() => [OrderStatus], { name: 'orderStatuses' })
  async findOrderStatuses(): Promise<OrderStatus[]> {
    return this.orderStatusesService.findOrderStatuses();
  }

  @Query(() => OrderStatus, { name: 'orderStatus' })
  async findOrderStatusById(@Args('id') id: number): Promise<OrderStatus> {
    const orderStatus = await this.orderStatusesService.findOrderStatusById(id);
    if (!orderStatus) {
      throw new Error(`OrderStatus with id ${id} not found`);
    }
    return orderStatus;
  }

  @Mutation(() => OrderStatus)
  @UseGuards(CustomerGuard)
  async createOrderStatus(
    @Args('createOrderStatusInput') createOrderStatusDto: CreateOrderStatusDto
  ): Promise<OrderStatus> {
    return this.orderStatusesService.createOrderStatus(createOrderStatusDto);
  }

  @Mutation(() => OrderStatus)
  @UseGuards(CustomerGuard)
  async updateOrderStatus(
    @Args('id') id: number, 
    @Args('updateOrderStatusInput') updateOrderStatusDto: UpdateOrderStatusDto
  ): Promise<OrderStatus> {
    const updatedOrderStatus = await this.orderStatusesService.updateOrderStatus(id, updateOrderStatusDto);
    if (!updatedOrderStatus) {
      throw new Error(`OrderStatus with id ${id} could not be updated or does not exist`);
    }
    return updatedOrderStatus;
  }

  @Mutation(() => Boolean)
  @UseGuards(CustomerGuard)
  async deleteOrderStatus(@Args('id') id: number): Promise<boolean> {
    await this.orderStatusesService.deleteOrderStatus(id);
    return true;
  }
}