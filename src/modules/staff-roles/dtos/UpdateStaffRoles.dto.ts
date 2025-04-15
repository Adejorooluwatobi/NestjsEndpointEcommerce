import { IsNotEmpty, IsString } from "class-validator";

export class UpdateStaffRoleDto {
  @IsNotEmpty()
  @IsString()
  staffId: string;

  @IsNotEmpty()
  @IsString()
  roleId: string;
}
    