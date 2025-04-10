import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateOrderStatusDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  status_name: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  color: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  privacy: string;

  @IsNotEmpty()
  @IsUUID()
  @Field()
  created_by: string;

  @IsNotEmpty()
  @IsUUID()
  @Field()
  updated_by: string;
}