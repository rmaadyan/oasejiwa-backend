import { Controller, Post, Body, UseGuards, Get, Request, Res, Query } from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordPsychologistDto } from './dto/change-password-psychologist.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @SkipThrottle()
    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @SkipThrottle()
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Throttle({ default: { ttl: 3600000, limit: 3 } })
    @Post('forgot-password')
    forgotPassword(@Body() dto: ForgotPasswordDto) {
        return this.authService.forgotPassword(dto.email);
    }

    @SkipThrottle()
    @Post('reset-password')
    resetPassword(@Body() dto: ResetPasswordDto) {
        return this.authService.resetPassword(dto.token, dto.newPassword);
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
    googleLogin(){}

    @SkipThrottle()
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleCallback(@Request() req, @Res() res){
        const data = req.user;
        const frontendUrl = process.env.FRONTEND_URL;
        const token = data.accessToken;
        res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
    }

    @SkipThrottle()
    @UseGuards(JwtAuthGuard)
    @Post('change-password')
    changePassword(@Request() req, @Body() dto: ChangePasswordPsychologistDto) {
        return this.authService.changePasswordPsychologist(req.user.id, dto);
    }

    @SkipThrottle()
    @Get('verify-email')
    verifyEmail(@Query('token') token: string) {
        return this.authService.verifyEmail(token);
    }

    @Throttle({ default: {ttl: 3600000, limit: 3}})
    @Post('resend-verification')
    resendVerification(@Body() dto: ForgotPasswordDto) {
        return this.authService.resendVerificationEmail(dto.email);
    }
}