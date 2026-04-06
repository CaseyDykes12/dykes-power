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

  // ââ ADF/XML lead format for Tecobi âââââââââââââââââââââââââââââââââ
  // Sent directly to Tecobi's ADF/XML ingest email (clientId 2692).
  // Tecobi parses this automatically and creates a lead record.
  const adfXml = `<?xml version="1.0" encoding="UTF-8"?>
<?adf version="1.0"?>
<adf>
  <prospect status="new">
    <requestdate>${new Date().toISOString()}</requestdate>
    <vehicle>
      <year></year>
      <make>Ferris</make>
      <model>${interest || 'General Inquiry'}</model>
    </vehicle>
    <customer>
      <contact>
        <name part="full">${escapeXml(name)}</name>
        <email>${escapeXml(email)}</email>
        ${phone ? `<phone type="voice">${escapeXml(phone)}</phone>` : ''}
      </contact>
      <comments>${escapeXml(
        [
          interest ? `Interested in: ${interest}` : '',
          propertySize ? `Property size: ${propertySize}` : '',
          message || '',
        ]
          .filter(Boolean)
          .join('\n')
      )}</comments>
    </customer>
    <vendor>
      <vendorname>Dykes Motors Power Equipment</vendorname>
      <url>https://www.dykespower.com</url>
    </vendor>
    <provider>
      <name part="full">Dykes Power Website</name>
      <url>https://www.dykespower.com/contact</url>
    </provider>
  </prospect>
</adf>`;

  // ââ Plain-text copy (backup notification to Casey) âââââââââââââââââ
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

  // ââ Send via Resend ââââââââââââââââââââââââââââââââââââââââââââââââ
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (RESEND_API_KEY) {
    // Send ADF/XML email directly to Tecobi
    const adfPromise = fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'leads@dykespower.com',
        to: 'adf_xml_2692@tecobirobot.com',
        reply_to: email,
        subject: `New Lead: ${name} â ${interest || 'General Inquiry'}`,
        text: adfXml,
      }),
    });

    // Send plain-text backup to Casey
    const backupPromise = fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'leads@dykespower.com',
        to: 'Casey@dykesmotors.com',
        reply_to: email,
        subject: `[DykesPower Lead] ${name} â ${interest || 'General Inquiry'}`,
        text: plainBody,
      }),
    });

    try {
      const [adfRes, backupRes] = await Promise.all([adfPromise, backupPromise]);

      if (!adfRes.ok) {
        const errBody = await adfRes.text();
        console.error('ADF email to Tecobi failed:', errBody);
      }
      if (!backupRes.ok) {
        const errBody = await backupRes.text();
        console.error('Backup email send failed:', errBody);
      }
    } catch (err) {
      console.error('Email send failed:', err);
    }
  } else {
    console.log('LEAD RECEIVED (no email provider configured):\n', plainBody);
    console.log('ADF/XML:\n', adfXml);
  }

  return NextResponse.json({ success: true });
}

// ââ Utility: escape special characters for XML âââââââââââââââââââââââ
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
