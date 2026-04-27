import {
  Body,
  Controller,
  Get,
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
  constructor(private authService: AuthService) {}

  @Throttle({ default: { ttl: 3600000, limit: 5 } })
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Throttle({ default: { ttl: 900000, limit: 10 } })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Throttle({ default: { ttl: 3600000, limit: 3 } })
  @Post('email-input')
  emailInput(@Body() dto: EmailInputDto) {
    return this.authService.emailInput(dto.email);
  }

  @SkipThrottle()
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
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    if (!req.user) {
      const msg = encodeURIComponent(
        'Akun ini sudah terdaftar dengan email & password, silahkan login dengan email',
      );

      return res.redirect(`${frontendUrl}/auth/callback?error=${msg}`);
    }

    const token = req.user.accessToken;
    return res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
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

  @SkipThrottle()
  @Get('verify-email')
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Throttle({ default: { ttl: 3600000, limit: 3 } })
  @Post('resend-verification')
  resendVerification(@Body() dto: EmailInputDto) {
    return this.authService.resendVerificationEmail(dto.email);
  }
}