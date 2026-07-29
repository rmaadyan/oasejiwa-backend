import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { EmailInputDto } from './dto/email-input.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordPsychologistDto } from './dto/change-password-psychologist.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: any) {
    const result = await this.authService.login(dto);
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('token', result.accessToken, {
      httpOnly: true,
      sameSite: isProd ? 'none' : 'lax',
      secure: isProd,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return result;
  }

  @SkipThrottle()
  @Post('logout')
  logout(@Res({ passthrough: true }) res) {
      const isProd = process.env.NODE_ENV === 'production';
      res.cookie('token', '', {
          httpOnly: true,
          sameSite: isProd ? 'none' : 'lax',
          secure: isProd,
          maxAge: 0,
      });
      return { message: 'Logout berhasil' };
  }

  @SkipThrottle()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req) {
    return {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
      isProfileComplete: req.user.isProfileComplete,
      isEmailVerified: req.user.isEmailVerified,
      isFirstLogin: req.user.isFirstLogin,
    };
  }

  @Throttle({ default: { ttl: 3600000, limit: 5 } })
  @Post('email-input')
  emailInput(@Body() dto: EmailInputDto) {
    return this.authService.emailInput(dto.email);
  }

  @Throttle({ default: { ttl: 3600000, limit: 5 } })
  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto);
  }

  @SkipThrottle()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('admin-only')
  adminOnly() {
    return { message: 'Halo Admin!' };
  }

  @SkipThrottle()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @SkipThrottle()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleCallback(@Request() req, @Res() res) {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    if (!req.user) {
      const msg = encodeURIComponent(
        'Akun ini sudah terdaftar dengan email & password',
      );
      return res.redirect(`${frontendUrl}/auth/callback?error=${msg}`);
    }

    const token = req.user.accessToken;

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return res.redirect(`${frontendUrl}/auth/callback`);
  }

  @SkipThrottle()
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  changePassword(
    @Request() req,
    @Body() dto: ChangePasswordPsychologistDto,
  ) {
    return this.authService.changePasswordPsychologist(req.user.id, dto);
  }

  @Throttle({ default: { ttl: 3600000, limit: 5 } })
  @Get('verify-email')
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Throttle({ default: { ttl: 3600000, limit: 5 } })
  @Post('resend-verification')
  resendVerification(@Body() dto: EmailInputDto) {
    return this.authService.resendVerificationEmail(dto.email);
  }
}