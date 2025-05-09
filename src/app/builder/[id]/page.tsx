import connectDB from "@/lib/mongoose";
import Itinerary from "@/models/Itinerary";
import { notFound } from "next/navigation";

export default async function BuilderPage({ params }: { params: { id: string } }) {
  await connectDB();

  const itinerary = await Itinerary.findById(params.id).lean();

  if (!itinerary) {
    return notFound();
  }

  const hours = Array.from({ length: 16 }, (_, i) => `${i + 6}:00`); // 6 AM – 10 PM

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-1">Trip to {itinerary.location}</h1>
      <p className="text-gray-600 mb-6">Weather: {itinerary.weatherSummary}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hours.map((hour) => (
          <div key={hour} className="border p-4 rounded-lg bg-white shadow">
            <div className="font-semibold text-gray-700">{hour}</div>
            <div className="text-gray-600 mt-2">[Placeholder for event input]</div>
          </div>
        ))}
      </div>
    </div>
  );
}
