import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateInventoryDto{

    @ApiProperty()
    @IsOptional()
    @IsString()
    productId?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    stockLevel?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    stock?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    reservedStock?: number;

}