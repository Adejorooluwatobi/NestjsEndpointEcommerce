import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, IsString } from "class-validator";

export class CreateProductTagDto{

    

@ApiProperty()
@IsNotEmpty()
    @IsString()
    productId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    tagId: string;

}