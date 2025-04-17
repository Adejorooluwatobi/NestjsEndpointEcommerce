import { IsNotEmpty, IsUUID, IsOptional, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from 'src/modules/order-items/dtos/CreateOrderItems.dto';
import { ApiProperty } from '@nestjs/swagger';


// class CreateOrderItemDto {
//   @ApiProperty()
// @IsNotEmpty()
//   @IsUUID()
//   productId: string;

//   @ApiProperty()
// @IsNotEmpty()
//   @IsNumber()
//   quantity: number;

//   @ApiProperty()
// @IsNotEmpty()
//   @IsNumber()
//   unitPrice: number;
// }

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

