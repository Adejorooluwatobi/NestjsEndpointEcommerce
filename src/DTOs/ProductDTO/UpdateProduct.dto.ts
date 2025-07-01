import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto{

    @ApiProperty()
    @IsOptional()
    @IsString()
    productName?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    sku?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    regularPrice?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    discountPrice?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    quantity?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    shortDescription?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    productDescription?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    productWeight?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    productCode?: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    published?: boolean;
}