// src/app/api/trips/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Itinerary from "@/models/Itinerary";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { tripName, location, weatherSummary } = body;

    const newItinerary = await Itinerary.create({
      tripName,
      location,
      weatherSummary,
    });

    return NextResponse.json({ id: newItinerary._id });
  } catch (error) {
    console.error("Error creating itinerary:", error);
    return NextResponse.json({ error: "Failed to create itinerary" }, { status: 500 });
  }
}
