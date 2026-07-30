import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * İletişim / başvuru formu e-posta ucu.
 *
 * DÜZELTME: alıcı adresi ve marka adı önceden başka bir kuruma
 * (`sirinevlerfinalozelogretim@abdkurumlari.com` / "Şirinevler Final
 * Dershanesi") sabit kodlanmıştı — bu sitedeki tüm form gönderimleri yanlış
 * kutuya gidiyordu. Artık env değişkeniyle yönetiliyor, varsayılan doğru adres.
 */

const BRAND = 'Bahçelievler Sevinç Dershanesi';
const TO_ADDRESS = process.env.CONTACT_TO ?? 'bahcelievlersevinckurs@gmail.com';
const FROM_ADDRESS = process.env.CONTACT_FROM ?? process.env.SMTP_USER ?? TO_ADDRESS;

const ACCENT = '#E35205';

/** Kullanıcı girdisi e-posta HTML'ine gömüldüğü için kaçış zorunlu. */
function esc(value: unknown): string {
  const s = value === undefined || value === null || value === '' ? '—' : String(value);
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label: string, value: unknown): string {
  return `<tr>
    <td style="padding:8px 0;color:#6b7280;width:150px;vertical-align:top;">${esc(label)}</td>
    <td style="padding:8px 0;color:#111827;">${esc(value)}</td>
  </tr>`;
}

function wrap(heading: string, inner: string): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;color:#111827;padding:32px;border-radius:16px;border:1px solid #e5e7eb;">
    <h1 style="color:${ACCENT};font-size:22px;margin:0 0 24px;">${esc(heading)}</h1>
    ${inner}
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0 16px;" />
    <p style="color:#9ca3af;font-size:12px;margin:0;">${esc(BRAND)} — web sitesi form bildirimi</p>
  </div>`;
}

function block(title: string, text: unknown): string {
  return `<h2 style="color:${ACCENT};font-size:15px;margin:24px 0 8px;">${esc(title)}</h2>
    <p style="background:#fdf3ee;padding:16px;border-radius:8px;color:#111827;border-left:3px solid ${ACCENT};margin:0;white-space:pre-wrap;">${esc(text)}</p>`;
}

function buildEmail(type: string, data: Record<string, unknown>): { subject: string; html: string } {
  if (type === 'analysis') {
    const isExisting = data.path === 'existing';
    const pathLabel = isExisting ? 'Öğrencim kayıtlı / bilgi almak istiyorum' : 'Yeni kayıt düşünüyorum';
    const details = isExisting
      ? row('Web / Referans', data.website) + row('Ad Soyad', data.name) + row('E-posta', data.email) + row('Telefon', data.phone)
      : row('Sınıf / Seviye', data.sector) +
        row('Detay', data.projectDetail) +
        row('İlgi Alanları', Array.isArray(data.services) ? data.services.join(', ') : data.services) +
        row('Ad Soyad', data.name) +
        row('E-posta', data.email) +
        row('Telefon', data.phone);

    return {
      subject: `🎓 Yeni Ön Görüşme Talebi — ${data.name || 'İsimsiz'}`,
      html: wrap(
        '🎓 Yeni Ön Görüşme Talebi',
        `<p style="color:#6b7280;margin:0 0 16px;"><strong style="color:#111827;">Durum:</strong> ${esc(pathLabel)}</p>
         <table style="width:100%;border-collapse:collapse;">${details}</table>
         ${block('Talep / Mesaj', data.request)}`,
      ),
    };
  }

  if (type === 'landing') {
    return {
      subject: `📣 Reklam Formu — ${data.studentName || data.name || 'İsimsiz'}`,
      html: wrap(
        '📣 Reklam Kampanyası Başvurusu',
        `<table style="width:100%;border-collapse:collapse;">
          ${row('Öğrenci', data.studentName)}
          ${row('Veli', data.parentName)}
          ${row('Telefon', data.phone)}
          ${row('E-posta', data.email)}
          ${row('Gelecek Yıl Sınıfı', data.grade)}
          ${row('Mevcut Okulu', data.school)}
          ${row('İlçe', data.district)}
          ${row('İlgilendiği Program', data.program)}
        </table>
        ${data.note ? block('Ek Not', data.note) : ''}`,
      ),
    };
  }

  // Genel iletişim (contact sayfası + LetsWork bölümü)
  return {
    subject: `💬 Yeni İletişim Mesajı — ${data.name || 'İsimsiz'}`,
    html: wrap(
      '💬 Yeni İletişim Mesajı',
      `<table style="width:100%;border-collapse:collapse;">
        ${row('Ad Soyad', data.name)}
        ${row('E-posta', data.email)}
        ${row('Telefon', data.phone)}
        ${data.subject ? row('Konu', data.subject) : ''}
      </table>
      ${block('Mesaj', data.message)}`,
    ),
  };
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Geçersiz istek.' }, { status: 400 });
  }

  const { type, ...data } = body as { type?: string } & Record<string, unknown>;

  // En azından bir iletişim kanalı zorunlu — boş spam gönderimlerini keser
  const hasContact = Boolean(data.email || data.phone);
  if (!data.name && !data.studentName) {
    return NextResponse.json({ success: false, error: 'İsim zorunlu.' }, { status: 400 });
  }
  if (!hasContact) {
    return NextResponse.json(
      { success: false, error: 'E-posta veya telefon zorunlu.' },
      { status: 400 },
    );
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('[Contact API] SMTP_USER / SMTP_PASS tanımlı değil.');
    return NextResponse.json(
      { success: false, error: 'E-posta servisi yapılandırılmamış.' },
      { status: 500 },
    );
  }

  const { subject, html } = buildEmail(type ?? 'contact', data);

  try {
    // Transporter istek başına kuruluyor — modül seviyesinde tutulduğunda
    // serverless örnekleri arasında kopuk bağlantı taşınabiliyor.
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${BRAND}" <${FROM_ADDRESS}>`,
      to: TO_ADDRESS,
      replyTo: typeof data.email === 'string' && data.email ? data.email : undefined,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    // Form içeriğini loglamıyoruz (kişisel veri).
    console.error('[Contact API] Gönderim hatası:', err instanceof Error ? err.message : err);
    return NextResponse.json({ success: false, error: 'Gönderilemedi.' }, { status: 500 });
  }
}
