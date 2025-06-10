import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: "desc" },
  });
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { amount, description, date, category } = body;
  const transaction = await prisma.transaction.create({
    data: { amount, description, date: new Date(date), category },
  });
  return NextResponse.json(transaction);
}
