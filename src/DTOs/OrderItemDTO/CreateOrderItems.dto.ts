import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateOrderItemDto {
  @IsUUID()
  @Field()
  @ApiProperty()
  orderId: string;

  @ApiProperty()
  @IsNotEmpty({ each: true }) // Ensures each item in the array is not empty
  @IsUUID('4', { each: true }) // Validates each item in the array as a UUID v4
  @IsArray() // Ensures it's an array
  @ArrayMinSize(1) // Ensures at least one product is provided
  @Field(() => [String]) // Specifies that this field is an array of strings for GraphQL
  productId: string[];

  @ApiProperty()
  @IsNotEmpty({ each: true })
  @IsNumber({}, { each: true }) // Validates each item in the array as a number
  @IsArray()
  @ArrayMinSize(1)
  @Field(() => [Number])
  price: number[];

  @ApiProperty()
  @IsNotEmpty({ each: true })
  @IsNumber({}, { each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Field(() => [Number])
  quantity: number[];
}
