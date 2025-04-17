import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateOrderStatusDto {
  @ApiProperty()
@IsNotEmpty()
  @IsString()
  @Field()
  statusName: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  @Field()
  color: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  @Field()
  privacy: string;

  @ApiProperty()
@IsNotEmpty()
  @IsUUID()
  @Field()
  createdBy: string;

  @ApiProperty()
@IsNotEmpty()
  @IsUUID()
  @Field()
  updatedBy: string;
}