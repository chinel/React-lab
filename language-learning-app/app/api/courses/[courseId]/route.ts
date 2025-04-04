import { withAuth } from "@/lib/protect-route";
import { NextResponse } from "next/server";

export const GET = withAuth(async () => {
  try {
    return NextResponse.json({ isAdmin: true });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});
