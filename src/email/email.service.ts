import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';
import * as fs from 'fs';

// Interface untuk kemudahan passing data booking
export interface BookingEmailData {
  bookingCode: string;
  userEmail: string;
  userName: string;
  psychologistEmail: string;
  psychologistName: string;
  serviceName: string;
  scheduledDate: string;
  scheduledTime: string;
  totalPrice: number;
  dpAmount: number;
  notes?: string;
  rejectionReason?: string;
  newScheduledDate?: string;
  newScheduledTime?: string;
  userPhone?: string;
  paymentMethod?: string;
  adminFee?: number;
}

// Palet warna & tipografi terpusat agar seluruh email konsisten
const THEME = {
  navy: '#1e3a8a',
  navyDark: '#152a63',
  ink: '#1e293b',
  body: '#475569',
  muted: '#64748b',
  faint: '#94a3b8',
  border: '#e2e8f0',
  borderSoft: '#f1f5f9',
  bgPage: '#eef2f7',
  bgCard: '#ffffff',
  bgSubtle: '#f8fafc',
  success: '#15803d',
  successBg: '#dcfce7',
  warning: '#92400e',
  warningBg: '#fef3c7',
  warningBorder: '#fde68a',
  danger: '#991b1b',
  dangerBg: '#fef2f2',
  dangerBorder: '#fecaca',
  info: '#0369a1',
  infoBg: '#f0f9ff',
  infoBorder: '#bae6fd',
  font: "'Poppins','Segoe UI',Helvetica,Arial,sans-serif",
};

