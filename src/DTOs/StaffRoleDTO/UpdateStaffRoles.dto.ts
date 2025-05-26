import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateStaffRoleDto {
  @ApiProperty()

  @IsString()
  staffId: string;

  @ApiProperty()

  @IsString()
  roleId: string;
}
    