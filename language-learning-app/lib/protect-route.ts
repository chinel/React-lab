// Route handler wrapper

import { NextRequest, NextResponse } from "next/server";
import { getIsAdmin } from "./admin";

type RouteParams = {
  id?: string;
  query?: Record<string, string>;
};

type RouteHandler = (
  request?: NextRequest,
  params?: RouteParams
) => Promise<NextResponse>;

export const withAuth =
  (handler: RouteHandler) =>
  async (request?: NextRequest): Promise<NextResponse> => {
    const isAdmin = await getIsAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    return handler(request);
  };
