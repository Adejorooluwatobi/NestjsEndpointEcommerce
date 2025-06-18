import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { OrderItemDataDto } from './OrderItemData.dto';

@InputType()
export class CreateOrderItemDto {
  @ApiProperty()
  @IsUUID('4')
  @Field()
  orderId: string;

  @ApiProperty({ type: [OrderItemDataDto] })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDataDto)
  @Field(() => [OrderItemDataDto])
  items: OrderItemDataDto[];
}