import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const deleted = await prisma.transaction.delete({
    where: { id: params.id },
  });
  return NextResponse.json(deleted);
}
