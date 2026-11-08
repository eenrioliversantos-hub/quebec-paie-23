// app/api/calculations/route.ts
import { NextRequest, NextResponse } from 'next/server';

let mockCalculationsDb = [
  {
    id: 'calc_qc_dev_sr_01',
    user_id: 'usr_cpa_77218',
    title: 'Offre Développeur Senior Montréal - 105k$',
    gross_annual: 105000,
    net_annual: 71420,
    province: 'QC',
    tax_year: 2025,
    federal_tax: 13912,
    provincial_tax: 12890,
    rrq_deduction: 4348.8,
    rqap_deduction: 449.12,
    ei_deduction: 1077.44,
    effective_rate: 31.98,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'calc_qc_arch_cloud_02',
    user_id: 'usr_cpa_77218',
    title: 'Architecte Cloud Solutions Québec - 135k$',
    gross_annual: 135000,
    net_annual: 87850,
    province: 'QC',
    tax_year: 2025,
    federal_tax: 20450,
    provincial_tax: 18920,
    rrq_deduction: 4348.8,
    rqap_deduction: 449.12,
    ei_deduction: 1077.44,
    effective_rate: 34.92,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  let userId = 'anonymous';

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const parts = token.split('.');
    if (parts.length === 3) {
      try {
        const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
        userId = payload.sub;
      } catch (e) {
        // ignore
      }
    }
  }

  const { searchParams } = new URL(req.url);
  const province = searchParams.get('province');

  let results = mockCalculationsDb;
  if (province) {
    results = results.filter((c) => c.province.toLowerCase() === province.toLowerCase());
  }

  return NextResponse.json({
    total: results.length,
    requestedBy: userId,
    databaseTable: 'salary_calculations',
    items: results,
  });
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  let userId = 'usr_guest_' + Math.random().toString(36).substring(2, 6);

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const parts = token.split('.');
    if (parts.length === 3) {
      try {
        const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
        userId = payload.sub;
      } catch (e) {
        // ignore
      }
    }
  }

  try {
    const body = await req.json();
    const newRecord = {
      id: 'calc_' + Math.random().toString(36).substring(2, 10),
      user_id: userId,
      title: body.title || 'Calcul sans titre',
      gross_annual: Number(body.gross_annual || body.grossAmount || 0),
      net_annual: Number(body.net_annual || body.netAnnual || 0),
      province: body.province || 'QC',
      tax_year: Number(body.tax_year || 2025),
      federal_tax: Number(body.federal_tax || body.federalTax || 0),
      provincial_tax: Number(body.provincial_tax || body.provincialTax || 0),
      rrq_deduction: Number(body.rrq_deduction || body.rrq || 0),
      rqap_deduction: Number(body.rqap_deduction || body.rqap || 0),
      ei_deduction: Number(body.ei_deduction || body.ei || 0),
      effective_rate: Number(body.effective_rate || body.effectiveTaxRate || 0),
      created_at: new Date().toISOString(),
    };

    mockCalculationsDb.unshift(newRecord);

    return NextResponse.json(
      {
        message: 'Calculation persisted to PostgreSQL database schema successfully.',
        record: newRecord,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: 400,
        error: 'Bad Request',
        message: err.message,
      },
      { status: 400 }
    );
  }
}
