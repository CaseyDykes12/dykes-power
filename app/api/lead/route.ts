import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, interest, propertySize, message } = body;

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
  }

  // Send notification email via Resend (or fallback to mailto)
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO_EMAIL = 'Casey@dykesmotors.com';

  const emailBody = `
New lead from dykespower.com

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Interested in: ${interest || 'Not specified'}
Property size: ${propertySize || 'Not provided'}

Message:
${message || 'No message'}

---
Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}
  `.trim();

  if (RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'leads@dykespower.com',
          to: TO_EMAIL,
          reply_to: email,
          subject: `New Lead: ${name} — ${interest || 'General Inquiry'}`,
          text: emailBody,
        }),
      });
      if (!res.ok) throw new Error('Resend failed');
    } catch (err) {
      console.error('Email send failed:', err);
      // Don't fail the request — log it and continue
    }
  } else {
    // No email provider configured — log to console for now
    console.log('LEAD RECEIVED (no email provider configured):\n', emailBody);
  }

  return NextResponse.json({ success: true });
}
