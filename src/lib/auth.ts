import { createHmac } from "crypto";

const SECRET = process.env.ADMIN_SECRET ?? "claimsource_admin_secret_key_2024";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "ClaimSource2024!";

export function getAdminPassword(): string {
  return ADMIN_PASSWORD;
}

export function createSessionToken(): string {
  const payload = `${Date.now()}`;
  const sig = createHmac("sha256", SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

export function validateSessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [timestamp, sig] = decoded.split(":");
    if (!timestamp || !sig) return false;

    // Check signature
    const expectedSig = createHmac("sha256", SECRET).update(timestamp).digest("hex");
    if (sig !== expectedSig) return false;

    // Token valid for 72 hours
    const age = Date.now() - parseInt(timestamp, 10);
    return age < 72 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export function checkAuthFromRequest(req: Request): boolean {
  const cookieHeader = req.headers.get("cookie") ?? "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [k, ...v] = c.trim().split("=");
      return [k, v.join("=")];
    })
  );
  const token = cookies["admin_session"];
  if (!token) return false;
  return validateSessionToken(token);
}
