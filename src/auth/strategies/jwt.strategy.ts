import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
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
      secretOrKey: process.env.JWT_SECRET || 'secretKeyOaseJiwa',
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