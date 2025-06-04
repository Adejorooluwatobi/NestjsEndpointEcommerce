import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItemDto } from './CreateOrderItems.dto';
import { ArrayMinSize, IsArray, IsNumber, IsUUID } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {   

      @IsUUID()
      @IsArray() // Ensures it's an array
        @ArrayMinSize(1) // Ensures at least one product is provided
        @Field(() => [String]) // Specifies that this field is an array of strings for GraphQL
        @ApiProperty()
        productId: string[];
    
      @IsNumber()
      @IsArray()
      @ArrayMinSize(1)
      @Field(() => [Number])
      @ApiProperty()
      price: number[];
    
      @IsNumber()
      @IsNumber({}, { each: true })
      @IsArray()
      @ArrayMinSize(1)
      @Field(() => [Number])
      @ApiProperty()
      quantity: number[];
}
