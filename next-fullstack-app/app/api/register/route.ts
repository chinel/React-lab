import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

const validationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const valid = validationSchema.safeParse(body);

  if (!valid.success) {
    return NextResponse.json(valid.error.errors, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (user) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: {
      username: body.username,
      email: body.email,
      hashedPassword,
    },
  });

  return NextResponse.json(
    { email: newUser.email, username: newUser.username },
    { status: 201 }
  );
}
