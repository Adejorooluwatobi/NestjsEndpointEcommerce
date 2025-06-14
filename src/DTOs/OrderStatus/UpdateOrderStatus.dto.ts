import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderStatusDto } from './CreateOrderStatus.dto';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateOrderStatusDto extends PartialType(CreateOrderStatusDto) {
      @Field()
      @ApiProperty()
      statusName: string;

      @Field()
      @ApiProperty()
      statusCode: string;
    
      @Field()
      @ApiProperty()
      color: string;

      @Field()
      @ApiProperty()
      privacy: string;
    
      // @Field()
      // @ApiProperty()
      // createdBy: string;

      // @Field()
      // @ApiProperty()
      // updatedBy: string;
}