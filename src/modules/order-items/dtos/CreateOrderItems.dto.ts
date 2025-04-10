import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

@InputType()
export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  order_id: string;

  @IsNotEmpty()
  @IsUUID()
  @Field()
  product_id: string;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  quantity: number;
}