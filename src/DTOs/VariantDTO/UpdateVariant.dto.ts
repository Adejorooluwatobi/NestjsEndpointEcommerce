import { ApiProperty } from "@nestjs/swagger";
import { IsNumber,IsOptional,IsUUID } from "class-validator";

export class UpdateVariantDto {
   @ApiProperty()
   @IsOptional()
    @IsNumber()
    price?: number;
  
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    quantity?: number;
  
    @ApiProperty()
    @IsOptional()
    @IsUUID()
    productId?: string;
}