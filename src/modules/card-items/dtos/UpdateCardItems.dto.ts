import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UpdateCardItemDto {

  @IsNotEmpty()
  @Field()
  productId: string;
  
  @IsNotEmpty()
  @Field()
  cardId: string;

  @IsNotEmpty()
  @Field()
  itemDetails: string;
  }