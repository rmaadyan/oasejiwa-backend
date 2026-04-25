import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);

    constructor(private mailerService: MailerService){}

    async sendPasswordResetEmail(email: string, token: string){
        const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
        try{
            await this.mailerService.sendMail({
                to: email,
                subject: 'Reset Password Oasejiwa',
                html: `
                <h2>Reset Password</h2>
                <p>Klik link di bawah ini:</p>
                <a href="${resetLink}">Reset Password</a>
                <p>Link berlaku selama 15 menit</p>`,
            });

            this.logger.log(`Reset password email sent to ${email}`);
        }catch(error:any){
            this.logger.error(`Failed to send email to ${email}`, error.stack);
        }
    }

    async sendVerificationEmail(email:string, token:string){
        const verifyLink = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`;

        try{
            await this.mailerService.sendMail({
                to: email,
                subject: 'Verifikasi email Oasejiwa',
                html:`
                    <h2>Verifikasi Email</h2>
                    <p>Klik link di bawah ini:</p>
                    <a href="${verifyLink}">Verifikasi</a>
                `,
            });

            this.logger.log(`Verification email sent to ${email}`);
        }catch(error:any){
            this.logger.error(`Failed to send email to ${email}`, error.stack);
        }
    }
}