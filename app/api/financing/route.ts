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

  const prequalLabel = prequal === 'approved' ? 'PRE-QUALIFIED' : prequal === 'denied' ? 'DID NOT PRE-QUALIFY' : 'Unknown';

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
========================================
CO-APPLICANT
========================================
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
========================================
NEW FINANCING APPLICATION — dykespower.com
========================================
Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}
Pre-Qualification Result: ${prequalLabel}

EQUIPMENT TO FINANCE
========================================
${equipment || 'Not specified'}

APPLICANT
========================================
${applicantBlock}

EMPLOYMENT
========================================
${employmentBlock}
${coBlock ? '\n' + coBlock : ''}
========================================
Enter this application into your preferred lender portal.
Reply to this email or call the applicant directly to follow up.
========================================
  `.trim();

  if (RESEND_API_KEY) {
    const subject = `Financing App: ${applicant.firstName} ${applicant.lastName} — ${prequalLabel}`;

    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'financing@dykespower.com',
        to: [
          'Casey@dykesmotors.com',
          'michaelbrooks@dykesmotors.com',
          'Nathanpace@dykesmotoros.com',
          'Justinpatterson@dykesmotors.com',
        ],
        reply_to: applicant.email,
        subject,
        text: emailBody,
      }),
    });

    if (!result.ok) console.error('Financing email send failed:', await result.text());
  } else {
    console.log('FINANCING APPLICATION (no email provider):\n', emailBody);
  }

  return NextResponse.json({ success: true });
}
