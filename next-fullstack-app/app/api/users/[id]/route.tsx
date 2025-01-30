import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  //console.log(id);

  //Fetch Data from the DB
  const user = await prisma.userOld.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  //If not found, return 404, this could probably be a validation
  if (!user) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }
  //Else return the data

  return NextResponse.json({ data: user });
}

export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const body = await request.json();
  // console.log(id);
  //If the request body is not valid, return 400
  const validation = schema.safeParse(body);

  if (!validation.success || !id) {
    return NextResponse.json(validation.error?.errors, { status: 400 });
  }

  //Fetch the user with the given id
  const user = await prisma.userOld.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  //If not found, return 404
  if (!user) {
    return NextResponse.json("Not Found", { status: 404 });
  }
  //Else update the user in the database and return updated user

  const updatedUser = await prisma.userOld.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json({ data: updatedUser });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  console.log(id);

  //Fetch the user with the given id
  const user = await prisma.userOld.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  //If not found, return 404
  if (!user) {
    return NextResponse.json("Not Found", { status: 404 });
  }
  //Else delete the user from the database and return deleted user
  const deletedUser = await prisma.userOld.delete({
    where: {
      id: parseInt(id),
    },
  });
  //We can return the deleted user or a message it depends on the application requirement
  return NextResponse.json({ data: deletedUser });
}
