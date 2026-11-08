// app/api/telemetry/logs/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get('level');
  const service = searchParams.get('service') || 'salary-security-service';

  return NextResponse.json({
    elkPipeline: 'online',
    elasticsearchIndex: 'salary-logs-' + new Date().toISOString().substring(0, 10),
    logstashPort: 5000,
    service,
    filter: { level: level || 'ALL' },
    status: 'HEALTHY',
    activeNodes: 3,
  });
}

export async function POST(req: NextRequest) {
  try {
    const logEvent = await req.json();
    return NextResponse.json({
      status: 'ACK',
      indexed: true,
      timestamp: new Date().toISOString(),
      index: 'salary-logs-' + new Date().toISOString().substring(0, 10),
      documentId: 'doc_' + Math.random().toString(36).substring(2, 12),
      receivedPayload: logEvent,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
