import { IsNotEmpty, IsUUID, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
@IsNotEmpty()
  @IsUUID()
  customerId: string;

  @ApiProperty()
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

  // @ApiProperty()
  // @IsOptional()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateOrderItemDto)
  // orderItems?: CreateOrderItemDto[];
}

