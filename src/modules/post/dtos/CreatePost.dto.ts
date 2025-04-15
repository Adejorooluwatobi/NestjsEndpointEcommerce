import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}