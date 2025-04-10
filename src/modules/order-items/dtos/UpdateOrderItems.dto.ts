import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItemDto } from './CreateOrderItems.dto';
import { IsNumber, IsUUID } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
      @IsUUID()
      @Field()
      order_id: string;
    
      @IsUUID()
      @Field()
      product_id: string;
    
      @IsNumber()
      @Field()
      price: number;
    
      @IsNumber()
      @Field()
      quantity: number;
}