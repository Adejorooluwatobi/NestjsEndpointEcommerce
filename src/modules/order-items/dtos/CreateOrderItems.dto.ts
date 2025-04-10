import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

@InputType()
export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  orderId: string;

  @IsNotEmpty()
  @IsUUID()
  @Field()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  quantity: number;
}