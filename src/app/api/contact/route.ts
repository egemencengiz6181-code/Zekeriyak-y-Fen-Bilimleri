import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// nodemailer Node API'lerine ihtiyaç duyar — Edge runtime'da çalışmaz.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Formların düşeceği kutu. */
const MAIL_TO = process.env.MAIL_TO ?? 'alim.demirli@abdkurumlari.com';

// ── Sağlayıcı 1: Resend (tercih edilen) ──────────────────────────────────────
// RESEND_API_KEY tanımlıysa e-posta Resend üzerinden gider. Microsoft 365'ten
// tamamen bağımsızdır; kiracıda SMTP AUTH kapalı olsa da çalışır.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_API_URL = process.env.RESEND_API_URL ?? 'https://api.resend.com/emails';
/** Resend'de DOĞRULANMIŞ alan adına ait bir adres olmak zorunda. */
const RESEND_FROM =
  process.env.MAIL_FROM ?? 'Zekeriyaköy Fen Bilimleri <bilgi@zekeriyakoyfenbilimleri.com>';

// ── Sağlayıcı 2: SMTP (yedek) ────────────────────────────────────────────────
const SMTP_HOST = process.env.SMTP_HOST ?? 'smtp.office365.com';
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 587);
const SMTP_USER = process.env.SMTP_USER ?? 'alim.demirli@abdkurumlari.com';
const SMTP_PASS = process.env.SMTP_PASS;

/**
 * SMTP'de gönderen, kimlik doğrulaması yapılan kutuyla AYNI olmak zorunda.
 * Microsoft 365, From başlığı oturum açan kullanıcıdan farklıysa
 * "5.7.60 Client does not have permissions to send as this sender" der.
 */
const SMTP_FROM = `"Zekeriyaköy Fen Bilimleri" <${SMTP_USER}>`;

const useResend = Boolean(RESEND_API_KEY);

/**
 * 587 STARTTLS demektir: bağlantı düz başlar, sonra TLS'e yükseltilir —
 * yani `secure: false` + `requireTLS: true`. `secure: true` yalnızca
 * 465 (implicit TLS) içindir; 587'de kullanılırsa el sıkışma takılır.
 */
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  requireTLS: SMTP_PORT !== 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  tls: { minVersion: 'TLSv1.2' },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000,
});

/**
 * Yapılandırılmış sağlayıcıyla e-posta gönderir.
 * Resend REST API'si tek bir POST olduğu için SDK bağımlılığı eklenmedi.
 */
async function deliver(opts: { subject: string; html: string; replyTo?: string }) {
  if (useResend) {
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [MAIL_TO],
        subject: opts.subject,
        html: opts.html,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      throw new Error(`Resend ${res.status}: ${detail.slice(0, 300)}`);
    }
    return;
  }

  await transporter.sendMail({
    from: SMTP_FROM,
    to: MAIL_TO,
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
  });
}

/** Formu dolduranın adresi geçerliyse yanıt oraya gitsin. */
function replyToFor(email: unknown): string | undefined {
  const v = typeof email === 'string' ? email.trim() : '';
  if (!v || v === 'form@landing.com') return undefined;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? v : undefined;
}

/** Kullanıcı girdisi e-posta HTML'ine gömülüyor; kaçışsız bırakmak
 *  gelen kutusunda HTML/markup enjeksiyonuna izin verirdi. */
