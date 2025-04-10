import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UpdateCardItemDto {

  @IsNotEmpty()
  @Field()
  product_id: string;
  
  @IsNotEmpty()
  @Field()
  card_id: string;

  @IsNotEmpty()
  @Field()
  item_details: string;
  }