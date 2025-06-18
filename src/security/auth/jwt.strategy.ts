import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
    });
  }

  async validate(payload: any) {
    const userData = { 
      id: payload.sub, 
      email: payload.email,
      role: payload.role 
    };
    const customerData = { 
      id: payload.sub, 
      email: payload.email,
      role: payload.role 
    };
    const staffData = {
      id: payload.sub, 
      email: payload.email,
      role: payload.role 
    };

    if (payload.role === 'customer') {
      return { customer: customerData };
    } else if (payload.role === 'staff') {
      return { staff: staffData };
      // return { user: userData };
    } else {
      return { user: userData };
    }
  }
}