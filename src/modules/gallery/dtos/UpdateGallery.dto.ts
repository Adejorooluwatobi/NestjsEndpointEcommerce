import { PartialType } from '@nestjs/mapped-types';
import { CreateGalleryDto } from './CreateGallery.dto';
import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGalleryDto extends PartialType(CreateGalleryDto) {
    @ApiProperty()
      @IsUUID()
      productId: string;
    
      @ApiProperty()
      @IsString()
      imagePath: string;
    
      @ApiProperty()
      @IsString()
      thumbnail: string;
    
      @ApiProperty()
      @IsBoolean()
      displayOrder: boolean;
}