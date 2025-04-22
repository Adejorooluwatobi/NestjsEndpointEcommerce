export class UserAccessTokenDto {
    accessToken: string;
    isAdmin: boolean;
    isActive: boolean;

  }
export class CustomerAccessTokenDto {
    accessToken: string;
    isActive: boolean;
  }

export class StaffAccessTokenDto {
    accessToken: string;
    isActive: boolean;
  }