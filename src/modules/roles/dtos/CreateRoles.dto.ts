import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty()
@IsNotEmpty()
  @IsString()
  roleName: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  privileges: string;
}