import { PartialType } from '@nestjs/mapped-types';
import { CreateGalleryDto } from './CreateGallery.dto';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateGalleryDto extends PartialType(CreateGalleryDto) {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsUUID()
    productId?: string;

    @ApiProperty({ 
        type: 'string', 
        format: 'binary',
        description: 'Image file to upload (required)' 
    })
    @IsOptional()
    image?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    thumbnail?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value === 'true';
        }
        return value;
    })
    displayOrder?: boolean;
}