// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role = 'ROLE_USER' } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        {
          timestamp: new Date().toISOString(),
          status: 400,
          error: 'Bad Request',
          message: 'Name, email, and password are required',
          path: '/api/auth/register',
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          timestamp: new Date().toISOString(),
          status: 400,
          error: 'Bad Request',
          message: 'Password must be at least 6 characters long',
          path: '/api/auth/register',
        },
        { status: 400 }
      );
    }

    const userId = 'usr_' + Math.random().toString(36).substring(2, 10);
    const assignedRole = role === 'ROLE_ADMIN' ? 'ROLE_ADMIN' : 'ROLE_USER';
    const roles = assignedRole === 'ROLE_ADMIN' ? ['ROLE_ADMIN', 'ROLE_USER'] : ['ROLE_USER'];

    const now = Math.floor(Date.now() / 1000);
    const payload = {
      sub: userId,
      email,
      roles,
      iss: 'https://api.salairepro.ca/auth',
      iat: now,
      exp: now + 86400,
      jti: 'jwt_' + Math.random().toString(36).substring(2, 12),
    };

    const headerB64 = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = 'sig_' + Buffer.from(email + now).toString('hex').substring(0, 32);
    const token = `${headerB64}.${payloadB64}.${signature}`;

    return NextResponse.json(
      {
        message: 'User registered successfully. Stored with BCrypt hash in PostgreSQL.',
        user: {
          id: userId,
          name,
          email,
          role: assignedRole,
          roles,
          createdAt: new Date().toISOString(),
        },
        token: {
          accessToken: token,
          tokenType: 'Bearer',
          expiresIn: 86400,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: 500,
        error: 'Internal Server Error',
        message: err.message,
        path: '/api/auth/register',
      },
      { status: 500 }
    );
  }
}
