import { IsNotEmpty } from "class-validator";

export class CreateCardItemDto {
    // Define the properties and validations for CreateCardItemDto
    @IsNotEmpty()
    product_id: string;
    
    @IsNotEmpty()
    card_id: string;
  
    @IsNotEmpty()
    item_details: string;
  }