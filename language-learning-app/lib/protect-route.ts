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
  async (
    request?: NextRequest,
    context?: { params: { id: string } }
  ): Promise<NextResponse> => {
    const isAdmin = await getIsAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    // Await the params before using them
    const resolvedParams = await context?.params;

    // Extract and transform the params
    const routeParams: RouteParams = {
      id: resolvedParams?.id,
      query: Object.fromEntries(request?.nextUrl.searchParams ?? []),
    };

    return handler(request, routeParams);
  };
