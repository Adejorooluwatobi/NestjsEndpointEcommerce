import { IsNotEmpty, IsUUID, IsOptional, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from 'src/order-items/dtos/CreateOrderItems.dto';

// class CreateOrderItemDto {
//   @IsNotEmpty()
//   @IsUUID()
//   product_id: string;

//   @IsNotEmpty()
//   @IsNumber()
//   quantity: number;

//   @IsNotEmpty()
//   @IsNumber()
//   unit_price: number;
// }

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  customer_id: string;

  @IsOptional()
  @IsUUID()
  coupon_id?: string;

  @IsNotEmpty()
  @IsNumber()
  order_status_id: number;

  @IsOptional()
  order_delivered_carrier_date?: Date;

  @IsOptional()
  order_delivered_customer_date?: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems?: CreateOrderItemDto[];
}

