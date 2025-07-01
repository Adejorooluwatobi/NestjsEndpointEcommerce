import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";
export class UpdateCardDto {
  @ApiProperty()
    @IsOptional()
    @IsUUID()
    cardNumber?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    cardName?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    cardType?: string;
  
    @ApiProperty()
    @IsBoolean()
    isActive?: boolean;
}