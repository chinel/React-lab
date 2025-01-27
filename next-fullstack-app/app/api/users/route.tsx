import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const users = await prisma.userOld.findMany();
  return NextResponse.json({ data: users });
}

export async function POST(request: NextRequest) {
  //To get the request body
  const body = await request.json();
  //console.log(body);

  const validation = schema.safeParse(body);
  //validate the body of the data
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  //if invalid, we return a 400 error
  //Else, return the data
  const user = await prisma.userOld.findUnique({
    where: {
      email: body.email,
    },
  });

  //check if the user already exists
  if (user) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const newUser = await prisma.userOld.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });
  return NextResponse.json({ data: newUser }, { status: 201 }); // it is common to use 201 for data created
}
