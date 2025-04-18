import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateProductCategoryDto{

    @ApiProperty()

    @IsString()
    productId: string;

    @ApiProperty()

    @IsString()
    attributeId: string;

}