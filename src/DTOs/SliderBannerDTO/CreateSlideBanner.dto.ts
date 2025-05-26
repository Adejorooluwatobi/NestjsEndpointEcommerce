import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateSlideBannerDto {

  @ApiProperty()
@IsNotEmpty()
  @IsUUID()
  destinationId: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  image_url: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
@IsNotEmpty()
  @IsNumber()
  clicks: number;
}