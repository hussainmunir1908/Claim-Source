import { NextResponse } from "next/server";
import { createSessionToken, getAdminPassword, validateSessionToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") ?? "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [k, ...v] = c.trim().split("=");
      return [k, v.join("=")];
    })
  );
  const token = cookies["admin_session"];
  const authenticated = !!(token && validateSessionToken(token));
  return NextResponse.json({ authenticated });
}

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const correctPassword = getAdminPassword();

    if (!password || password !== correctPassword) {
      return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
    }

    const token = createSessionToken();
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 72 * 60 * 60, // 72 hours
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_session", "", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}
