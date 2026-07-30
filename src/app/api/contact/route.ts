import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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
  try {
    const body = await req.json();
    const { type, ...data } = body;

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

    await transporter.sendMail({
      from: '"Zekeriyaköy Fen Bilimleri" <zekeriyakoyfenbilimleri@gmail.com>',
      to: 'zekeriyakoyfenbilimleri@gmail.com',
      // Satır sonları başlık enjeksiyonuna yol açabilir — tek satıra indir.
      subject: subject.replace(/[\r\n]+/g, ' ').slice(0, 200),
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact API] Error:', err);
    // Hata detayı istemciye sızdırılmaz (SMTP host/kimlik bilgisi içerebilir).
    return NextResponse.json(
      { success: false, error: 'E-posta gönderilemedi.' },
      { status: 500 }
    );
  }
}
