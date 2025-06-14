import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateProductTagDto{

    @ApiProperty()
    @IsString()
    productId: string;

    @ApiProperty()
    @IsString()
    tagId: string;

}