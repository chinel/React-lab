import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";
interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, props: Props) {
  const { id } = await props.params;
  // console.log(id);
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!product) {
    return NextResponse.json(
      {
        error: "Product not found",
      },
      {
        status: 404,
      }
    );
  }
  return NextResponse.json({ data: product });
}

export async function PUT(request: NextRequest, props: Props) {
  const { id } = await props.params;

  const body = await request.json();

  // console.log(id);

  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!product) {
    return NextResponse.json(
      {
        error: "Product not found",
      },
      {
        status: 404,
      }
    );
  }

  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, {
      status: 400,
    });
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: body.name,
      price: body.price,
      description: body.description,
    },
  });

  return NextResponse.json({ data: updatedProduct });
}

export async function DELETE(request: NextRequest, props: Props) {
  const { id } = await props.params;
  console.log(id);
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!product) {
    return NextResponse.json(
      {
        error: "Product not found",
      },
      {
        status: 404,
      }
    );
  }
  const deletedProduct = await prisma.product.delete({
    where: {
      id: parseInt(id),
    },
  });
  return NextResponse.json({
    data: deletedProduct,
  });
}
