import { NextResponse } from "next/server";

export async function GET() {
  const diag: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_URL: process.env.DATABASE_URL ? `${process.env.DATABASE_URL.substring(0, 30)}...` : "NOT SET",
      DIRECT_URL: process.env.DIRECT_URL ? `${process.env.DIRECT_URL.substring(0, 30)}...` : "NOT SET",
      NODE_ENV: process.env.NODE_ENV,
    },
  };

  try {
    const { prisma } = await import("@ojpp/db");
    const count = await prisma.party.count();
    diag.db = { connected: true, partyCount: count };
  } catch (error) {
    diag.db = {
      connected: false,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack?.split("\n").slice(0, 5) : undefined,
    };
  }

  return NextResponse.json(diag);
}
