import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private mailerService: MailerService) {}

  async sendPasswordResetEmail(email: string, token: string) {
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Reset Password Oasejiwa',
        html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:40px 0;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
                            <!-- Header -->
                            <tr>
                                <td style="background-color:#234463;padding:32px;text-align:center;">
                                    <h1 style="color:#ffffff;margin:0;font-size:24px;letter-spacing:1px;">Oase Jiwa</h1>
                                </td>
                            </tr>
                            <!-- Body -->
                            <tr>
                                <td style="padding:40px 48px;">
                                    <h2 style="color:#234463;font-size:20px;margin:0 0 16px;">Permintaan Reset Password</h2>
                                    <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 16px;">
                                        Halo,
                                    </p>
                                    <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 24px;">
                                        Kami menerima permintaan untuk mereset password akun Oase Jiwa Anda. Klik tombol di bawah ini untuk membuat password baru.
                                    </p>
                                    <table cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
                                        <tr>
                                            <td style="background-color:#234463;border-radius:8px;padding:14px 32px;text-align:center;">
                                                <a href="${resetLink}" style="color:#ffffff;text-decoration:none;font-size:15px;font-weight:bold;">Reset Password</a>
                                            </td>
                                        </tr>
                                    </table>
                                    <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 8px;">
                                        Link ini hanya berlaku selama <strong>15 menit</strong>. Jika Anda tidak merasa meminta reset password, abaikan email ini dan password Anda tidak akan berubah.
                                    </p>
                                    <p style="color:#999;font-size:13px;margin:24px 0 0;">
                                        Atau salin link berikut ke browser Anda:<br/>
                                        <a href="${resetLink}" style="color:#234463;word-break:break-all;">${resetLink}</a>
                                    </p>
                                </td>
                            </tr>
                            <!-- Footer -->
                            <tr>
                                <td style="background-color:#f4f6f8;padding:24px 48px;text-align:center;border-top:1px solid #e8eaed;">
                                    <p style="color:#999;font-size:12px;margin:0;">
                                        Email ini dikirim secara otomatis. Mohon jangan membalas email ini.<br/>
                                        &copy; ${new Date().getFullYear()} Oase Jiwa. Seluruh hak cipta dilindungi.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>`,
      });

      this.logger.log(`Reset password email sent to ${email}`);
    } catch (error: any) {
      this.logger.error(`Failed to send email to ${email}`, error.stack);
    }
  }

  async sendVerificationEmail(email: string, token: string) {
    const verifyLink = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Verifikasi email Oasejiwa',
        html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:40px 0;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
                            <!-- Header -->
                            <tr>
                                <td style="background-color:#234463;padding:32px;text-align:center;">
                                    <h1 style="color:#ffffff;margin:0;font-size:24px;letter-spacing:1px;">Oase Jiwa</h1>
                                </td>
                            </tr>
                            <!-- Body -->
                            <tr>
                                <td style="padding:40px 48px;">
                                    <h2 style="color:#234463;font-size:20px;margin:0 0 16px;">Verifikasi Alamat Email Anda</h2>
                                    <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 16px;">
                                        Halo,
                                    </p>
                                    <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 24px;">
                                        Terima kasih telah mendaftar di Oase Jiwa. Satu langkah lagi — verifikasi alamat email Anda untuk mengaktifkan akun dan mulai menggunakan layanan kami.
                                    </p>
                                    <table cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
                                        <tr>
                                            <td style="background-color:#234463;border-radius:8px;padding:14px 32px;text-align:center;">
                                                <a href="${verifyLink}" style="color:#ffffff;text-decoration:none;font-size:15px;font-weight:bold;">Verifikasi Email</a>
                                            </td>
                                        </tr>
                                    </table>
                                    <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 8px;">
                                        Link ini hanya berlaku selama <strong>24 jam</strong>. Jika Anda tidak merasa mendaftar di Oase Jiwa, abaikan email ini.
                                    </p>
                                    <p style="color:#999;font-size:13px;margin:24px 0 0;">
                                        Atau salin link berikut ke browser Anda:<br/>
                                        <a href="${verifyLink}" style="color:#234463;word-break:break-all;">${verifyLink}</a>
                                    </p>
                                </td>
                            </tr>
                            <!-- Footer -->
                            <tr>
                                <td style="background-color:#f4f6f8;padding:24px 48px;text-align:center;border-top:1px solid #e8eaed;">
                                    <p style="color:#999;font-size:12px;margin:0;">
                                        Email ini dikirim secara otomatis. Mohon jangan membalas email ini.<br/>
                                        &copy; ${new Date().getFullYear()} Oase Jiwa. Seluruh hak cipta dilindungi.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>`,
      });

      this.logger.log(`Verification email sent to ${email}`);
    } catch (error: any) {
      this.logger.error(`Failed to send email to ${email}`, error.stack);
    }
  }

  // =========================================================================
  // 1. Kirim Email Kredensial untuk Psikolog Baru (Dengan Peringatan 1x24 Jam)
  // =========================================================================
  async sendPsychologistCredentials(email: string, fullName: string, tempPassword: string) {
    const loginLink = `${process.env.FRONTEND_URL}/auth/signin`;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: '⚠️ Akses Akun Psikolog & Instruksi Update Profil (1x24 Jam) - Oase Jiwa',
        html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:40px 0;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
                            <!-- Header -->
                            <tr>
                                <td style="background-color:#234463;padding:32px;text-align:center;">
                                    <h1 style="color:#ffffff;margin:0;font-size:24px;letter-spacing:1px;">Oase Jiwa</h1>
                                </td>
                            </tr>
                            <!-- Body -->
                            <tr>
                                <td style="padding:40px 48px;">
                                    <h2 style="color:#234463;font-size:20px;margin:0 0 16px;">Selamat Datang, ${fullName}!</h2>
                                    <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 16px;">
                                        Akun Anda telah resmi dibuatkan sebagai <strong>Psikolog Praktisi di Oase Jiwa</strong> oleh Administrator.
                                    </p>

                                    <!-- Card Kredensial -->
                                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef6fc;border-left:4px solid #234463;border-radius:6px;padding:16px 20px;margin:0 0 20px;">
                                        <tr>
                                            <td style="color:#234463;font-size:14px;line-height:1.8;">
                                                <strong>Email Login:</strong> ${email}<br/>
                                                <strong>Password Sementara:</strong> <span style="font-family:monospace;font-size:16px;font-weight:bold;color:#234463;background-color:#ffffff;padding:2px 8px;border-radius:4px;border:1px solid #cbd5e1;">${tempPassword}</span>
                                            </td>
                                        </tr>
                                    </table>

                                    <!-- Box Peringatan 1x24 Jam -->
                                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fffbe3;border:1px solid #fde68a;border-left:4px solid #f59e0b;border-radius:6px;padding:16px 20px;margin:0 0 24px;">
                                        <tr>
                                            <td style="color:#78350f;font-size:13px;line-height:1.6;">
                                                <strong style="color:#b45309;font-size:14px;">⚠️ PERINGATAN: WAJIB UPDATE PROFIL (1x24 JAM)</strong><br/>
                                                Status akun Anda saat ini adalah <strong>Menunggu Profil</strong>.<br/>
                                                Harap segera login dan melengkapi <strong>Foto Profil, No. SIPP/STR, Riwayat Pendidikan, serta Jadwal Praktik</strong> Anda dalam waktu maksimal <strong>1x24 Jam</strong>.<br/><br/>
                                                <em>Profil Anda baru akan otomatis berubah menjadi <strong>"Aktif"</strong> dan dapat melayani pasien di halaman publik Oase Jiwa setelah seluruh informasi profil dilengkapi.</em>
                                            </td>
                                        </tr>
                                    </table>

                                    <table cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
                                        <tr>
                                            <td style="background-color:#234463;border-radius:8px;padding:14px 32px;text-align:center;">
                                                <a href="${loginLink}" style="color:#ffffff;text-decoration:none;font-size:15px;font-weight:bold;">Login & Lengkapi Profil Sekarang</a>
                                            </td>
                                        </tr>
                                    </table>

                                    <p style="color:#999;font-size:13px;margin:24px 0 0;">
                                        Atau salin link berikut ke browser Anda:<br/>
                                        <a href="${loginLink}" style="color:#234463;word-break:break-all;">${loginLink}</a>
                                    </p>
                                </td>
                            </tr>
                            <!-- Footer -->
                            <tr>
                                <td style="background-color:#f4f6f8;padding:24px 48px;text-align:center;border-top:1px solid #e8eaed;">
                                    <p style="color:#999;font-size:12px;margin:0;">
                                        Email ini dikirim secara otomatis. Mohon jangan membalas email ini.<br/>
                                        &copy; ${new Date().getFullYear()} Oase Jiwa. Seluruh hak cipta dilindungi.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>`,
      });

      this.logger.log(`Psychologist credentials email successfully sent to ${email}`);
    } catch (error: any) {
      this.logger.error(`Failed to send psychologist credentials to ${email}`, error.stack);
    }
  }

  // =========================================================================
  // 2. Kirim Email Pengingat (Reminder) jika Psikolog Belum Melengkapi Profil
  // =========================================================================
  async sendPsychologistReminderEmail(email: string, fullName: string) {
    const loginLink = `${process.env.FRONTEND_URL}/auth/signin`;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: '📌 Pengingat: Segera Lengkapi Profil Psikolog Anda - Oase Jiwa',
        html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:40px 0;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
                            <!-- Header -->
                            <tr>
                                <td style="background-color:#234463;padding:32px;text-align:center;">
                                    <h1 style="color:#ffffff;margin:0;font-size:24px;letter-spacing:1px;">Oase Jiwa</h1>
                                </td>
                            </tr>
                            <!-- Body -->
                            <tr>
                                <td style="padding:40px 48px;">
                                    <h2 style="color:#234463;font-size:20px;margin:0 0 16px;">Halo, ${fullName}</h2>
                                    <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 16px;">
                                        Kami mendeteksi bahwa akun psikolog Anda di platform <strong>Oase Jiwa</strong> masih berstatus <strong>Menunggu Profil</strong>.
                                    </p>
                                    <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 24px;">
                                        Agar profil Anda dapat diaktifkan dan ditayangkan di halaman publik untuk menerima konsultasi pasien, mohon untuk segera login dan melengkapi biodata profesional Anda (SIPP, STR, Foto, Pendidikan, serta Jadwal Praktik).
                                    </p>

                                    <table cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
                                        <tr>
                                            <td style="background-color:#234463;border-radius:8px;padding:14px 32px;text-align:center;">
                                                <a href="${loginLink}" style="color:#ffffff;text-decoration:none;font-size:15px;font-weight:bold;">Lengkapi Profil Saya</a>
                                            </td>
                                        </tr>
                                    </table>

                                    <p style="color:#999;font-size:13px;margin:24px 0 0;">
                                        Atau salin link berikut ke browser Anda:<br/>
                                        <a href="${loginLink}" style="color:#234463;word-break:break-all;">${loginLink}</a>
                                    </p>
                                </td>
                            </tr>
                            <!-- Footer -->
                            <tr>
                                <td style="background-color:#f4f6f8;padding:24px 48px;text-align:center;border-top:1px solid #e8eaed;">
                                    <p style="color:#999;font-size:12px;margin:0;">
                                        Email ini dikirim secara otomatis. Mohon jangan membalas email ini.<br/>
                                        &copy; ${new Date().getFullYear()} Oase Jiwa. Seluruh hak cipta dilindungi.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>`,
      });

      this.logger.log(`Psychologist profile reminder email successfully sent to ${email}`);
    } catch (error: any) {
      this.logger.error(`Failed to send reminder email to ${email}`, error.stack);
    }
  }
}