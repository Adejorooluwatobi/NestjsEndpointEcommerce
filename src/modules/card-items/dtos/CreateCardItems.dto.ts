import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateCardItemDto {
    // Define the properties and validations for CreateCardItemDto
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