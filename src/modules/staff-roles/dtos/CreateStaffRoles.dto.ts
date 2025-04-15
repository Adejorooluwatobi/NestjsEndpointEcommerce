import { IsNotEmpty, IsString } from "class-validator";

export class CreateStaffRoleDto {
  @IsNotEmpty()
  @IsString()
  staffId: string;

  @IsNotEmpty()
  @IsString()
  roleId: string;
}
    