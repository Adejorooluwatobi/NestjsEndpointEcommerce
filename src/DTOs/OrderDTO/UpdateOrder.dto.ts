// src/orders/dtos/UpdateOrder.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './CreateOrder.dto';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty()
  @IsOptional()
  updatedBy?: string;

  @ApiProperty()
  @IsOptional()
  orderStatusId?: number | undefined;
}