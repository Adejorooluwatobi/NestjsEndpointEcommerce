import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateSlideBannerDto {

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  destinationId?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file to upload (optional)'
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  clicks?: number;
}