function escapeHtml(value: unknown): string {
  if (value === null || value === undefined || value === '') return '—';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Çok satırlı metni HTML'de satır sonlarını koruyarak gösterir. */
function escapeMultiline(value: unknown): string {
  return escapeHtml(value).replace(/\n/g, '<br />');
}

export async function POST(req: NextRequest) {
  // Hiçbir sağlayıcı yapılandırılmamışsa nedenini açıkça logla.
  if (!useResend && !SMTP_PASS) {
    console.error(
      '[Contact API] E-posta sağlayıcısı yapılandırılmamış. Vercel → Project ' +
        'Settings → Environment Variables altına RESEND_API_KEY (önerilen) ' +
        'veya SMTP_PASS ekleyin.'
    );
    return NextResponse.json(
      { success: false, error: 'E-posta servisi yapılandırılmamış.' },
      { status: 500 }
    );
  }

  // Gönderim başarısız olursa loglayabilmek için catch'ten de erişilebilir olmalı.
  let payloadForRecovery: unknown = null;

  try {
    const body = await req.json();
    const { type, ...data } = body;
    payloadForRecovery = data;

    let subject = '';
    let html = '';

    if (type === 'analysis') {
      subject = `🔬 Yeni Analiz Talebi — ${data.path === 'existing' ? 'Markam Var' : 'Marka Kurmak İstiyorum'}`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #05010d; color: #f2f2f2; padding: 32px; border-radius: 16px; border: 1px solid #2d1b66;">
          <h1 style="color: #8b5cf6; font-size: 24px; margin-bottom: 24px;">🔬 Yeni Analiz Talebi</h1>
          <p style="color: #a3a3a3; margin-bottom: 24px;"><strong style="color: #f2f2f2;">Yol:</strong> ${data.path === 'existing' ? 'Markam Var' : 'Marka Kurmak İstiyorum'}</p>
          
          ${data.path === 'existing' ? `
          <h2 style="color: #8b5cf6; font-size: 16px; margin-top: 24px;">Mevcut Marka Bilgileri</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #a3a3a3; width: 140px;">Web Sitesi</td><td style="padding: 8px 0; color: #f2f2f2;">${escapeHtml(data.website)}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">Instagram</td><td style="padding: 8px 0; color: #f2f2f2;">${escapeHtml(data.instagram)}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">LinkedIn</td><td style="padding: 8px 0; color: #f2f2f2;">${escapeHtml(data.linkedin)}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">Ad Soyad</td><td style="padding: 8px 0; color: #f2f2f2;">${escapeHtml(data.name)}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">E-posta</td><td style="padding: 8px 0; color: #f2f2f2;">${escapeHtml(data.email)}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">Telefon</td><td style="padding: 8px 0; color: #f2f2f2;">${escapeHtml(data.phone)}</td></tr>
          </table>
          ` : `
          <h2 style="color: #8b5cf6; font-size: 16px; margin-top: 24px;">Yeni Marka Bilgileri</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #a3a3a3; width: 140px;">Sektör</td><td style="padding: 8px 0; color: #f2f2f2;">${escapeHtml(data.sector)}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">Proje Detayı</td><td style="padding: 8px 0; color: #f2f2f2;">${escapeHtml(data.projectDetail)}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">İstenen Hizmetler</td><td style="padding: 8px 0; color: #f2f2f2;">${escapeHtml((data.services || []).join(', '))}</td></tr>
          </table>
          `}
          
          <h2 style="color: #8b5cf6; font-size: 16px; margin-top: 24px;">Talep / Mesaj</h2>
          <p style="background: #1e1033; padding: 16px; border-radius: 8px; color: #f2f2f2; border-left: 3px solid #8b5cf6; white-space: pre-wrap;">${escapeMultiline(data.request)}</p>
          
          <hr style="border: none; border-top: 1px solid #2d1b66; margin: 32px 0;" />
          <p style="color: #4a4a4a; font-size: 12px;">Zekeriyaköy Fen Bilimleri — Ön Görüşme Sistemi</p>
        </div>
      `;
    } else {
      // LetsWork / genel iletişim / reklam formu.
      // Gönderen bir `subject` verdiyse (ör. /form landing sayfası) onu kullan —
      // böylece reklam başvuruları gelen kutusunda ayırt edilebiliyor.
      subject = data.subject
        ? `📝 ${data.subject}`
        : `💼 Yeni İletişim Mesajı — ${data.name || 'İsimsiz'}`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #05010d; color: #f2f2f2; padding: 32px; border-radius: 16px; border: 1px solid #2d1b66;">
          <h1 style="color: #8b5cf6; font-size: 24px; margin-bottom: 24px;">${data.subject ? '📝 ' + escapeHtml(String(data.subject)) : '💼 Yeni İletişim Mesajı'}</h1>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #a3a3a3; width: 120px;">Ad Soyad</td><td style="padding: 8px 0; color: #f2f2f2;">${escapeHtml(data.name)}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">E-posta</td><td style="padding: 8px 0; color: #f2f2f2;">${escapeHtml(data.email)}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">Telefon</td><td style="padding: 8px 0; color: #f2f2f2;">${escapeHtml(data.phone)}</td></tr>
          </table>
          <h2 style="color: #8b5cf6; font-size: 16px; margin-top: 24px;">Mesaj</h2>
          <p style="background: #1e1033; padding: 16px; border-radius: 8px; color: #f2f2f2; border-left: 3px solid #8b5cf6; white-space: pre-wrap;">${escapeMultiline(data.message)}</p>
          <hr style="border: none; border-top: 1px solid #2d1b66; margin: 32px 0;" />
          <p style="color: #4a4a4a; font-size: 12px;">Zekeriyaköy Fen Bilimleri — İletişim Sistemi</p>
        </div>
      `;
    }

    await deliver({
      // Satır sonları başlık enjeksiyonuna yol açabilir — tek satıra indir.
      subject: subject.replace(/[\r\n]+/g, ' ').slice(0, 200),
      html,
      replyTo: replyToFor(data.email),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    // Sunucu loglarında teşhis için yeterli bilgi bırak (anahtar/şifre HARİÇ).
    const e = err as { code?: string; responseCode?: number; message?: string };
    console.error('[Contact API] Gönderim hatası:', {
      provider: useResend ? 'resend' : 'smtp',
      code: e?.code,
      responseCode: e?.responseCode,
      message: e?.message,
      ...(useResend ? { from: RESEND_FROM } : { host: SMTP_HOST, port: SMTP_PORT, user: SMTP_USER }),
      to: MAIL_TO,
    });

    // GÜVENLİK AĞI: e-posta gidemediyse başvuru tamamen kaybolmasın.
    // Vercel → Deployments → Functions loglarından kurtarılabilir.
    // `removeConsole` prod'da console.error'ı korur, bu satır canlıda da çalışır.
    console.error(
      '[Contact API] GÖNDERİLEMEYEN BAŞVURU (log üzerinden kurtarın):',
      JSON.stringify(payloadForRecovery)
    );
    // Hata detayı istemciye sızdırılmaz (SMTP host/kimlik bilgisi içerebilir).
    return NextResponse.json(
      { success: false, error: 'E-posta gönderilemedi.' },
      { status: 500 }
    );
  }
}
