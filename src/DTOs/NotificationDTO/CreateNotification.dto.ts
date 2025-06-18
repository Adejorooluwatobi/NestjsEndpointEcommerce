import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateNotificationDto {
  @ApiProperty()
@IsNotEmpty()
  @IsUUID()
  accountId: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
@IsNotEmpty()
  @IsBoolean()
  read: boolean;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  notification_expiryDate: string;
}