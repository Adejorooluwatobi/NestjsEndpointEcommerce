import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateSlideBannerDto {

  @ApiProperty()
@IsNotEmpty()
  @IsUUID()
  destinationId: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file to upload (required)'
  })
@IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
@IsNotEmpty()
  @IsNumber()
  clicks: number;
}