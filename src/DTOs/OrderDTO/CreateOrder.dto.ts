import { IsNotEmpty, IsUUID, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
// import { Type } from 'class-transformer';
// import { CreateOrderItemDto } from 'src/modules/order-items/dtos/CreateOrderItems.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from 'src/DTOs/OrderItemDTO/CreateOrderItems.dto';

export class CreateOrderDto {
  @ApiProperty()
@IsNotEmpty()
  @IsUUID()
  customerId: string;

  @IsOptional()
  @IsUUID()
  couponId?: string;

  @ApiProperty()
@IsNotEmpty()
  @IsNumber()
  orderStatusId: number;

  @ApiProperty()
  @IsOptional()
  orderDeliveredCarrierDate?: Date;

  @ApiProperty()
  @IsOptional()
  orderDeliveredCustomerDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems?: CreateOrderItemDto[];
}

