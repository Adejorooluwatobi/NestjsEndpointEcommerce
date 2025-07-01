import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateProductAttributeDto{

    @ApiProperty()
    @IsOptional()
    @IsString()
    productId?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    attributeId?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    attributeValueId?: string;

}