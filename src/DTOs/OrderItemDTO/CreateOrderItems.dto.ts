import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

@InputType()
export class CreateOrderItemDto {
  @ApiProperty()
@IsNotEmpty()
  @IsUUID()
  @Field()
  orderId: string;

  @ApiProperty()
@IsNotEmpty()
  @IsUUID()
  @Field()
  productId: string;

  @ApiProperty()
@IsNotEmpty()
  @IsNumber()
  @Field()
  price: number;

  @ApiProperty()
@IsNotEmpty()
  @IsNumber()
  @Field()
  quantity: number;
}