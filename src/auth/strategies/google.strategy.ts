import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(private authService: AuthService){
        const clientID = process.env.GOOGLE_CLIENT_ID || 'dummy_google_client_id';
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET || 'dummy_google_client_secret';

        super({
            clientID,
            clientSecret,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || 'https://api.oasejiwa.id/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ) {
        const {emails, displayName} = profile;
        const email = emails[0].value;

        try {
            const user = await this.authService.handleGoogleLogin({
                email,
                fullName: displayName
            });
            done(null, user);
        } catch (error: any) {
            done(null, false, { message: error.message });
        }
    }
}