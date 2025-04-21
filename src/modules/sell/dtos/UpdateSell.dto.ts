import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateSellDto {
  @ApiProperty()
    @IsString()
    productId: string;
  
    @ApiProperty()
    @IsNumber()
    price: number;
  
    @ApiProperty()
    @IsNumber()
    quantity: number;
}