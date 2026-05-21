import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    app: "Kompresio",
    processing: "client-side-first",
    timestamp: new Date().toISOString(),
  });
}
