import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // 1. Ekstrak dari Bearer Token
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // 2. Ekstrak dari Cookie 'token'
        (req: Request) => {
          return req?.cookies?.token || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    // 🟢 Pastikan mengembalikan id user dari payload JWT
    return { 
      id: payload.sub || payload.id || payload.userId, 
      email: payload.email, 
      role: payload.role 
    };
  }
}