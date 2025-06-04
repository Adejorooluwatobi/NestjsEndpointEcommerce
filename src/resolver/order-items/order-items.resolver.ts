import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { OrderItemsService } from '../../Services/order-items/order-items.service';
import { OrderItem } from 'src/database/entities/orderItems.entity';
import { UseGuards } from '@nestjs/common';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { CreateOrderItemDto } from '../../DTOs/OrderItemDTO/CreateOrderItems.dto';
import { UpdateOrderItemDto } from '../../DTOs/OrderItemDTO/UpdateOrderItems.dto';

@Resolver(() => OrderItem)
export class OrderItemsResolver {
  constructor(private orderItemsService: OrderItemsService) {}

  @Query(() => [OrderItem], { name: 'orderItems' })
  @UseGuards(CustomerGuard)
  async findOrderItems(): Promise<OrderItem[]> {
    return this.orderItemsService.findOrderItems();
  }

  @Query(() => OrderItem, { name: 'orderItem' })
  @UseGuards(CustomerGuard)
  async findOrderItemById(@Args('id') id: string): Promise<OrderItem> {
    const orderItem = await this.orderItemsService.findOrderItemById(id);
    if (!orderItem) {
      throw new Error(`OrderItem with id ${id} not found`);
    }
    return orderItem;
  }

  @Query(() => [OrderItem], { name: 'orderItemsByOrderId' })
  @UseGuards(CustomerGuard)
  async findOrderItemsByOrderId(@Args('orderId') orderId: string): Promise<OrderItem[]> {
    return this.orderItemsService.findOrderItemsByOrderId(orderId);
  }

  @Mutation(() => OrderItem)
  @UseGuards(CustomerGuard)
  async createOrderItem(
    @Args('orderId') orderId: string,
    @Args('createOrderItemInput') createOrderItemDto: CreateOrderItemDto
  ): Promise<OrderItem[]> {
    const { productId, price, quantity, ...rest } = createOrderItemDto;
    return await this.orderItemsService.createOrderItem({
      ...rest,
      orderId,
      productId: productId,
      price: price,
      quantity: quantity,
    });
  }

  @Mutation(() => OrderItem)
  @UseGuards(CustomerGuard)
  async updateOrderItem(
    @Args('id') id: string, 
    @Args('updateOrderItemInput') updateOrderItemDto: UpdateOrderItemDto
  ): Promise<OrderItem> {
    const { productId, ...rest } = updateOrderItemDto as any;
    const updatedOrderItem = await this.orderItemsService.updateOrderItem(
      id,
      {
        ...rest,
        productId: Array.isArray(productId) ? productId : [productId],
      }
    );
    if (!updatedOrderItem) {
      throw new Error(`OrderItem with id ${id} could not be updated or does not exist`);
    }
    return updatedOrderItem;
  }

  @Mutation(() => Boolean)
  @UseGuards(CustomerGuard)
  async deleteOrderItem(@Args('id') id: string): Promise<boolean> {
    await this.orderItemsService.deleteOrderItem(id);
    return true;
  }
}