import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateCardItemDto {
    // Define the properties and validations for CreateCardItemDto
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