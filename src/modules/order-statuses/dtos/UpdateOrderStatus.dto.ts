import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderStatusDto } from './CreateOrderStatus.dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderStatusDto extends PartialType(CreateOrderStatusDto) {
      @Field()
      status_name: string;
    
      @Field()
      color: string;

      @Field()
      privacy: string;
    
      @Field()
      created_by: string;

      @Field()
      updated_by: string;
}