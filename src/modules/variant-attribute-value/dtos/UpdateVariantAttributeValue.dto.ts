import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class UpdateVariantAttributeValueDto {
  @ApiProperty()
    @IsUUID()
    variantId: string;
  
    @ApiProperty()
    @IsUUID()
    attributeValueId: string;
}