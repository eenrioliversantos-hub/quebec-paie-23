// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: 401,
        error: 'Unauthorized',
        message: 'Full authentication is required to access this resource: missing Bearer token',
        path: '/api/auth/me',
      },
      { status: 401 }
    );
  }

  const token = authHeader.substring(7);
  const parts = token.split('.');

  if (parts.length !== 3) {
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: 401,
        error: 'Unauthorized',
        message: 'Malformed JWT token structure',
        path: '/api/auth/me',
      },
      { status: 401 }
    );
  }

  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) {
      return NextResponse.json(
        {
          timestamp: new Date().toISOString(),
          status: 401,
          error: 'Unauthorized',
          message: 'JWT token has expired',
          path: '/api/auth/me',
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      id: payload.sub,
      email: payload.email,
      roles: payload.roles || ['ROLE_USER'],
      name: payload.email ? payload.email.split('@')[0] : 'User',
      tokenIssuedAt: new Date(payload.iat * 1000).toISOString(),
      tokenExpiresAt: new Date(payload.exp * 1000).toISOString(),
      authenticated: true,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: 401,
        error: 'Unauthorized',
        message: 'Failed to decode JWT claims: ' + err.message,
        path: '/api/auth/me',
      },
      { status: 401 }
    );
  }
}
