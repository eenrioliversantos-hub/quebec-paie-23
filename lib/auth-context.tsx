// lib/auth-context.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { telemetryLogger } from './telemetry-logger';

export type UserRole = 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_FINANCIAL_ANALYST' | 'ROLE_HR';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roles: UserRole[];
  company?: string;
  avatar?: string;
  createdAt: string;
}

export interface DecodedJwt {
  sub: string;
  email: string;
  roles: string[];
  iss: string;
  iat: number;
  exp: number;
  jti: string;
}

export interface SavedCalculationRecord {
  id: string;
  userId: string;
  title: string;
  grossAmount: number;
  entryMode: string;
  frequency: string;
  province: string;
  taxYear: number;
  netAnnual: number;
  netPeriod: number;
  federalTax: number;
  provincialTax: number;
  rrq: number;
  rqap: number;
  ei: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  createdAt: string;
  notes?: string;
  tags?: string[];
}

interface AuthContextType {
  user: UserProfile | null;
  jwtToken: string | null;
  refreshToken: string | null;
  decodedJwt: DecodedJwt | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  savedCalculations: SavedCalculationRecord[];
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshAccessToken: () => Promise<boolean>;
  saveCalculation: (calc: Omit<SavedCalculationRecord, 'id' | 'userId' | 'createdAt'>) => Promise<SavedCalculationRecord>;
  deleteCalculation: (id: string) => Promise<void>;
  fastLoginAs: (role: 'admin' | 'analyst' | 'user') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Pre-seeded demo enterprise accounts
export const DEMO_USERS: Record<string, { email: string; pass: string; name: string; role: UserRole; roles: UserRole[]; company: string }> = {
  admin: {
    email: 'admin@salairepro.ca',
    pass: 'AdminPass2025!',
    name: 'Jean-François Tremblay',
    role: 'ROLE_ADMIN',
    roles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_FINANCIAL_ANALYST'],
    company: 'Ministère des Finances du Québec (Audit RH)',
  },
  analyst: {
    email: 'analyste@salairepro.ca',
    pass: 'AnalystPass2025!',
    name: 'Analyste Fiscal',
    role: 'ROLE_FINANCIAL_ANALYST',
    roles: ['ROLE_FINANCIAL_ANALYST', 'ROLE_USER'],
    company: 'Groupe Fiscalité Montréal',
  },
  user: {
    email: 'user@salairepro.ca',
    pass: 'UserPass2025!',
    name: 'Alexandre Gagnon',
    role: 'ROLE_USER',
    roles: ['ROLE_USER'],
    company: 'Tech Talent Québec',
  },
};

function base64UrlEncode(obj: any): string {
  const json = typeof obj === 'string' ? obj : JSON.stringify(obj);
  if (typeof window !== 'undefined') {
    return btoa(unescape(encodeURIComponent(json)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
  return Buffer.from(json).toString('base64url');
}

function base64UrlDecode(str: string): any {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const json = decodeURIComponent(escape(atob(base64)));
  return JSON.parse(json);
}

function createMockJwt(user: UserProfile, expiresInSeconds: number = 86400): { token: string; decoded: DecodedJwt } {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload: DecodedJwt = {
    sub: user.id,
    email: user.email,
    roles: user.roles,
    iss: 'https://api.salairepro.ca/auth',
    iat: now,
    exp: now + expiresInSeconds,
    jti: 'jwt_' + Math.random().toString(36).substring(2, 12),
  };

  const headerB64 = base64UrlEncode(header);
  const payloadB64 = base64UrlEncode(payload);
  const mockSig = 'c4ca4238a0b923820dcc509a6f75849b' + Math.random().toString(36).substring(2, 10);
  const token = `${headerB64}.${payloadB64}.${mockSig}`;

  return { token, decoded: payload };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [decodedJwt, setDecodedJwt] = useState<DecodedJwt | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculationRecord[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const storedToken = localStorage.getItem('salairepro_jwt_token');
        const storedUser = localStorage.getItem('salairepro_user');
        const storedCalcs = localStorage.getItem('salairepro_saved_calcs');

        if (storedCalcs) {
          setSavedCalculations(JSON.parse(storedCalcs));
        }

        if (storedToken && storedUser) {
          try {
            const parsedUser: UserProfile = JSON.parse(storedUser);
            // Purge legacy mock user Sophie or demo accounts
            if (
              parsedUser.id === 'usr_cpa_77218' ||
              parsedUser.name?.toLowerCase().includes('sophie') ||
              parsedUser.email === 'analyst@salairepro.ca'
            ) {
              localStorage.removeItem('salairepro_jwt_token');
              localStorage.removeItem('salairepro_user');
              setUser(null);
              setJwtToken(null);
              setDecodedJwt(null);
            } else {
              const parts = storedToken.split('.');
              if (parts.length === 3) {
                const decoded = base64UrlDecode(parts[1]);
                const now = Math.floor(Date.now() / 1000);
                if (decoded.exp > now) {
                  setUser(parsedUser);
                  setJwtToken(storedToken);
                  setDecodedJwt(decoded);
                } else {
                  localStorage.removeItem('salairepro_jwt_token');
                  localStorage.removeItem('salairepro_user');
                }
              }
            }
          } catch {
            localStorage.removeItem('salairepro_jwt_token');
            localStorage.removeItem('salairepro_user');
          }
        }
      } catch (err) {
        console.error('Error initializing auth', err);
      } finally {
        setIsLoading(false);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const traceId = telemetryLogger.generateTraceId();
    telemetryLogger.info('AuthController', `POST /api/auth/login initiated for email: ${email}`, {
      traceId,
      mdc: { endpoint: '/api/auth/login', httpMethod: 'POST', clientIp: '127.0.0.1' },
    });

    await new Promise((r) => setTimeout(r, 450));

    const matchDemo = Object.values(DEMO_USERS).find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (matchDemo && pass === matchDemo.pass) {
      const profile: UserProfile = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        name: matchDemo.name,
        email: matchDemo.email,
        role: matchDemo.role,
        roles: matchDemo.roles,
        company: matchDemo.company,
        createdAt: new Date().toISOString(),
      };

      const { token, decoded } = createMockJwt(profile);
      const rToken = 'rt_' + Math.random().toString(36).substring(2, 18);

      setUser(profile);
      setJwtToken(token);
      setRefreshToken(rToken);
      setDecodedJwt(decoded);

      localStorage.setItem('salairepro_jwt_token', token);
      localStorage.setItem('salairepro_user', JSON.stringify(profile));

      telemetryLogger.info('JwtTokenProvider', `JWT token successfully issued for subject ${profile.id}. Roles: [${profile.roles.join(', ')}]`, {
        traceId,
        durationMs: 450,
        mdc: { userId: profile.id, userEmail: profile.email, statusCode: 200 },
      });

      return { success: true };
    }

    if (pass.length >= 6 && email.includes('@')) {
      const profile: UserProfile = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        name: email.split('@')[0],
        email: email,
        role: 'ROLE_USER',
        roles: ['ROLE_USER'],
        createdAt: new Date().toISOString(),
      };

      const { token, decoded } = createMockJwt(profile);
      const rToken = 'rt_' + Math.random().toString(36).substring(2, 18);

      setUser(profile);
      setJwtToken(token);
      setRefreshToken(rToken);
      setDecodedJwt(decoded);

      localStorage.setItem('salairepro_jwt_token', token);
      localStorage.setItem('salairepro_user', JSON.stringify(profile));

      return { success: true };
    }

    telemetryLogger.warn('JwtAuthenticationEntryPoint', `BadCredentialsException: Invalid password attempt for email: ${email}`, {
      traceId,
      mdc: { endpoint: '/api/auth/login', statusCode: 401 },
    });

    return { success: false, error: 'Identifiants invalides. Veuillez vérifier votre adresse courriel et votre mot de passe.' };
  };

  const register = async (name: string, email: string, pass: string, role: UserRole = 'ROLE_USER'): Promise<{ success: boolean; error?: string }> => {
    const traceId = telemetryLogger.generateTraceId();
    await new Promise((r) => setTimeout(r, 400));

    if (!email || !email.includes('@')) {
      return { success: false, error: 'Adresse courriel invalide.' };
    }

    if (!pass || pass.length < 6) {
      return { success: false, error: 'Le mot de passe doit contenir au moins 6 caractères.' };
    }

    const profile: UserProfile = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name,
      email,
      role,
      roles: [role, 'ROLE_USER'],
      createdAt: new Date().toISOString(),
    };

    const { token, decoded } = createMockJwt(profile);
    const rToken = 'rt_' + Math.random().toString(36).substring(2, 18);

    setUser(profile);
    setJwtToken(token);
    setRefreshToken(rToken);
    setDecodedJwt(decoded);

    localStorage.setItem('salairepro_jwt_token', token);
    localStorage.setItem('salairepro_user', JSON.stringify(profile));

    telemetryLogger.info('UserRepository', `INSERT INTO users (id, name, email, role) VALUES ('${profile.id}', '${name}', '${email}', '${role}') SUCCESS`, {
      traceId,
      mdc: { userId: profile.id, role },
    });

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setJwtToken(null);
    setRefreshToken(null);
    setDecodedJwt(null);
    localStorage.removeItem('salairepro_jwt_token');
    localStorage.removeItem('salairepro_user');
  };

  const refreshAccessToken = async (): Promise<boolean> => {
    if (!user) return false;
    const { token, decoded } = createMockJwt(user);
    setJwtToken(token);
    setDecodedJwt(decoded);
    localStorage.setItem('salairepro_jwt_token', token);
    return true;
  };

  const fastLoginAs = async (roleType: 'admin' | 'analyst' | 'user') => {
    const target = DEMO_USERS[roleType];
    await login(target.email, target.pass);
  };

  const saveCalculation = async (calcData: Omit<SavedCalculationRecord, 'id' | 'userId' | 'createdAt'>): Promise<SavedCalculationRecord> => {
    const traceId = telemetryLogger.generateTraceId();
    const newRecord: SavedCalculationRecord = {
      ...calcData,
      id: 'calc_' + Math.random().toString(36).substring(2, 9),
      userId: user ? user.id : 'usr_anonymous',
      createdAt: new Date().toISOString(),
    };

    const updated = [newRecord, ...savedCalculations];
    setSavedCalculations(updated);
    localStorage.setItem('salairepro_saved_calcs', JSON.stringify(updated));

    telemetryLogger.info('SalaryCalculationService', `Saved salary calculation [${newRecord.id}] "${newRecord.title}" - Net: ${newRecord.netAnnual}$/an`, {
      traceId,
      mdc: {
        userId: newRecord.userId,
        calcId: newRecord.id,
        gross: newRecord.grossAmount,
        net: newRecord.netAnnual,
      },
    });

    return newRecord;
  };

  const deleteCalculation = async (id: string) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);
    localStorage.setItem('salairepro_saved_calcs', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        jwtToken,
        refreshToken,
        decodedJwt,
        isAuthenticated: !!user,
        isLoading,
        savedCalculations,
        login,
        register,
        logout,
        refreshAccessToken,
        saveCalculation,
        deleteCalculation,
        fastLoginAs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
