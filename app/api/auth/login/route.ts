// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          timestamp: new Date().toISOString(),
          status: 400,
          error: 'Bad Request',
          message: 'Email and password are required',
          path: '/api/auth/login',
        },
        { status: 400 }
      );
    }

    const isAdmin = email.toLowerCase().includes('admin');
    const isAnalyst = email.toLowerCase().includes('analyst');
    const role = isAdmin ? 'ROLE_ADMIN' : isAnalyst ? 'ROLE_FINANCIAL_ANALYST' : 'ROLE_USER';
    const roles = isAdmin
      ? ['ROLE_ADMIN', 'ROLE_FINANCIAL_ANALYST', 'ROLE_USER']
      : isAnalyst
      ? ['ROLE_FINANCIAL_ANALYST', 'ROLE_USER']
      : ['ROLE_USER'];

    const userId = 'usr_' + Buffer.from(email).toString('hex').substring(0, 10);
    const now = Math.floor(Date.now() / 1000);
    const exp = now + 86400;

    const payload = {
      sub: userId,
      email,
      roles,
      iss: 'https://api.salairepro.ca/auth',
      iat: now,
      exp,
      jti: 'jwt_' + Math.random().toString(36).substring(2, 12),
    };

    const headerB64 = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = 'sig_' + Buffer.from(email + now).toString('hex').substring(0, 32);
    const token = `${headerB64}.${payloadB64}.${signature}`;

    return NextResponse.json({
      accessToken: token,
      tokenType: 'Bearer',
      expiresIn: 86400,
      refreshToken: 'rt_' + Math.random().toString(36).substring(2, 18),
      user: {
        id: userId,
        email,
        name: email.split('@')[0],
        role,
        roles,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: 500,
        error: 'Internal Server Error',
        message: error.message || 'Authentication error',
        path: '/api/auth/login',
      },
      { status: 500 }
    );
  }
}
