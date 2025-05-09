"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type EventMap = Record<string, { title: string }>;

const hours = Array.from({ length: 16 }, (_, i) => `${i + 6}:00`); // 6 AM – 10 PM

export default function BuilderPage() {
  const params = useParams();
  const tripId = params.id as string;

  const [trip, setTrip] = useState<any>(null);
  const [events, setEvents] = useState<EventMap>({});
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchTrip = async () => {
      const res = await fetch(`/api/trips/${tripId}`);
      const data = await res.json();
      setTrip(data);
      setEvents(data.days?.["Day 1"] || {});
    };
    fetchTrip();
  }, [tripId]);

  const handleBlockClick = (hour: string) => {
    setSelectedHour(hour);
    setInput(events[hour]?.title || "");
  };

  const handleSave = async () => {
    if (!selectedHour) return;

    const updated = { ...events, [selectedHour]: { title: input } };
    setEvents(updated);
    setSelectedHour(null);
    setInput("");

    await fetch(`/api/trips/${tripId}/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        day: "Day 1",
        events: updated,
      }),
    });
  };

  if (!trip) return <div className="p-6">Loading trip...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-1">Trip to {trip.location}</h1>
      <p className="text-gray-600 mb-6">Weather: {trip.weatherSummary}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hours.map((hour) => (
          <div
            key={hour}
            className="border p-4 rounded-lg bg-white shadow hover:bg-blue-50 cursor-pointer"
            onClick={() => handleBlockClick(hour)}
          >
            <div className="font-semibold text-gray-700">{hour}</div>
            <div className="text-gray-600 mt-2">
              {events[hour]?.title || "No event"}
            </div>
          </div>
        ))}
      </div>

      {selectedHour && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">Event at {selectedHour}</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter event name"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedHour(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
