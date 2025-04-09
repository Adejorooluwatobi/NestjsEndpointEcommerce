import { IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsUUID()
  order_id: string;

  @IsNotEmpty()
  @IsUUID()
  product_id: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}