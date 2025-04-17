import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateStaffRoleDto {
  @ApiProperty()
@IsNotEmpty()
  @IsString()
  staffId: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  roleId: string;
}
    