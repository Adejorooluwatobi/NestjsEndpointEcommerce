import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

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
@IsNotEmpty()
    @IsString()
    shortDescription: string;

    @ApiProperty()
@IsNotEmpty()
    @IsString()
    productDescription: string;

    @ApiProperty()
@IsNotEmpty()
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