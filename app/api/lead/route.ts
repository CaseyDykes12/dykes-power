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
          'Nathanpace@dykesmotors.com',
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

    // Fire an ADF XML lead to Tecobi (clientId 2692) for every lead, phone or not.
    // Phone is optional per ADF spec; Tecobi will follow up via email when phone is missing.
    const adfXml = buildAdfXml({ name, email, phone: phone || '', interest, propertySize, message });
    try {
      const tecobiRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'leads@dykespower.com',
          to: ['adf_xml_2692@tecobirobot.com'],
          reply_to: email,
          subject: `ADF Lead - ${name} - ${interest || 'Dykes Power'}`,
          text: adfXml,
        }),
      });
      if (!tecobiRes.ok) {
        const errText = await tecobiRes.text().catch(() => '(no body)');
        console.error('[LEAD-TECOBI-FAIL]', tecobiRes.status, errText);
      } else {
        console.log('[LEAD-TECOBI-OK] ADF XML accepted by Resend for Tecobi');
      }
    } catch (tecErr) {
      console.error('[LEAD-TECOBI-FAIL] threw:', tecErr instanceof Error ? tecErr.message : String(tecErr));
    }

    // Dual-write: also POST to DM Command Center (Tecobi replacement, currently
    // shadowing). Best-effort, non-blocking. Tecobi remains the source of truth
    // until cutover; if DM Command is down, the customer experience is unaffected.
    void postToDmCommand(adfXml);

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('[LEAD-FAIL] Resend fetch threw:', err instanceof Error ? err.message : String(err));
    return NextResponse.json(
      { success: false, error: 'email_exception' },
      { status: 500 }
    );
  }
}

async function postToDmCommand(adfXml: string): Promise<void> {
  const base = process.env.DM_COMMAND_BASE_URL;
  const token = process.env.ADF_INTAKE_TOKEN;
  if (!base || !token) {
    // Pre-cutover defense: skip silently if env isn't wired yet.
    console.warn('[LEAD-DMCC-SKIP] DM_COMMAND_BASE_URL or ADF_INTAKE_TOKEN not set');
    return;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8_000);
  try {
    const res = await fetch(`${base}/api/motors/adf?tenant=dykes-motors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
        'x-adf-token': token,
      },
      body: adfXml,
      signal: controller.signal,
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '(no body)');
      console.error('[LEAD-DMCC-FAIL]', res.status, errText);
      return;
    }
    const data = await res.json().catch(() => null);
    console.log('[LEAD-DMCC-OK] lead_id:', data?.lead_id ?? '(unknown)', 'existing:', data?.existing ?? false);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[LEAD-DMCC-FAIL] threw:', msg);
  } finally {
    clearTimeout(timer);
  }
}

function xmlEscape(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildAdfXml(p: {
  name: string;
  email: string;
  phone: string;
  interest?: string;
  propertySize?: string;
  message?: string;
}): string {
  const now = new Date().toISOString();
  const comments = [
    p.interest ? `Interest: ${p.interest}` : '',
    p.propertySize ? `Property size: ${p.propertySize}` : '',
    p.message ? `Message: ${p.message}` : '',
  ]
    .filter(Boolean)
    .join(' | ');
  const phoneLine = p.phone && p.phone.trim().length > 0
    ? `        <phone>${xmlEscape(p.phone)}</phone>\n`
    : '';
  return `<?xml version="1.0"?>
<?adf version="1.0"?>
<adf>
  <prospect>
    <requestdate>${xmlEscape(now)}</requestdate>
    <customer>
      <contact>
        <name part="full">${xmlEscape(p.name)}</name>
        <email>${xmlEscape(p.email)}</email>
${phoneLine}      </contact>
      <comments>${xmlEscape(comments)}</comments>
    </customer>
    <vendor>
      <vendorname>Dykes Motors Power Equipment</vendorname>
      <contact>
        <name part="full">Dykes Motors Power Equipment</name>
      </contact>
    </vendor>
    <provider>
      <name part="full">dykespower.com</name>
      <service>Website Lead Form</service>
    </provider>
  </prospect>
</adf>`;
}
