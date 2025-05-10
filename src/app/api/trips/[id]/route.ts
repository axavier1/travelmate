import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Itinerary from "@/models/Itinerary";

export async function GET(req: Request, context: { params: { id: string } }) {
  await connectDB();
  const trip = await Itinerary.findById(context.params.id).lean();

  if (!trip) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(trip);
}
