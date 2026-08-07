/**
 * SMTP bağlantısını ve gerçek bir gönderimi test eder.
 *
 * Kullanım (proje kökünde):
 *   node --env-file=.env.local scripts/test-smtp.mjs
 *
 * .env.local içinde SMTP_PASS dolu olmalı. Şifreyi komut satırına YAZMAYIN —
 * kabuk geçmişine düşer.
 */
import nodemailer from 'nodemailer';

const HOST = process.env.SMTP_HOST ?? 'smtp.office365.com';
const PORT = Number(process.env.SMTP_PORT ?? 587);
const USER = process.env.SMTP_USER ?? 'alim.demirli@abdkurumlari.com';
const PASS = process.env.SMTP_PASS;
const TO = process.env.MAIL_TO ?? USER;

if (!PASS) {
  console.error('✗ SMTP_PASS tanımlı değil. .env.local dosyasına ekleyin.');
  process.exit(1);
}

console.log(`→ ${HOST}:${PORT} adresine ${USER} olarak bağlanılıyor…`);

const transporter = nodemailer.createTransport({
  host: HOST,
  port: PORT,
  secure: PORT === 465,
  requireTLS: PORT !== 465,
  auth: { user: USER, pass: PASS },
  tls: { minVersion: 'TLSv1.2' },
  connectionTimeout: 10_000,
  logger: true,
});

try {
  await transporter.verify();
  console.log('✓ Bağlantı ve kimlik doğrulama başarılı.');
} catch (err) {
  console.error('✗ Bağlanılamadı:', err.message);
  console.error('  code:', err.code, '| responseCode:', err.responseCode);
  if (String(err.message).includes('535')) {
    console.error(
      '\n  535 = kimlik doğrulama reddedildi. Olası nedenler:\n' +
        '   • Hesapta MFA açık → uygulama parolası (app password) gerekli\n' +
        '   • Kiracıda SMTP AUTH kapalı → Microsoft 365 admin merkezinden\n' +
        '     ilgili kutu için "Authenticated SMTP" açılmalı\n' +
        '   • Security Defaults açık → basic auth engellenir'
    );
  }
  process.exit(1);
}

const info = await transporter.sendMail({
  from: `"Zekeriyaköy Fen Bilimleri" <${USER}>`,
  to: TO,
  subject: 'SMTP test — site formları',
  text: 'Bu bir test mesajıdır. Bunu gördüyseniz form gönderimleri çalışıyor.',
});

console.log(`✓ Test e-postası gönderildi → ${TO}`);
console.log('  messageId:', info.messageId);
console.log('  response :', info.response);
