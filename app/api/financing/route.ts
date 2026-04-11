import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { applicant, employment, coApplicant, coEmployment, equipment, prequal } = body;

  if (!applicant?.firstName || !applicant?.lastName || !applicant?.ssn || !applicant?.dob) {
    return NextResponse.json({ error: 'Missing required applicant fields' }, { status: 400 });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  const fmt = (label: string, value: string | undefined) =>
    `${label.padEnd(28)} ${value || '—'}`;

  const prequalLabel = prequal === 'approved' ? '✅ PRE-QUALIFIED' : prequal === 'denied' ? '❌ DID NOT PRE-QUALIFY' : 'Unknown';

  const applicantBlock = `
${fmt('First Name:', applicant.firstName)}
${fmt('Last Name:', applicant.lastName)}
${fmt('Date of Birth:', applicant.dob)}
${fmt('SSN:', applicant.ssn)}
${fmt('Address:', applicant.address)}
${fmt('City / State / Zip:', `${applicant.city}, ${applicant.state} ${applicant.zip}`)}
${fmt('Years at Address:', applicant.yearsAtAddress)}
${fmt('Residence Type:', applicant.residenceType)}
${fmt('Monthly Housing Pmt:', applicant.monthlyHousingPayment ? `$${applicant.monthlyHousingPayment}` : '—')}
${fmt('Phone:', applicant.phone)}
${fmt('Email:', applicant.email)}
`.trim();

  const employmentBlock = `
${fmt('Employment Status:', employment.status)}
${fmt('Employer:', employment.employerName || '—')}
${fmt('Monthly Gross Income:', employment.monthlyIncome ? `$${employment.monthlyIncome}` : '—')}
`.trim();

  const coBlock = coApplicant?.firstName ? `
════════════════════════════════════════
CO-APPLICANT
════════════════════════════════════════
${fmt('First Name:', coApplicant.firstName)}
${fmt('Last Name:', coApplicant.lastName)}
${fmt('Date of Birth:', coApplicant.dob)}
${fmt('SSN:', coApplicant.ssn)}
${fmt('Address:', coApplicant.address)}
${fmt('City / State / Zip:', `${coApplicant.city}, ${coApplicant.state} ${coApplicant.zip}`)}
${fmt('Years at Address:', coApplicant.yearsAtAddress)}
${fmt('Residence Type:', coApplicant.residenceType)}
${fmt('Monthly Housing Pmt:', coApplicant.monthlyHousingPayment ? `$${coApplicant.monthlyHousingPayment}` : '—')}
${fmt('Phone:', coApplicant.phone)}
${fmt('Email:', coApplicant.email)}

${fmt('Employment Status:', coEmployment?.status || '—')}
${fmt('Employer:', coEmployment?.employerName || '—')}
${fmt('Monthly Gross Income:', coEmployment?.monthlyIncome ? `$${coEmployment.monthlyIncome}` : '—')}
`.trim() : '';

  const emailBody = `
════════════════════════════════════════
NEW FINANCING APPLICATION — dykespower.com
════════════════════════════════════════
Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}
Pre-Qualification Result: ${prequalLabel}

EQUIPMENT TO FINANCE
════════════════════════════════════════
${equipment || 'Not specified'}

APPLICANT
════════════════════════════════════════
${applicantBlock}

EMPLOYMENT
════════════════════════════════════════
${employmentBlock}
${coBlock ? '\n' + coBlock : ''}
════════════════════════════════════════
Enter this application into your preferred lender portal.
Reply to this email or call the applicant directly to follow up.
════════════════════════════════════════
  `.trim();

  // ADF/XML lead for Tecobi
  const now = new Date().toISOString().replace('Z', '-06:00');
  const fullName = `${applicant.firstName} ${applicant.lastName}`;
  const comments = [
    `Financing application submitted via dykespower.com.`,
    `Equipment: ${equipment || 'Not specified'}.`,
    `Pre-qualification result: ${prequalLabel}.`,
    coApplicant?.firstName ? `Co-applicant: ${coApplicant.firstName} ${coApplicant.lastName}.` : '',
  ].filter(Boolean).join(' ');

  const adfXml = `<?xml version="1.0" encoding="UTF-8"?>
<?adf version="1.0"?>
<adf>
  <prospect>
    <requestdate>${now}</requestdate>
    <vehicle interest="buy" status="new">
      <year></year>
      <make>Ferris</make>
      <model>${equipment || 'Power Equipment'}</model>
    </vehicle>
    <customer>
      <contact>
        <name part="full">${fullName}</name>
        <phone type="voice" time="day">${applicant.phone || ''}</phone>
        <email>${applicant.email || ''}</email>
      </contact>
      <timeframe>immediate</timeframe>
      <comments>${comments}</comments>
    </customer>
    <vendor>
      <vendorname>Dykes Motors Power Equipment</vendorname>
      <contact>
        <name part="full">Dykes Motors</name>
        <email>info@dykesmotors.com</email>
        <phone>6016415475</phone>
      </contact>
    </vendor>
    <provider>
      <name>dykespower.com</name>
      <service>Financing Application</service>
    </provider>
  </prospect>
</adf>`;

  if (RESEND_API_KEY) {
    const subject = `Financing App: ${applicant.firstName} ${applicant.lastName} — ${prequalLabel}`;

    const sends = [
      // Full application to staff
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'financing@dykespower.com',
          to: [
            'michaelbrooks@dykesmotors.com',
            'Justinpatterson@dykesmotors.com',
            'Nathanpace@dykesmotoros.com',
          ],
          reply_to: applicant.email,
          subject,
          text: emailBody,
        }),
      }),
      // ADF/XML lead to Tecobi
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'financing@dykespower.com',
          to: ['adf_xml_2692@tecobirobot.com'],
          subject: `New Lead: ${fullName}`,
          text: adfXml,
        }),
      }),
    ];

    const results = await Promise.allSettled(sends);
    results.forEach((r, i) => {
      if (r.status === 'rejected') console.error(`Email send ${i} failed:`, r.reason);
    });
  } else {
    console.log('FINANCING APPLICATION (no email provider):\n', emailBody);
    console.log('ADF XML:\n', adfXml);
  }

  return NextResponse.json({ success: true });
}
