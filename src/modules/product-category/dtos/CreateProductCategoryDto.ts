import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,IsString } from "class-validator";

export class CreateProductCategoryDto{

    

@ApiProperty()
@IsNotEmpty()
    @IsString()
    productId: string;

    @ApiProperty()
@IsNotEmpty()
    @IsString()
    attributeId: string;

}