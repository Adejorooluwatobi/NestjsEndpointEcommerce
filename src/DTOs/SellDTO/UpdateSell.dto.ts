import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSellDto {
  @ApiProperty()
  @IsOptional()
    @IsString()
    productId?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    price?: number;
  
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    quantity?: number;
}