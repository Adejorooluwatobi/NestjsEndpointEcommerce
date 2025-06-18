import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreateVariantDto {
  @ApiProperty()
@IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
@IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
@IsNotEmpty()
  @IsUUID()
  productId: string;
}