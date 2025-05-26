import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItemDto } from './CreateOrderItems.dto';
import { IsNumber, IsUUID } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
      @IsUUID()
      @Field()
      @ApiProperty()
      orderId: string;
    
      @IsUUID()
      @Field()
      @ApiProperty()
      productId: string;
    
      @IsNumber()
      @Field()
      @ApiProperty()
      price: number;
    
      @IsNumber()
      @Field()
      @ApiProperty()
      quantity: number;
}