/**
 * E-posta gönderimini uçtan uca test eder.
 *
 * Kullanım (proje kökünde):
 *   node --env-file=.env.local scripts/test-mail.mjs
 *
 * RESEND_API_KEY doluysa Resend, değilse SMTP denenir.
 * Kimlik bilgilerini komut satırına YAZMAYIN — .env.local kullanın.
 */
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const MAIL_TO = process.env.MAIL_TO ?? 'alim.demirli@abdkurumlari.com';
const MAIL_FROM =
  process.env.MAIL_FROM ?? 'Zekeriyaköy Fen Bilimleri <bilgi@zekeriyakoyfenbilimleri.com>';

const html = `<p>Bu bir <b>test</b> mesajıdır. Bunu gördüyseniz form gönderimleri çalışıyor.</p>`;

if (RESEND_API_KEY) {
  console.log(`→ Resend ile gönderiliyor…`);
  console.log(`  from: ${MAIL_FROM}`);
  console.log(`  to  : ${MAIL_TO}`);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: [MAIL_TO],
      subject: 'Test — site formları',
      html,
    }),
  });

  const body = await res.text();
  if (res.ok) {
    console.log('✓ Gönderildi:', body);
  } else {
    console.error(`✗ Resend ${res.status}:`, body);
    if (res.status === 401) {
      console.error('\n  401 = API anahtarı geçersiz. Resend → API Keys bölümünden yeni anahtar alın.');
    }
    if (res.status === 403 || /domain/i.test(body)) {
      console.error(
        '\n  Alan adı doğrulanmamış olabilir. Resend → Domains bölümünde\n' +
          `  "${MAIL_FROM.split('@').pop()?.replace('>', '')}" alan adı "Verified" görünmeli.`
      );
    }
    process.exit(1);
  }
} else {
  console.log('→ RESEND_API_KEY yok, SMTP deneniyor…');
  const nodemailer = (await import('nodemailer')).default;
  const HOST = process.env.SMTP_HOST ?? 'smtp.office365.com';
  const PORT = Number(process.env.SMTP_PORT ?? 587);
  const USER = process.env.SMTP_USER ?? 'alim.demirli@abdkurumlari.com';
  const PASS = process.env.SMTP_PASS;

  if (!PASS) {
    console.error('✗ Ne RESEND_API_KEY ne SMTP_PASS tanımlı. .env.local dosyasını doldurun.');
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: PORT === 465,
    requireTLS: PORT !== 465,
    auth: { user: USER, pass: PASS },
    tls: { minVersion: 'TLSv1.2' },
  });

  try {
    await transporter.verify();
    const info = await transporter.sendMail({
      from: `"Zekeriyaköy Fen Bilimleri" <${USER}>`,
      to: MAIL_TO,
      subject: 'Test — site formları',
      html,
    });
    console.log('✓ Gönderildi:', info.messageId);
  } catch (err) {
    console.error('✗ SMTP hatası:', err.message);
    if (String(err.message).includes('5.7.139') || String(err.message).includes('535')) {
      console.error(
        '\n  Kiracıda SMTP AUTH kapalı. Microsoft 365 Admin Center →\n' +
          '  Kullanıcılar → ilgili kutu → Posta → E-posta uygulamalarını yönet →\n' +
          '  "Authenticated SMTP" açılmalı. Ya da Resend kullanın (önerilen).'
      );
    }
    process.exit(1);
  }
}
