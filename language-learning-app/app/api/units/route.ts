import db from "@/db/drizzle";
import { units } from "@/db/schema";
import { withAuth } from "@/lib/protect-route";
import { NextRequest, NextResponse } from "next/server";

export const GET = withAuth(async () => {
  try {
    const data = await db.query.units.findMany({
      orderBy: (units, { desc }) => [desc(units.created_at)],
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching units:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});

export const POST = withAuth(async (request?: NextRequest) => {
  try {
    const body = await request?.json();
    const data = await db.insert(units).values(body).returning();

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});
