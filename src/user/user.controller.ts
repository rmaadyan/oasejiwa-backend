import { Controller, Get, Patch, Req, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle() 
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Req() req) {
        return this.userService.getMe(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('profile')
        updateProfile(@Req() req, @Body() dto: UpdateProfileDto) {
        return this.userService.updateProfile(req.user.id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('change-password')
    changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
        return this.userService.changePassword(req.user.id, dto);
    }
}
