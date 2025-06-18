import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class UpdateCategoryDto{

    // @ApiProperty()
    //     @IsString()
    //     parentId: string;
    
    @ApiProperty()
        @IsString()
        categoryName: string;
    
        @ApiProperty()
        @IsString()
        categoryDescription: string;
    
        @ApiProperty()
        @IsString()
        icon: string;
    
        @ApiProperty()
        @IsString()
        imagePath: string;
    
        @ApiProperty()
        @IsBoolean()
        isActive: boolean;
}