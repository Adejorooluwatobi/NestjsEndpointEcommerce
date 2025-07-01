import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto{

    

// @ApiProperty()
// @IsNotEmpty()
//     @IsString()
//     parentId: string;

@ApiProperty()
@IsNotEmpty()
    @IsString()
    categoryName: string;

    @ApiProperty()
@IsNotEmpty()
    @IsString()
    categoryDescription: string;

    @ApiProperty()
@IsNotEmpty()
    @IsString()
    icon: string;

    @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file to upload (required)'
    })
    @IsNotEmpty()
    image: string;

    @ApiProperty()
@IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

}