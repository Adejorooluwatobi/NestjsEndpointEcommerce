export class UserAccessTokenDto {
    accessToken: string;
    isAdmin: boolean;
    isActive: boolean;
    name: string;

  }
export class CustomerAccessTokenDto {
    accessToken: string;
    isActive: boolean;
    name: string;
  }

export class StaffAccessTokenDto {
    accessToken: string;
    isActive: boolean;
    name: string;
  }