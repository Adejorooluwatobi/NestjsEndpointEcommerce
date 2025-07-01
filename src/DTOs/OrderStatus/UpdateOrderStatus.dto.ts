import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderStatusDto } from './CreateOrderStatus.dto';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateOrderStatusDto extends PartialType(CreateOrderStatusDto) {
      @Field()
      @IsOptional()
      @ApiProperty()
      statusName?: string;

      @Field()
      @IsOptional()
      @ApiProperty()
      statusCode?: string;
    
      @Field()
      @IsOptional()
      @ApiProperty()
      color?: string;

      @Field()
      @IsOptional()
      @ApiProperty()
      privacy?: string;
    
      // @Field()
      // @ApiProperty()
      // createdBy: string;

      // @Field()
      // @ApiProperty()
      // updatedBy: string;
}