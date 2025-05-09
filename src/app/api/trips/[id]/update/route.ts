import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Itinerary from "@/models/Itinerary";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  const body = await req.json();
  const { day, events } = body;

  const trip = await Itinerary.findById(params.id);
  if (!trip) return NextResponse.json({ error: "Not found" }, { status: 404 });

  trip.days.set(day, events);
  await trip.save();

  return NextResponse.json({ success: true });
}
