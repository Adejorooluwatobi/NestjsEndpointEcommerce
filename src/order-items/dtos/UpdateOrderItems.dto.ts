import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItemDto } from './CreateOrderItems.dto';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}