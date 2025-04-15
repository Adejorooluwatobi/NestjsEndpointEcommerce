import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateProductDto{

    @IsNotEmpty()
    @IsString()
    productName: string;

    @IsNotEmpty()
    @IsString()
    sku: string;

    @IsNotEmpty()
    @IsNumber()
    regularPrice: number;

    @IsNotEmpty()
    @IsNumber()
    discountPrice: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsString()
    shortDescription: string;

    @IsNotEmpty()
    @IsString()
    productDescription: string;

    @IsNotEmpty()
    @IsNumber()
    productWeight: number;

    @IsNotEmpty()
    @IsString()
    productCode: string;

    @IsNotEmpty()
    @IsBoolean()
    published: boolean;
}