import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/modules/users/services/users/users.service';
import { CustomersService } from 'src/modules/customers/services/customers/customers.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private customersService: CustomersService,
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
      role: 'user'
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.username,
        isAdmin: user.isAdmin,
      }
    };
  }

  async registerUser(email: string, hashedPassword: string): Promise<void> {
    const existingUser = await this.usersService.findUserByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists');
    }
  
    await this.usersService.createUser({
      email : '',
      password: hashedPassword,
      username: '',
      firstname: '',
      lastname: '',
      isAdmin: false,
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
    const customer = await this.validateUser(email, password);
    
    const payload = { 
      email: customer.email, 
      sub: customer.id, 
      role: 'customer'
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: customer.id,
        email: customer.email,
        name: customer.username,
        isAdmin: customer.isAdmin,
      }
    };
  }

  async registerCustomer(email: string, hashedPassword: string): Promise<void> {
    const existingCustomer = await this.customersService.findCustomerByEmail(email);
    if (existingCustomer) {
      throw new UnauthorizedException('User with this email already exists');
    }
  
    await this.customersService.createCustomer({
      email : '',
      password: hashedPassword,
      username: '',
      firstname: '',
      lastname: '',
    });
  }
}