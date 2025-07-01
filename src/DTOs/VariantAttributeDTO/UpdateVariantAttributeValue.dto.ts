import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class UpdateVariantAttributeValueDto {
  @ApiProperty()
  @IsOptional()
    @IsUUID()
    variantId?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsUUID()
    attributeValueId?: string;
}