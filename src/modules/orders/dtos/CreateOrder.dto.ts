import { IsNotEmpty, IsUUID, IsOptional, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from 'src/modules/order-items/dtos/CreateOrderItems.dto';


// class CreateOrderItemDto {
//   @IsNotEmpty()
//   @IsUUID()
//   productId: string;

//   @IsNotEmpty()
//   @IsNumber()
//   quantity: number;

//   @IsNotEmpty()
//   @IsNumber()
//   unitPrice: number;
// }

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  customerId: string;

  @IsOptional()
  @IsUUID()
  couponId?: string;

  @IsNotEmpty()
  @IsNumber()
  orderStatusId: number;

  @IsOptional()
  orderDeliveredCarrierDate?: Date;

  @IsOptional()
  orderDeliveredCustomerDate?: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems?: CreateOrderItemDto[];
}

