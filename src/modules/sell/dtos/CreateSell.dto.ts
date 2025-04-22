import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSellDto {
  @ApiProperty()
@IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty()
@IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
@IsNotEmpty()
  @IsNumber()
  quantity: number;
}