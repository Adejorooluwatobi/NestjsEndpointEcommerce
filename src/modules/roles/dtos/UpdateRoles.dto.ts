import { IsNotEmpty, IsString } from "class-validator";

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsString()
  roleName: string;

  @IsNotEmpty()
  @IsString()
  privileges: string;
}