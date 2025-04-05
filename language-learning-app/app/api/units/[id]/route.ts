import db from "@/db/drizzle";
import { units } from "@/db/schema";
import { withAuth } from "@/lib/protect-route";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = withAuth(async (request, params) => {
  try {
    const data = await db.query.units.findFirst({
      where: (units, { eq }) => {
        if (!params?.id) {
          throw new Error("Course ID is required");
        }
        return eq(units.id, parseInt(params.id));
      },
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

export const PUT = withAuth(async (request, params) => {
  try {
    if (!params?.id) {
      throw new Error("Course ID is required");
    }

    const body = await request?.json();
    const data = await db
      .update(units)
      .set({
        ...body,
        updated_at: new Date(),
      })
      .where(eq(units.id, parseInt(params.id)))
      .returning();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching units:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    if (!params?.id) {
      throw new Error("Course ID is required");
    }

    const data = await db
      .delete(units)
      .where(eq(units.id, parseInt(params.id)))
      .returning();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching units:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
