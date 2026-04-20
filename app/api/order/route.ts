import { NextRequest, NextResponse } from 'next/server';

interface OrderItem {
  name: string;
  sku: string;
  price: number;
  quantity: number;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

interface Body {
  mode: 'order' | 'deposit' | 'quote';
  paypalOrderId?: string;
  customer: Customer;
  shipping: { method: string; fee: number };
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  productName?: string;
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { mode, paypalOrderId, customer, shipping, items, subtotal, tax, total, productName } = body;

  if (!customer?.name || !customer?.email || !customer?.phone) {
    return NextResponse.json(
      { error: 'Customer name, email, phone required' },
      { status: 400 }
    );
  }
  if (!items?.length) {
    return NextResponse.json({ error: 'No items' }, { status: 400 });
  }

  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
  });

  const subjectPrefix =
    mode === 'deposit'
      ? '[Dykes Power DEPOSIT]'
      : mode === 'quote'
        ? '[Dykes Power QUOTE REQUEST]'
        : '[Dykes Power ORDER]';

  const headerLine =
    mode === 'deposit'
      ? `$1,000 deposit received to reserve ${productName ?? 'equipment'}`
      : mode === 'quote'
        ? `Freight quote requested — no payment taken yet`
        : `New paid order from dykespower.com`;

  const itemsBlock = items
    .map(
      (i) =>
        `  • ${i.quantity} × ${i.name} (SKU ${i.sku}) — $${(i.price * i.quantity).toFixed(2)}`
    )
    .join('\n');

  const addressBlock =
    shipping.method === 'pickup'
      ? 'PICKUP at 3069 Hwy 49, Collins MS 39428'
      : `${customer.street}\n${customer.city}, ${customer.state} ${customer.zip}`;

  const ownerEmail = `
${headerLine}

${paypalOrderId ? `PayPal Order ID: ${paypalOrderId}` : 'No payment taken (quote request)'}
${mode === 'order' || mode === 'deposit' ? 'STATUS: PAID' : 'STATUS: AWAITING QUOTE'}

CUSTOMER
Name:  ${customer.name}
Email: ${customer.email}
Phone: ${customer.phone}

SHIPPING
Method: ${shipping.method}
Fee:    $${shipping.fee.toFixed(2)}
Address:
${addressBlock}

ITEMS
${itemsBlock}

TOTALS
Subtotal: $${subtotal.toFixed(2)}
Tax:      $${tax.toFixed(2)}
Shipping: $${shipping.fee.toFixed(2)}
Total:    $${total.toFixed(2)}

---
Submitted: ${timestamp}
`.trim();

  const customerSubject =
    mode === 'deposit'
      ? `Deposit confirmed — ${productName ?? 'your reservation'} at Dykes Motors Power Equipment`
      : mode === 'quote'
        ? `We received your freight quote request — Dykes Motors Power Equipment`
        : `Order confirmed — Dykes Motors Power Equipment`;

  const customerBody =
    mode === 'deposit'
      ? `
Hi ${customer.name.split(' ')[0]},

Your $1,000 deposit is in. We're holding ${productName ?? 'your machine'} for you.

What happens next:
  1. We'll call you within 1 business day to confirm pickup or delivery.
  2. Final balance is due at pickup or before delivery.
  3. We service every machine before it leaves the lot.

Reservation total paid today: $${total.toFixed(2)}

Questions? Call (601) 909-5380.

— Dykes Motors Power Equipment
3069 Hwy 49, Collins MS 39428
`.trim()
      : mode === 'quote'
        ? `
Hi ${customer.name.split(' ')[0]},

Thanks — we got your request. Because your order includes large equipment, we ship by freight and need to give you an exact quote before charging your card.

We'll call ${customer.phone} within 1 business day with the freight cost and total.

Items requested:
${itemsBlock}

Subtotal (before freight + tax): $${subtotal.toFixed(2)}

Questions? Call (601) 909-5380.

— Dykes Motors Power Equipment
3069 Hwy 49, Collins MS 39428
`.trim()
        : `
Hi ${customer.name.split(' ')[0]},

Thanks for your order. Here's your confirmation.

Order ID: ${paypalOrderId ?? 'pending'}

ITEMS
${itemsBlock}

Subtotal: $${subtotal.toFixed(2)}
Tax:      $${tax.toFixed(2)}
Shipping: $${shipping.fee.toFixed(2)}
TOTAL:    $${total.toFixed(2)}

${
  shipping.method === 'pickup'
    ? `PICKUP — We'll call when your order is ready (usually within 1 business day) at our Collins, MS location.`
    : shipping.method === 'local'
      ? `LOCAL DELIVERY — Our driver will call ${customer.phone} to schedule a delivery window within 2 business days.`
      : `SHIPPING — Your order ships within 1–3 business days via UPS/FedEx Ground. You'll get tracking by email.`
}

Questions? Call (601) 909-5380.

— Dykes Motors Power Equipment
3069 Hwy 49, Collins MS 39428
`.trim();

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (RESEND_API_KEY) {
    const ownerPromise = fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'orders@dykespower.com',
        to: 'Casey@dykesmotors.com',
        reply_to: customer.email,
        subject: `${subjectPrefix} ${customer.name} — $${total.toFixed(2)}`,
        text: ownerEmail,
      }),
    });

    const customerPromise = fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'orders@dykespower.com',
        to: customer.email,
        reply_to: 'Casey@dykesmotors.com',
        subject: customerSubject,
        text: customerBody,
      }),
    });

    Promise.all([ownerPromise, customerPromise])
      .then(async ([ownerRes, customerRes]) => {
        if (!ownerRes.ok) console.error('Owner email failed:', await ownerRes.text());
        if (!customerRes.ok) console.error('Customer email failed:', await customerRes.text());
      })
      .catch((err) => console.error('Order email send failed:', err));
  } else {
    console.log('ORDER RECEIVED (no email provider configured):\n', ownerEmail);
  }

  return NextResponse.json({ success: true, paypalOrderId });
}
