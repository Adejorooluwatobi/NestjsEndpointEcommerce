import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateProductTagDto{

    @ApiProperty()
    @IsOptional()
    @IsString()
    productId?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    tagId?: string;

}