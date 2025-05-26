import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
@IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}