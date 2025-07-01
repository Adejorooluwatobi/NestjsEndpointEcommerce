import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto{

    // @ApiProperty()
    //     @IsString()
    //     parentId: string;
    
    @ApiProperty()
        @IsOptional()
        @IsString()
        categoryName?: string;
    
        @ApiProperty()
        @IsOptional()
        @IsString()
        categoryDescription?: string;
    
        @ApiProperty()
        @IsOptional()
        @IsString()
        icon?: string;
    
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
        @IsBoolean()
        isActive?: boolean;
}