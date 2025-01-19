import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/new-page", request.url)); // the second parameter is the base url
}

//This configuration object tells next js what routes for example to run the middleware on
export const config = {
  // *  zero or more characters e.g /users/:id* will work for /users or /users/id
  // + one or more characters
  // ? zero or one
  matcher: ["/profile", "/users/:id*"], // here you can pass a string or an array of strings which represents paths e.g "/about"
};
