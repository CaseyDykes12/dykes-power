import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, interest, propertySize, message } = body;

  if (!name || !email) {
    return NextResponse.json(
      { error: 'Name and email are required' },
      { status: 400 }
    );
  }

  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
  });

  const plainBody = `
New lead from dykespower.com

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Interested in: ${interest || 'Not specified'}
Property size: ${propertySize || 'Not provided'}
Message: ${message || 'No message'}

---
Submitted: ${timestamp}
`.trim();

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (RESEND_API_KEY) {
    const sendPromise = fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'leads@dykespower.com',
        to: [
          'Casey@dykesmotors.com',
          'michaelbrooks@dykesmotors.com',
          'Nathanpace@dykesmotoros.com',
          'Justinpatterson@dykesmotors.com',
        ],
        reply_to: email,
        subject: `[DykesPower Lead] ${name} — ${interest || 'General Inquiry'}`,
        text: plainBody,
      }),
    });

    sendPromise
      .then(async (res) => {
        if (!res.ok) console.error('Lead email send failed:', await res.text());
      })
      .catch((err) => console.error('Lead email send failed:', err));
  } else {
    console.log('LEAD RECEIVED (no email provider configured):\n', plainBody);
  }

  return NextResponse.json({ success: true });
}