type BoxTone = 'warning' | 'info' | 'danger' | 'success';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private mailerService: MailerService) {}

  /**
   * Helper untuk melampirkan file logo Oase Jiwa dari folder proyek
   */
  private getLogoAttachment() {
    const relativeFrontendPath = path.join(
      process.cwd(),
      '..',
      'oasejiwa-frontend',
      'public',
      'assets',
      'oasejiwalogo.png',
    );
    const backendPublicPath = path.join(
      process.cwd(),
      'public',
      'assets',
      'oasejiwalogo.png',
    );
    const explicitPath =
      'C:\\Users\\ADINDA OKTA\\magang\\oasejiwa-frontend\\public\\assets\\oasejiwalogo.png';

    let finalPath = '';

    if (fs.existsSync(relativeFrontendPath)) {
      finalPath = relativeFrontendPath;
    } else if (fs.existsSync(backendPublicPath)) {
      finalPath = backendPublicPath;
    } else if (fs.existsSync(explicitPath)) {
      finalPath = explicitPath;
    } else {
      this.logger.warn('File logo oasejiwalogo.png tidak ditemukan.');
      return [];
    }

    return [
      {
        filename: 'oasejiwalogo.png',
        path: finalPath,
        cid: 'oasejiwa_logo',
        contentDisposition: 'inline',
      },
    ];
  }

  // ===========================================================================
  // KOMPONEN-KOMPONEN EMAIL YANG DAPAT DIPAKAI ULANG (agar tampilan konsisten)
  // ===========================================================================

  /** Tombol CTA utama, selalu dengan gaya & spacing yang sama */
  private getButton(label: string, url: string): string {
    return `
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:8px 0 16px;">
        <tr>
          <td align="center">
            <a href="${url}" target="_blank"
              style="background-color:${THEME.navy};color:#ffffff;text-decoration:none;font-size:13px;
              font-weight:600;padding:11px 26px;border-radius:8px;display:inline-block;
              letter-spacing:0.2px;">
              ${label}
            </a>
          </td>
        </tr>
      </table>`;
  }

  /** Tombol WhatsApp Admin Khusus */
  private getWhatsAppButton(bookingCode: string): string {
    const waNumber = process.env.ADMIN_WA_NUMBER || '6281313888830';
    const message = encodeURIComponent(
      `Halo Admin Oase Jiwa, saya ingin bertanya mengenai booking #${bookingCode}`,
    );
    const waUrl = `https://wa.me/${waNumber}?text=${message}`;

    return `
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:12px 0 4px;">
        <tr>
          <td align="center">
            <a href="${waUrl}" target="_blank"
              style="background-color:#25d366;color:#ffffff;text-decoration:none;font-size:12px;
              font-weight:700;padding:9px 20px;border-radius:8px;display:inline-block;
              letter-spacing:0.2px;">
              💬 Hubungi WhatsApp Admin
            </a>
          </td>
        </tr>
      </table>`;
  }

  /** Kotak callout berwarna (warning/info/danger/success) dengan gaya konsisten */
  private getInfoBox(tone: BoxTone, html: string): string {
    const palette: Record<
      BoxTone,
      { bg: string; border: string; accent: string; text: string }
    > = {
      warning: {
        bg: THEME.warningBg,
        border: THEME.warningBorder,
        accent: '#d97706',
        text: THEME.warning,
      },
      info: {
        bg: THEME.infoBg,
        border: THEME.infoBorder,
        accent: '#0284c7',
        text: THEME.info,
      },
      danger: {
        bg: THEME.dangerBg,
        border: THEME.dangerBorder,
        accent: '#dc2626',
        text: THEME.danger,
      },
      success: {
        bg: THEME.successBg,
        border: '#bbf7d0',
        accent: '#16a34a',
        text: THEME.success,
      },
    };
    const c = palette[tone];

    return `
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
        style="background-color:${c.bg};border:1px solid ${c.border};border-left:3px solid ${c.accent};
        border-radius:8px;margin-bottom:18px;">
        <tr>
          <td style="padding:12px 14px;color:${c.text};font-size:12px;line-height:1.55;">
            ${html}
          </td>
        </tr>
      </table>`;
  }

  /** Kartu data ringkas berlabel-nilai, dipakai untuk rincian booking/psikolog dsb */
  private getInfoCard(
    rows: Array<[string, string]>,
    accent = THEME.navy,
  ): string {
    const tr = rows
      .map(
        ([label, value]) => `
        <tr>
          <td style="padding:4px 0;color:${THEME.muted};font-size:12px;width:42%;">${label}</td>
          <td style="padding:4px 0;color:${THEME.ink};font-size:12px;font-weight:600;text-align:right;">${value}</td>
        </tr>`,
      )
      .join('');

    return `
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
        style="background-color:${THEME.bgSubtle};border:1px solid ${THEME.border};border-left:3px solid ${accent};
        border-radius:8px;margin-bottom:18px;">
        <tr>
          <td style="padding:14px 14px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">${tr}</table>
          </td>
        </tr>
      </table>`;
  }

  /** Badge status kecil berbentuk pill */
  private getBadge(
    text: string,
    tone: 'success' | 'warning' | 'danger' = 'success',
  ): string {
    const palette = {
      success: { bg: THEME.successBg, text: THEME.success },
      warning: { bg: THEME.warningBg, text: '#b45309' },
      danger: { bg: THEME.dangerBg, text: THEME.danger },
    }[tone];
    return `<span style="background-color:${palette.bg};color:${palette.text};font-size:10.5px;font-weight:700;
      padding:4px 12px;border-radius:20px;display:inline-block;letter-spacing:0.2px;">${text}</span>`;
  }

  /** Garis pemisah tipis yang konsisten */
  private getDivider(): string {
    return `<hr style="border:none;border-top:1px solid ${THEME.borderSoft};margin:18px 0;" />`;
  }

  /** Link fallback teks polos di bawah tombol CTA */
  private getPlainLinkFallback(url: string): string {
    return `
      <p style="color:${THEME.faint};font-size:11px;margin:0;line-height:1.5;">
        Jika tombol di atas tidak berfungsi, salin tautan berikut ke browser Anda:<br/>
        <a href="${url}" style="color:#2563eb;word-break:break-all;">${url}</a>
      </p>`;
  }

  /**
   * Template Utama HTML Email Oase Jiwa
   */
  private getBaseEmailTemplate(
    title: string,
    bodyContent: string,
    eyebrow?: string,
  ): string {
    const currentYear = new Date().getFullYear();

    return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="color-scheme" content="light">
      <title>${title}</title>
    </head>
    <body style="margin:0;padding:0;background-color:${THEME.bgPage};font-family:${THEME.font};-webkit-font-smoothing:antialiased;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:${THEME.bgPage};padding:28px 12px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
              style="max-width:520px;background-color:${THEME.bgCard};border-radius:14px;overflow:hidden;
              box-shadow:0 4px 18px rgba(15,23,42,0.06);border:1px solid ${THEME.border};">

              <!-- Accent bar -->
              <tr>
                <td style="background:linear-gradient(90deg,${THEME.navy},#2563eb);height:4px;line-height:4px;font-size:0;">&nbsp;</td>
              </tr>

              <!-- Header dengan Logo Berukuran Kecil (85px) -->
              <tr>
                <td style="background-color:#ffffff;padding:22px 20px 16px;text-align:center;border-bottom:1px solid ${THEME.borderSoft};">
                  <img src="cid:oasejiwa_logo" alt="Oase Jiwa" width="85" style="max-width:85px;height:auto;display:block;margin:0 auto;border:0;outline:none;" />
                  <p style="color:${THEME.muted};font-size:10.5px;margin:6px 0 0;font-weight:500;letter-spacing:0.3px;">Kenali Dirimu, Pulihkan Jiwamu</p>
                </td>
              </tr>

              ${
                eyebrow
                  ? `<tr>
                      <td style="background-color:${THEME.bgSubtle};text-align:center;padding:8px 20px;border-bottom:1px solid ${THEME.borderSoft};">
                        <span style="color:${THEME.navy};font-size:10.5px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;">${eyebrow}</span>
                      </td>
                    </tr>`
                  : ''
              }

              <!-- Content Body -->
              <tr>
                <td style="padding:24px 22px 20px;">
                  ${bodyContent}
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color:${THEME.bgSubtle};padding:20px 20px;text-align:center;border-top:1px solid ${THEME.border};">
                  <p style="color:${THEME.navy};font-size:12px;font-weight:700;margin:0 0 3px;">Biro Psikologi Oase Jiwa</p>
                  <p style="color:${THEME.muted};font-size:10px;margin:0 0 10px;line-height:1.5;">
                    Perumahan d'Soeta Residence D No. 1, Desa Tegalgondo, Kec. Karangploso, Kab. Malang
                  </p>
                  <p style="color:${THEME.faint};font-size:9.5px;margin:0;line-height:1.6;">
                    Email ini dikirim secara otomatis. Mohon jangan membalas email ini.<br/>
                    &copy; ${currentYear} Oase Jiwa. Seluruh hak cipta dilindungi.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>`;
  }

  // =========================================================================
  // 1. Kirim Email Reset Password
  // =========================================================================
  async sendPasswordResetEmail(email: string, token: string) {
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;

    const bodyContent = `
      <h2 style="color:${THEME.ink};font-size:16px;font-weight:700;margin:0 0 10px;">Permintaan Reset Password</h2>
      <p style="color:${THEME.body};font-size:12px;line-height:1.6;margin:0 0 18px;">Halo,</p>
      <p style="color:${THEME.body};font-size:12px;line-height:1.6;margin:0 0 18px;">
        Kami menerima permintaan untuk mereset password akun Oase Jiwa Anda. Klik tombol di bawah ini untuk membuat password baru.
      </p>

      ${this.getButton('Reset Password Saya', resetLink)}

      ${this.getInfoBox('warning', `<strong>⏱ Tautan Terbatas:</strong> Link ini hanya berlaku selama <strong>15 menit</strong>. Jika Anda tidak merasa meminta reset password, abaikan email ini.`)}

      ${this.getPlainLinkFallback(resetLink)}
    `;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Reset Password - Oase Jiwa',
        html: this.getBaseEmailTemplate('Reset Password Oase Jiwa', bodyContent, 'Keamanan Akun'),
        attachments: this.getLogoAttachment(),
      });

      this.logger.log(`Reset password email sent to ${email}`);
    } catch (error: any) {
      this.logger.error(`Failed to send reset password email to ${email}`, error.stack);
    }
  }

  // =========================================================================
  // 2. Kirim Email Verifikasi Registrasi Akun
  // =========================================================================
  async sendVerificationEmail(email: string, token: string) {
    const verifyLink = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`;

    const bodyContent = `
      <h2 style="color:${THEME.ink};font-size:16px;font-weight:700;margin:0 0 10px;">Verifikasi Alamat Email Anda</h2>
      <p style="color:${THEME.body};font-size:12px;line-height:1.6;margin:0 0 10px;">Selamat Datang! 👋</p>
      <p style="color:${THEME.body};font-size:12px;line-height:1.6;margin:0 0 18px;">
        Terima kasih telah mendaftar di <strong>Oase Jiwa</strong>. Tinggal satu langkah lagi untuk mengaktifkan akun Anda dan mulai mengakses layanan konseling &amp; kesehatan mental kami.
      </p>

      ${this.getButton('Verifikasi Email Saya', verifyLink)}

      ${this.getInfoBox('info', `Tautan verifikasi ini hanya berlaku selama <strong>24 jam</strong>. Jika Anda tidak merasa mendaftar di Oase Jiwa, silakan abaikan email ini.`)}

      ${this.getPlainLinkFallback(verifyLink)}
    `;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Verifikasi Alamat Email Anda - Oase Jiwa',
        html: this.getBaseEmailTemplate('Verifikasi Email Oase Jiwa', bodyContent, 'Aktivasi Akun'),
        attachments: this.getLogoAttachment(),
      });

      this.logger.log(`Verification email sent to ${email}`);
    } catch (error: any) {
      this.logger.error(`Failed to send verification email to ${email}`, error.stack);
    }
  }

  // =========================================================================
  // 3. Kirim Email Kredensial untuk Psikolog Baru
  // =========================================================================
  async sendPsychologistCredentials(email: string, fullName: string, tempPassword: string) {
    const loginLink = `${process.env.FRONTEND_URL}/auth/signin`;

    const bodyContent = `
      <h2 style="color:${THEME.ink};font-size:16px;font-weight:700;margin:0 0 10px;">Selamat Datang, ${fullName}! 🎉</h2>
      <p style="color:${THEME.body};font-size:12px;line-height:1.6;margin:0 0 14px;">
        Akun Anda telah resmi dibuatkan sebagai <strong>Psikolog Praktisi di Oase Jiwa</strong> oleh Administrator.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
        style="background-color:${THEME.bgSubtle};border:1px solid ${THEME.border};border-left:3px solid ${THEME.navy};
        border-radius:8px;padding:14px;margin-bottom:18px;">
        <tr>
          <td>
            <p style="color:${THEME.muted};font-size:10.5px;margin:0 0 3px;text-transform:uppercase;letter-spacing:0.4px;">Email Login</p>
            <p style="color:${THEME.ink};font-size:12px;font-weight:600;margin:0 0 10px;">${email}</p>
            <p style="color:${THEME.muted};font-size:10.5px;margin:0 0 3px;text-transform:uppercase;letter-spacing:0.4px;">Password Sementara</p>
            <span style="font-family:'Courier New',monospace;font-size:14px;font-weight:700;color:${THEME.navy};
              background-color:#ffffff;padding:4px 10px;border-radius:5px;border:1px solid ${THEME.border};display:inline-block;">
              ${tempPassword}
            </span>
          </td>
        </tr>
      </table>

      ${this.getInfoBox(
        'warning',
        `<strong>⚠️ Wajib Update Profil (1x24 Jam)</strong><br/><br/>
         Harap segera login dan lengkapi <strong>Foto Profil, No. SIPP/STR, Riwayat Pendidikan, serta Jadwal Praktik</strong> Anda.<br/>
         <em>Profil akan otomatis berubah menjadi "Aktif" setelah seluruh informasi dilengkapi.</em>`,
      )}

      ${this.getButton('Login &amp; Lengkapi Profil Sekarang', loginLink)}

      ${this.getPlainLinkFallback(loginLink)}
    `;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Akses Akun Psikolog & Instruksi Update Profil (1x24 Jam) - Oase Jiwa',
        html: this.getBaseEmailTemplate('Akses Akun Psikolog - Oase Jiwa', bodyContent, 'Akun Psikolog'),
        attachments: this.getLogoAttachment(),
      });

      this.logger.log(`Psychologist credentials email successfully sent to ${email}`);
    } catch (error: any) {
      this.logger.error(`Failed to send psychologist credentials to ${email}`, error.stack);
    }
  }

  // =========================================================================
  // 4. Kirim Email Pengingat Kelengkapan Profil Psikolog
  // =========================================================================
  async sendPsychologistReminderEmail(email: string, fullName: string) {
    const loginLink = `${process.env.FRONTEND_URL}/auth/signin`;

    const bodyContent = `
      <h2 style="color:${THEME.ink};font-size:16px;font-weight:700;margin:0 0 10px;">Halo, ${fullName} 👋</h2>
      <p style="color:${THEME.body};font-size:12px;line-height:1.6;margin:0 0 10px;">
        Kami mendeteksi bahwa akun psikolog Anda di platform <strong>Oase Jiwa</strong> masih berstatus <strong>Menunggu Profil</strong>.
      </p>
      <p style="color:${THEME.body};font-size:12px;line-height:1.6;margin:0 0 18px;">
        Agar profil Anda dapat ditayangkan di halaman publik untuk menerima jadwal konsultasi pasien, mohon segera login dan lengkapi biodata profesional Anda.
      </p>

      ${this.getButton('Lengkapi Profil Saya', loginLink)}

      ${this.getPlainLinkFallback(loginLink)}
    `;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Pengingat: Segera Lengkapi Profil Psikolog Anda - Oase Jiwa',
        html: this.getBaseEmailTemplate('Pengingat Profil Psikolog - Oase Jiwa', bodyContent, 'Pengingat'),
        attachments: this.getLogoAttachment(),
      });

      this.logger.log(`Psychologist profile reminder email successfully sent to ${email}`);
    } catch (error: any) {
      this.logger.error(`Failed to send reminder email to ${email}`, error.stack);
    }
  }

  // =========================================================================
  // 5. NOTIFIKASI PENGAJUAN BOOKING BARU (USER & PSIKOLOG - STATUS PENDING)
  // =========================================================================
  async sendNewBookingEmails(data: BookingEmailData) {
    const formattedPrice = `Rp ${data.totalPrice.toLocaleString('id-ID')}`;
    const frontendUrl = process.env.FRONTEND_URL || 'https://oasejiwa.id';
    const profileBookingsUrl = `${frontendUrl}/userprofile`;

    // --- A. Email ke PASIEN (Status PENDING: Menunggu Validasi Bukti Pembayaran Admin) ---
    const userBody = `
      <h2 style="color:${THEME.ink};font-size:17px;font-weight:700;margin:0 0 10px;">Pengajuan Booking Berhasil Dibuat! ⏳</h2>
      <p style="color:${THEME.body};font-size:12.5px;line-height:1.6;margin:0 0 16px;">
        Halo <strong>${data.userName}</strong>, terima kasih telah mengajukan jadwal konseling di Biro Psikologi Oase Jiwa. Pengajuan booking Anda telah kami terima dan saat ini <strong>sedang menunggu verifikasi pembayaran oleh tim Admin</strong>.
      </p>

      ${this.getInfoCard([
        ['Kode Booking', `<span style="color:${THEME.navy};">${data.bookingCode}</span>`],
        ['Layanan', data.serviceName],
        ['Psikolog', data.psychologistName],
        ['Jadwal yang Diajukan', `<span style="color:#0284c7;font-weight:bold;">${data.scheduledDate} (${data.scheduledTime} WIB)</span>`],
        ['Total Biaya', formattedPrice],
      ])}

      ${this.getInfoBox(
        'warning',
        `<strong>📌 Langkah Selanjutnya:</strong><br/>
        1. Tim Admin kami akan memvalidasi bukti pembayaran Anda dalam waktu <strong>1x24 jam</strong>.<br/>
        2. Setelah pembayaran divalidasi, Anda akan menerima <strong>email konfirmasi resmi beserta struk pembayaran</strong>.<br/>
        3. Anda dapat memantau status pesanan secara berkala melalui menu <strong>Riwayat Booking</strong> di profil akun Anda.`,
      )}

      ${this.getButton('Cek Riwayat Booking di Web', profileBookingsUrl)}

      <!-- KOTAK BANTUAN WA ADMIN -->
      <div style="background-color:${THEME.bgSubtle};border:1px solid ${THEME.border};border-radius:10px;padding:14px;text-align:center;margin-top:16px;">
        <p style="color:${THEME.muted};font-size:11px;margin:0 0 4px;">
          Butuh konfirmasi lebih cepat atau ingin bertanya kepada Admin? Silakan hubungi:
        </p>
        ${this.getWhatsAppButton(data.bookingCode)}
      </div>
    `;

    // --- B. Email ke PSIKOLOG (Pemberitahuan Ada Pengajuan Booking Masuk) ---
    const psychBody = `
      <h2 style="color:${THEME.ink};font-size:17px;font-weight:700;margin:0 0 10px;">Pengajuan Jadwal Konsultasi Baru 🗓️</h2>
      <p style="color:${THEME.body};font-size:12.5px;line-height:1.6;margin:0 0 16px;">
        Halo <strong>${data.psychologistName}</strong>, terdapat pengajuan jadwal konsultasi baru dari pasien yang sedang menunggu proses verifikasi pembayaran:
      </p>

      ${this.getInfoCard(
        [
          ['Nama Pasien', data.userName],
          ['Kode Booking', data.bookingCode],
          ['Layanan', data.serviceName],
          ['Jadwal yang Diajukan', `<span style="color:#0284c7;font-weight:bold;">${data.scheduledDate} (${data.scheduledTime} WIB)</span>`],
          ...(data.notes ? ([['Catatan Pasien', data.notes]] as Array<[string, string]>) : []),
        ],
        '#0284c7',
      )}

      ${this.getInfoBox(
        'info',
        'Jadwal ini akan resmi dikonfirmasi setelah bukti pembayaran divalidasi oleh Administrator.',
      )}
    `;

    try {
      await Promise.all([
        this.mailerService.sendMail({
          to: data.userEmail,
          subject: `[Oase Jiwa] Pengajuan Booking #${data.bookingCode} - Menunggu Validasi Pembayaran`,
          html: this.getBaseEmailTemplate('Pengajuan Booking Konsultasi', userBody, 'Menunggu Validasi'),
          attachments: this.getLogoAttachment(),
        }),
        this.mailerService.sendMail({
          to: data.psychologistEmail,
          subject: `[Oase Jiwa] Pengajuan Booking Baru #${data.bookingCode}`,
          html: this.getBaseEmailTemplate('Pengajuan Booking Baru', psychBody, 'Booking Masuk'),
          attachments: this.getLogoAttachment(),
        }),
      ]);
      this.logger.log(`Pending booking notification emails sent for #${data.bookingCode}`);
    } catch (error: any) {
      this.logger.error(`Failed to send pending booking emails for #${data.bookingCode}`, error.stack);
    }
  }

  // =========================================================================
  // 6. NOTIFIKASI BOOKING DI-APPROVE ADMIN (NOTA / STRUK DIGITAL & JADWAL FIX)
  // =========================================================================
  async sendBookingApprovalEmail(data: BookingEmailData) {
    const adminFee = data.adminFee ?? 0;
    const totalTagihan = data.totalPrice + adminFee;
    const remainingAmount = data.totalPrice - data.dpAmount;

    const formattedPrice = `IDR ${data.totalPrice.toLocaleString('id-ID')}`;
    const formattedDp = `IDR ${data.dpAmount.toLocaleString('id-ID')}`;
    const formattedAdminFee = `IDR ${adminFee.toLocaleString('id-ID')}`;
    const formattedTotalTagihan = `IDR ${totalTagihan.toLocaleString('id-ID')}`;
    const formattedRemaining = `IDR ${remainingAmount.toLocaleString('id-ID')}`;

    const paidAt = new Date().toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // --- A. BODY EMAIL UNTUK USER (STRUK DP & KONFIRMASI JADWAL FIX) ---
    const userBody = `
      <!-- KARTU STRUK / NOTA DIGITAL -->
      <div style="background-color:${THEME.bgCard};border:1px solid ${THEME.border};border-radius:12px;padding:22px 20px;margin-bottom:16px;">

        <!-- HEADER NOTA (TOTAL & STATUS) -->
        <div style="text-align:center;padding-bottom:16px;border-bottom:1px dashed ${THEME.border};margin-bottom:16px;">
          <p style="color:${THEME.faint};font-size:10.5px;margin:0 0 4px;">Total DP Diterima</p>
          <h1 style="color:${THEME.ink};font-size:26px;font-weight:800;margin:0 0 12px;letter-spacing:-0.5px;">${formattedDp}</h1>

          ${this.getBadge('Pembayaran Valid', 'success')}

          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:14px;font-size:11.5px;color:${THEME.body};">
            <tr>
              <td align="left" style="padding:3px 0;">Status Transaksi</td>
              <td align="right" style="padding:3px 0;font-weight:600;color:#16a34a;">Berhasil Divalidasi</td>
            </tr>
            <tr>
              <td align="left" style="padding:3px 0;">ID Pesanan</td>
              <td align="right" style="padding:3px 0;font-weight:600;color:${THEME.ink};">${data.bookingCode}</td>
            </tr>
            <tr>
              <td align="left" style="padding:3px 0;">Metode Bayar</td>
              <td align="right" style="padding:3px 0;font-weight:600;color:${THEME.ink};">${data.paymentMethod || 'Transfer Bank'}</td>
            </tr>
          </table>
        </div>

        <p style="color:${THEME.ink};font-size:12px;margin:0 0 6px;">Dear <strong>${data.userName}</strong>,</p>
        <p style="color:${THEME.muted};font-size:11.5px;line-height:1.6;margin:0 0 16px;">
          Pembayaran DP Anda telah berhasil kami verifikasi. Jadwal sesi konsultasi Anda kini telah <strong>resmi terkonfirmasi</strong>.
        </p>

        <!-- RINCIAN PEMBAYARAN DP -->
        <p style="color:${THEME.ink};font-size:11.5px;font-weight:700;margin:0 0 6px;">Rincian Pembayaran</p>
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:11.5px;color:${THEME.body};margin-bottom:16px;">
          <tr>
            <td align="left" style="padding:3px 0;">Uang Muka (DP 50%)</td>
            <td align="right" style="padding:3px 0;font-weight:600;color:${THEME.ink};">${formattedDp}</td>
          </tr>
          <tr>
            <td align="left" style="padding:3px 0;">Waktu Divalidasi</td>
            <td align="right" style="padding:3px 0;font-weight:600;color:${THEME.ink};">${paidAt}</td>
          </tr>
        </table>

        ${this.getDivider()}

        <!-- RINCIAN PESANAN & JADWAL -->
        <p style="color:${THEME.ink};font-size:11.5px;font-weight:700;margin:0 0 8px;">Rincian Sesi Konsultasi</p>
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:11.5px;color:${THEME.body};margin-bottom:16px;">
          <tr>
            <td align="left" style="padding:3px 0;">Layanan</td>
            <td align="right" style="padding:3px 0;font-weight:600;color:${THEME.ink};">${data.serviceName}</td>
          </tr>
          <tr>
            <td align="left" style="padding:3px 0;">Psikolog</td>
            <td align="right" style="padding:3px 0;font-weight:600;color:${THEME.ink};">${data.psychologistName}</td>
          </tr>
          <tr>
            <td align="left" style="padding:3px 0;">Jadwal Konsultasi</td>
            <td align="right" style="padding:3px 0;font-weight:600;color:${THEME.navy};">${data.scheduledDate} (${data.scheduledTime})</td>
          </tr>
          <tr>
            <td align="left" style="padding:3px 0;">Biaya Admin</td>
            <td align="right" style="padding:3px 0;font-weight:600;color:${THEME.ink};">${formattedAdminFee}</td>
          </tr>
          <tr>
            <td align="left" style="padding:8px 0 0;font-weight:700;color:${THEME.ink};border-top:1px solid ${THEME.borderSoft};">Total Biaya Sesi</td>
            <td align="right" style="padding:8px 0 0;font-weight:800;color:${THEME.ink};border-top:1px solid ${THEME.borderSoft};">${formattedTotalTagihan}</td>
          </tr>
        </table>

        ${this.getInfoBox('warning', `<strong>Sisa Pelunasan:</strong> ${formattedRemaining} &ndash; mohon dilunasi sebelum sesi berlangsung.<br/>⏰ Harap <strong>hadir 10 menit sebelum sesi dimulai</strong>.`)}

        <!-- INFORMASI PELANGGAN -->
        <p style="color:${THEME.ink};font-size:11.5px;font-weight:700;margin:0 0 6px;">Informasi Pelanggan</p>
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:11.5px;color:${THEME.body};">
          <tr>
            <td align="left" style="padding:3px 0;">Nama Lengkap</td>
            <td align="right" style="padding:3px 0;font-weight:600;color:${THEME.ink};">${data.userName}</td>
          </tr>
          <tr>
            <td align="left" style="padding:3px 0;">Nomor HP / WA</td>
            <td align="right" style="padding:3px 0;font-weight:600;color:${THEME.ink};">${data.userPhone || '-'}</td>
          </tr>
          <tr>
            <td align="left" style="padding:3px 0;">Email</td>
            <td align="right" style="padding:3px 0;font-weight:600;color:${THEME.ink};">${data.userEmail}</td>
          </tr>
        </table>
      </div>

      <!-- FOOTER BANTUAN WA ADMIN -->
      <div style="background-color:${THEME.bgSubtle};border:1px solid ${THEME.border};border-radius:10px;padding:14px;text-align:center;">
        <p style="color:${THEME.muted};font-size:11px;margin:0 0 4px;">
          Untuk informasi lebih lanjut atau bantuan mengenai sesi Anda, silakan hubungi WhatsApp Admin Oase Jiwa:
        </p>
        ${this.getWhatsAppButton(data.bookingCode)}
      </div>
    `;

    // --- B. BODY EMAIL UNTUK PSIKOLOG ---
    const psychBody = `
      <h2 style="color:${THEME.ink};font-size:17px;font-weight:700;margin:0 0 10px;">Konfirmasi Jadwal Konsultasi Baru 🗓️</h2>
      <p style="color:${THEME.body};font-size:12.5px;line-height:1.6;margin:0 0 16px;">
        Halo <strong>${data.psychologistName}</strong>, pembayaran DP pasien telah divalidasi oleh Admin. Jadwal konsultasi berikut telah <strong>resmi dikonfirmasi</strong>:
      </p>

      ${this.getInfoCard(
        [
          ['Kode Booking', `<span style="color:${THEME.navy};">${data.bookingCode}</span>`],
          ['Nama Pasien', data.userName],
          ['Layanan', data.serviceName],
          ['Jadwal Konsultasi', `<span style="color:#16a34a;font-weight:bold;">${data.scheduledDate} (${data.scheduledTime})</span>`],
          ...(data.notes ? ([['Catatan Pasien', data.notes]] as Array<[string, string]>) : []),
        ],
        '#16a34a',
      )}

      ${this.getInfoBox('info', 'Mohon untuk bersiap dan hadir tepat waktu sesuai dengan jadwal di atas.')}
    `;

    try {
      await Promise.all([
        this.mailerService.sendMail({
          to: data.userEmail,
          subject: `Terima kasih atas pembayaran Anda - Oase Jiwa #${data.bookingCode}`,
          html: this.getBaseEmailTemplate('Nota Pembayaran Oase Jiwa', userBody, 'Booking Dikonfirmasi'),
          attachments: this.getLogoAttachment(),
        }),
        this.mailerService.sendMail({
          to: data.psychologistEmail,
          subject: `[Oase Jiwa] Jadwal Konsultasi Baru Terkonfirmasi #${data.bookingCode}`,
          html: this.getBaseEmailTemplate('Jadwal Konsultasi Terkonfirmasi', psychBody, 'Jadwal Fix'),
          attachments: this.getLogoAttachment(),
        }),
      ]);

      this.logger.log(`Approval receipt emails sent for #${data.bookingCode}`);
    } catch (error: any) {
      this.logger.error(`Failed to send approval receipt emails for #${data.bookingCode}`, error.stack);
    }
  }

  // =========================================================================
  // 7. NOTIFIKASI BOOKING DI-REJECT / DIBATALKAN
  // =========================================================================
  async sendBookingRejectionEmails(data: BookingEmailData) {
    const userBody = `
      <h2 style="color:${THEME.danger};font-size:17px;font-weight:700;margin:0 0 10px;">Pemberitahuan Pembatalan Booking ❌</h2>
      <p style="color:${THEME.body};font-size:12.5px;line-height:1.6;margin:0 0 16px;">
        Halo <strong>${data.userName}</strong>, mohon maaf booking konsultasi Anda dengan kode <strong>${data.bookingCode}</strong> tidak dapat kami proses.
      </p>

      ${this.getInfoBox('danger', `<strong>Alasan Pembatalan:</strong> ${data.rejectionReason || 'Jadwal berbenturan / Bukti pembayaran tidak sesuai.'}`)}

      <p style="color:${THEME.muted};font-size:11.5px;line-height:1.6;margin:0 0 14px;">
        Jika Anda membutuhkan bantuan lebih lanjut, silakan hubungi Customer Service kami via WhatsApp.
      </p>

      ${this.getWhatsAppButton(data.bookingCode)}
    `;

    try {
      await this.mailerService.sendMail({
        to: data.userEmail,
        subject: `[Oase Jiwa] Pembatalan Booking #${data.bookingCode}`,
        html: this.getBaseEmailTemplate('Pembatalan Booking', userBody, 'Booking Dibatalkan'),
        attachments: this.getLogoAttachment(),
      });
      this.logger.log(`Rejection email sent for #${data.bookingCode}`);
    } catch (error: any) {
      this.logger.error(`Failed to send rejection email for #${data.bookingCode}`, error.stack);
    }
  }

  // =========================================================================
  // 8. NOTIFIKASI RESCHEDULE JADWAL
  // =========================================================================
  async sendRescheduleEmails(data: BookingEmailData) {
    const userBody = `
      <h2 style="color:${THEME.ink};font-size:17px;font-weight:700;margin:0 0 10px;">Jadwal Konsultasi Diperbarui 🔄</h2>
      <p style="color:${THEME.body};font-size:12.5px;line-height:1.6;margin:0 0 16px;">
        Halo <strong>${data.userName}</strong>, perubahan jadwal untuk booking <strong>${data.bookingCode}</strong> telah berhasil diproses.
      </p>

      ${this.getInfoCard(
        [
          ['Psikolog', data.psychologistName],
          ['Jadwal Baru', `<span style="color:#2563eb;">${data.newScheduledDate} (${data.newScheduledTime})</span>`],
        ],
        '#2563eb',
      )}

      ${this.getInfoBox('info', '⏰ <strong>Imbauan:</strong> Mohon untuk <strong>hadir 10 menit sebelum sesi dimulai</strong>.')}

      <div style="background-color:${THEME.bgSubtle};border:1px solid ${THEME.border};border-radius:10px;padding:14px;text-align:center;margin-top:14px;">
        <p style="color:${THEME.muted};font-size:11px;margin:0 0 4px;">
          Untuk informasi lebih lanjut mengenai perubahan jadwal Anda, silakan hubungi WhatsApp Admin:
        </p>
        ${this.getWhatsAppButton(data.bookingCode)}
      </div>
    `;

    try {
      await this.mailerService.sendMail({
        to: data.userEmail,
        subject: `[Oase Jiwa] Perubahan Jadwal Booking #${data.bookingCode}`,
        html: this.getBaseEmailTemplate('Reschedule Jadwal', userBody, 'Jadwal Diperbarui'),
        attachments: this.getLogoAttachment(),
      });
      this.logger.log(`Reschedule email sent for #${data.bookingCode}`);
    } catch (error: any) {
      this.logger.error(`Failed to send reschedule email for #${data.bookingCode}`, error.stack);
    }
  }
}