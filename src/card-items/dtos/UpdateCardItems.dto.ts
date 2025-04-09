import { IsNotEmpty } from "class-validator";

export class UpdateCardItemDto {

  @IsNotEmpty()
  product_id: string;
  
  @IsNotEmpty()
  card_id: string;

  @IsNotEmpty()
  item_details: string;
  }