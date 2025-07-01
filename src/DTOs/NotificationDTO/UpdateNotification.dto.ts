import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateNotificationDto {
    @ApiProperty()
    @IsOptional()
    @IsUUID()
    accountId?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    title?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    content?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    read?: boolean;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    notification_expiryDate?: string;
}