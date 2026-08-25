import { createHash, randomBytes, scrypt as nodeScrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(nodeScrypt);
const KEY_LENGTH = 64;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
  return `scrypt:${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    const [algorithm, salt, hashHex] = storedHash.trim().split(":");
    if (algorithm !== "scrypt" || !salt || !hashHex || hashHex.length % 2 !== 0 || !/^[0-9a-f]+$/i.test(hashHex)) return false;
    const expected = Buffer.from(hashHex, "hex");
    if (expected.length === 0) return false;
    const actual = (await scrypt(password, salt, expected.length)) as Buffer;
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

export function createSessionToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashSessionToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function normalizeMacAddress(value: string): string {
  return value.trim().toUpperCase().replace(/[^0-9A-F]/g, "");
}

export function isValidMacAddress(value: string): boolean {
  return /^[0-9A-F]{12}$/.test(value);
}
