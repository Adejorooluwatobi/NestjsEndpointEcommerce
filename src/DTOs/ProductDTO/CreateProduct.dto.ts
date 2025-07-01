import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto{

    

@ApiProperty()
@IsNotEmpty()
    @IsString()
    productName: string;

    @ApiProperty()
@IsNotEmpty()
    @IsString()
    sku: string;

    @ApiProperty()
@IsNotEmpty()
    @IsNumber()
    regularPrice: number;

    @ApiProperty()
@IsNotEmpty()
    @IsNumber()
    discountPrice: number;

    @ApiProperty()
@IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
@IsOptional()
    @IsString()
    shortDescription: string;

    @ApiProperty()
@IsOptional()
    @IsString()
    productDescription: string;

    @ApiProperty()
@IsOptional()
    @IsNumber()
    productWeight: number;

    @ApiProperty()
@IsNotEmpty()
    @IsString()
    productCode: string;

    @ApiProperty()
@IsNotEmpty()
    @IsBoolean()
    published: boolean;
}