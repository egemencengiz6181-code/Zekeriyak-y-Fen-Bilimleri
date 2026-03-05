import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const ADMIN_EMAIL = "egemen.cengiz@reneedesignlab.com";
const ADMIN_PASSWORD = "Renee1999**";
const JWT_SECRET = new TextEncoder().encode("renee-admin-jwt-secret-2024-x9k");
const COOKIE_NAME = "admin-token";

export async function signAdminToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyAdminToken(
  token: string
): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export function validateAdminCredentials(
  email: string,
  password: string
): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}

export { COOKIE_NAME, JWT_SECRET };
