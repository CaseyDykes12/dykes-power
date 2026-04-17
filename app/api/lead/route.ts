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

  // ALWAYS dump the full lead into server logs so a lead is never truly lost,
  // even if Resend is down or mis-configured. These show up in Vercel runtime logs.
  console.warn('[LEAD-INCOMING]', JSON.stringify({ name, email, phone, interest, propertySize, message, timestamp }));

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.error('[LEAD-FAIL] RESEND_API_KEY is not set in Vercel environment. Lead captured above but email NOT sent.');
    return NextResponse.json(
      { success: false, error: 'email_not_configured' },
      { status: 500 }
    );
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
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

    if (!res.ok) {
      const errText = await res.text().catch(() => '(no body)');
      console.error('[LEAD-FAIL] Resend returned', res.status, errText);
      return NextResponse.json(
        { success: false, error: 'email_send_failed', status: res.status },
        { status: 500 }
      );
    }

    const data = await res.json().catch(() => null);
    console.log('[LEAD-OK] Resend accepted, id:', data?.id ?? '(unknown)');
    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('[LEAD-FAIL] Resend fetch threw:', err instanceof Error ? err.message : String(err));
    return NextResponse.json(
      { success: false, error: 'email_exception' },
      { status: 500 }
    );
  }
}
