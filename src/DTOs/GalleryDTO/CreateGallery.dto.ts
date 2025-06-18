// src/cards/dtos/CreateGallery.dto.ts
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGalleryDto {
  @ApiProperty()
@IsNotEmpty()
  @IsUUID()
  productId: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  imagePath: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  thumbnail: string;

  @ApiProperty()
@IsNotEmpty()
  @IsBoolean()
  displayOrder: boolean;

}
