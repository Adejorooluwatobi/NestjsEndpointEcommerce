import { ApiProperty } from "@nestjs/swagger";
import { IsNumber,IsUUID } from "class-validator";

export class UpdateVariantDto {
   @ApiProperty()
    @IsNumber()
    price: number;
  
    @ApiProperty()
    @IsNumber()
    quantity: number;
  
    @ApiProperty()
    @IsUUID()
    productId: string;
}