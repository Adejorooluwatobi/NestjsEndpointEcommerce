import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateSlideBannerDto {

  @ApiProperty()
  @IsUUID()
  destinationId: string;

  @ApiProperty()
  @IsString()
  image_url: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  clicks: number;
}