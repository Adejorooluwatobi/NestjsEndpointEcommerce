import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateGalleryDto {
    @ApiProperty({ description: 'Product ID that this gallery item belongs to' })
    @IsNotEmpty()
    @IsUUID()
    productId: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file to upload (required)'
  })
  @IsNotEmpty()
  image: string;

    @ApiProperty({ description: 'Thumbnail path' })
    @IsNotEmpty()
    @IsString()
    thumbnail: string;

    @ApiProperty({ description: 'Display order for the gallery item' })
    @IsNotEmpty()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value === 'true';
        }
        return value;
    })
    displayOrder: boolean;
}