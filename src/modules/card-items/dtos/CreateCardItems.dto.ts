import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateCardItemDto {
    // Define the properties and validations for CreateCardItemDto
    @ApiProperty()
@IsNotEmpty()
    @Field()
    productId: string;
    
    @ApiProperty()
@IsNotEmpty()
    @Field()
    cardId: string;
  
    @ApiProperty()
@IsNotEmpty()
    @Field()
    itemDetails: string;
  }