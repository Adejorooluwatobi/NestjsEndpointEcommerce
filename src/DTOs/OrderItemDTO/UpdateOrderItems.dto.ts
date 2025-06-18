import { PartialType } from '@nestjs/mapped-types';
import { OrderItemDataDto } from './OrderItemData.dto';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateOrderItemDto extends PartialType(OrderItemDataDto) {
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  productId?: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  price?: number;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  quantity?: number;
}
