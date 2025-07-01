import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateProductCategoryDto{

    @ApiProperty()
    @IsOptional()
    @IsString()
    productId?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    categoryId?: string;

}