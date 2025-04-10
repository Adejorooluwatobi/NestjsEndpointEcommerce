// src/orders/dtos/UpdateOrder.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './CreateOrder.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  updatedBy?: string;
}