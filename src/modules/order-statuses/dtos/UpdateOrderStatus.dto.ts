import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderStatusDto } from './CreateOrderStatus.dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderStatusDto extends PartialType(CreateOrderStatusDto) {
      @Field()
      statusName: string;
    
      @Field()
      color: string;

      @Field()
      privacy: string;
    
      @Field()
      createdBy: string;

      @Field()
      updatedBy: string;
}