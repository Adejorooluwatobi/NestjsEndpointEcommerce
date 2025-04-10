import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateOrderStatusDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  statusName: string;

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
  createdBy: string;

  @IsNotEmpty()
  @IsUUID()
  @Field()
  updatedBy: string;
}