import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/modules/users/services/users/users.service';
import { CustomersService } from 'src/modules/customers/services/customers/customers.service';
import { StaffAccountsService } from 'src/modules/staff-accounts/services/staff-accounts/staff-accounts.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private customersService: CustomersService,
    private staffsService: StaffAccountsService,
    private jwtService: JwtService,
  ) {}
  
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }


  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    return user;
  }

  async loginUser(email: string, password: string) {
    const user = await this.validateUser(email, password);
    
    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: 'user',
      name: user.userName,
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.userName,
        isAdmin: user.isAdmin,
        isActive: user.isActive
      }
    };
  }

  async registerUser(email: string, hashedPassword: string): Promise<void> {
    const existingUser = await this.usersService.findUserByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException(`User with this ${email} already exists`);
    }
  
    await this.usersService.createUser({
      email : '',
      password: hashedPassword,
      userName: '',
      firstName: '',
      lastName: '',
      isAdmin: false,
      isActive: false,
    });
  }

  async validateCustomer(email: string, password: string) {
    const customer = await this.customersService.findCustomerByEmail(email);
    if (!customer) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    return customer;
  }

  async loginCustomer(email: string, password: string) {
    try {
        const customer = await this.customersService.findCustomerByEmail(email);
        if (!customer) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, customer.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: customer.id,
            email: customer.email,
            role: 'customer',
            name: customer.firstName,
        };

        return {
            access_token: this.jwtService.sign(payload),
            customer: {
                id: customer.id,
                email: customer.email,
                userName: customer.firstName,
                isActive: customer.isActive,
            }
        };
    } catch (error) {
        console.error('Error during customer login:', error); // Log the error on the server
        if (error instanceof UnauthorizedException) {
            throw error; // Re-throw UnauthorizedException
        }
        throw new InternalServerErrorException('Login failed due to a server error');
    }
}


  async registerCustomer(email: string, hashedPassword: string): Promise<void> {
    const existingCustomer = await this.customersService.findCustomerByEmail(email);
    if (existingCustomer) {
      throw new UnauthorizedException('User with this email already exists');
    }
  
    await this.customersService.createCustomer({
      email : '',
      password: hashedPassword,
      userName: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      isActive: false,
    });
  }


  async loginStaff(email: string, password: string) {
    try {
        const staff = await this.staffsService.findStaffByEmail(email);
        if (!staff) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, staff.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: staff.id,
            email: staff.email,
            role: 'staff',
            name: staff.firstName
        };

        return {
            access_token: this.jwtService.sign(payload),
            staff: {
                id: staff.id,
                email: staff.email,
                isActive: staff.isActive,
                name: staff.firstName
            }
        };
    } catch (error) {
        console.error('Error during staff login:', error); // Log the error on the server
        if (error instanceof UnauthorizedException) {
            throw error; // Re-throw UnauthorizedException
        }
        throw new InternalServerErrorException('Login failed due to a server error');
    }
}


  async registerStaff(email: string, hashedPassword: string): Promise<void> {
    const existingStaff = await this.staffsService.findStaffByEmail(email);
    if (existingStaff) {
      throw new UnauthorizedException('User with this email already exists');
    }
  
    await this.staffsService.createStaffAccount({
      email : '',
      password: hashedPassword,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      isActive: false,
      profileImg: ''
    });
  }
}