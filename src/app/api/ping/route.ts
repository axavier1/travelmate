import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Itinerary from "@/models/Itinerary";

export async function GET() {
  try {
    await connectDB();
    const count = await Itinerary.countDocuments();
    return NextResponse.json({ message: "MongoDB connected", itineraries: count });
  } catch (error) {
    console.error("Ping error:", error);
    return NextResponse.json({ error: "MongoDB connection failed" }, { status: 500 });
  }
}
