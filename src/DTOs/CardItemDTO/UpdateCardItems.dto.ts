import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";


@InputType()
export class UpdateCardItemDto {

  @ApiProperty()
  @IsOptional()
  @Field()
  productId?: string;
  
  @ApiProperty()
  @IsOptional()
  @Field()
  cardId?: string;

  @ApiProperty()
  @IsOptional()
  @Field()
  itemDetails?: string;
  }