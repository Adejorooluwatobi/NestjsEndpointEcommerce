import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class UpdateProductDto{

    @ApiProperty()

    @IsString()
    productName: string;

    @ApiProperty()

    @IsString()
    sku: string;

    @ApiProperty()

    @IsNumber()
    regularPrice: number;

    @ApiProperty()

    @IsNumber()
    discountPrice: number;

    @ApiProperty()

    @IsNumber()
    quantity: number;

    @ApiProperty()

    @IsString()
    shortDescription: string;

    @ApiProperty()

    @IsString()
    productDescription: string;

    @ApiProperty()

    @IsNumber()
    productWeight: number;

    @ApiProperty()

    @IsString()
    productCode: string;

    @ApiProperty()

    @IsBoolean()
    published: boolean;
}