import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class OrderItemDataDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  @Field()
  productId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Field()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Field()
  quantity: number;
}