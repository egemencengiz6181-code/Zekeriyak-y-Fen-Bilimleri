import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'mail.reneedesignlab.com',
  port: 465,
  secure: true,
  auth: {
    user: 'egemen.cengiz@reneedesignlab.com',
    pass: 'Renee1999**',
  },
});

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
            <tr><td style="padding: 8px 0; color: #a3a3a3; width: 140px;">Web Sitesi</td><td style="padding: 8px 0; color: #f2f2f2;">${data.website || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">Instagram</td><td style="padding: 8px 0; color: #f2f2f2;">${data.instagram || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">LinkedIn</td><td style="padding: 8px 0; color: #f2f2f2;">${data.linkedin || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">Ad Soyad</td><td style="padding: 8px 0; color: #f2f2f2;">${data.name || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">E-posta</td><td style="padding: 8px 0; color: #f2f2f2;">${data.email || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">Telefon</td><td style="padding: 8px 0; color: #f2f2f2;">${data.phone || '—'}</td></tr>
          </table>
          ` : `
          <h2 style="color: #8b5cf6; font-size: 16px; margin-top: 24px;">Yeni Marka Bilgileri</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #a3a3a3; width: 140px;">Sektör</td><td style="padding: 8px 0; color: #f2f2f2;">${data.sector || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">Proje Detayı</td><td style="padding: 8px 0; color: #f2f2f2;">${data.projectDetail || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">İstenen Hizmetler</td><td style="padding: 8px 0; color: #f2f2f2;">${(data.services || []).join(', ') || '—'}</td></tr>
          </table>
          `}
          
          <h2 style="color: #8b5cf6; font-size: 16px; margin-top: 24px;">Talep / Mesaj</h2>
          <p style="background: #1e1033; padding: 16px; border-radius: 8px; color: #f2f2f2; border-left: 3px solid #8b5cf6;">${data.request || '—'}</p>
          
          <hr style="border: none; border-top: 1px solid #2d1b66; margin: 32px 0;" />
          <p style="color: #4a4a4a; font-size: 12px;">Renee DesignLab — Analiz Sistemi</p>
        </div>
      `;
    } else {
      // LetsWork / general contact
      subject = `💼 Yeni İletişim Mesajı — ${data.name || 'İsimsiz'}`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #05010d; color: #f2f2f2; padding: 32px; border-radius: 16px; border: 1px solid #2d1b66;">
          <h1 style="color: #8b5cf6; font-size: 24px; margin-bottom: 24px;">💼 Yeni İletişim Mesajı</h1>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #a3a3a3; width: 120px;">Ad Soyad</td><td style="padding: 8px 0; color: #f2f2f2;">${data.name || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">E-posta</td><td style="padding: 8px 0; color: #f2f2f2;">${data.email || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">Telefon</td><td style="padding: 8px 0; color: #f2f2f2;">${data.phone || '—'}</td></tr>
          </table>
          <h2 style="color: #8b5cf6; font-size: 16px; margin-top: 24px;">Mesaj</h2>
          <p style="background: #1e1033; padding: 16px; border-radius: 8px; color: #f2f2f2; border-left: 3px solid #8b5cf6;">${data.message || '—'}</p>
          <hr style="border: none; border-top: 1px solid #2d1b66; margin: 32px 0;" />
          <p style="color: #4a4a4a; font-size: 12px;">Renee DesignLab — İletişim Sistemi</p>
        </div>
      `;
    }

    await transporter.sendMail({
      from: '"Renee DesignLab Web" <egemen.cengiz@reneedesignlab.com>',
      to: 'egemen.cengiz@reneedesignlab.com',
      subject,
      html,
    });

    console.log('[Contact API] Email sent:', subject, data);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact API] Error:', err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
