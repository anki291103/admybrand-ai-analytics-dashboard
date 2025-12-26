import { NextResponse } from "next/server";
import { salesData } from "@/lib/data/dashboardData";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: salesData,
  });
}
