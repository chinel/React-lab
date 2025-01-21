import { NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json({
    data: products,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  //console.log(body);
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const findProduct = await prisma.product.findUnique({
    where: {
      name: body.name,
    },
  });

  if (findProduct) {
    return NextResponse.json(
      {
        error: "Product already exists",
      },
      {
        status: 400,
      }
    );
  }

  const newProduct = await prisma.product.create({
    data: {
      name: body.name,
      price: parseFloat(body.price),
      description: body.description,
    },
  });

  return NextResponse.json({
    message: "Product created",
    data: newProduct,
  });
}
