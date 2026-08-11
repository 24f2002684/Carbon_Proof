import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'carbonproof_hackathon_super_secret_jwt_key_2026'
);

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: 'BUYER' | 'AUDITOR' | 'REGISTRY';
}

export async function createSessionToken(session: UserSession): Promise<string> {
  return await new SignJWT({ ...session })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as UserSession;
  } catch (error) {
    return null;
  }
}

export async function getSessionUser(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('carbonproof_session')?.value;
  if (!token) return null;
  return await verifySessionToken(token);
}
