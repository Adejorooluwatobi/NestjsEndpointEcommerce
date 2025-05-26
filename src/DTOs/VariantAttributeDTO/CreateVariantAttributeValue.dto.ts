import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateVariantAttributeValueDto {
  @ApiProperty()
@IsNotEmpty()
  @IsUUID()
  variantId: string;

  @ApiProperty()
@IsNotEmpty()
  @IsUUID()
  attributeValueId: string;
}