import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItemDto } from './CreateOrderItems.dto';
import { IsNumber, IsUUID } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
      @IsUUID()
      @Field()
      orderId: string;
    
      @IsUUID()
      @Field()
      productId: string;
    
      @IsNumber()
      @Field()
      price: number;
    
      @IsNumber()
      @Field()
      quantity: number;
}