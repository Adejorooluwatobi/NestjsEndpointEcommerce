import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateStaffRoleDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  staffId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  roleId?: string;
}
    