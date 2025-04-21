import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, IsUUID } from "class-validator";

export class UpdateNotificationDto {
   @ApiProperty()
    @IsUUID()
    accountId: string;
  
    @ApiProperty()
    @IsString()
    title: string;
  
    @ApiProperty()
    @IsString()
    content: string;
  
    @ApiProperty()
    @IsBoolean()
    read: boolean;
  
    @ApiProperty()
    @IsString()
    notification_expiryDate: string;
}