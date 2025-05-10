"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Event = {
  title: string;
  color?: string;
};

type EventMap = Record<string, Event>;
const hours = Array.from({ length: 16 }, (_, i) => `${i + 6}:00`);

export default function BuilderPage() {
  const params = useParams();
  const tripId = params.id as string;

  const [trip, setTrip] = useState<any>(null);
  const [selectedDay, setSelectedDay] = useState("Day 1");
  const [events, setEvents] = useState<EventMap>({});
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [color, setColor] = useState("blue");

  type Color = "blue" | "green" | "purple" | "red" | "gray";

  const colorClassMap: Record<Color, string> = {
    blue: "border-blue-500",
    green: "border-green-500",
    purple: "border-purple-500",
    red: "border-red-500",
    gray: "border-gray-500",
  };

  useEffect(() => {
    const fetchTrip = async () => {
      const res = await fetch(`/api/trips/${tripId}`);
      const data = await res.json();
      setTrip(data);
      setEvents(data.days?.[selectedDay] || {});
    };
    fetchTrip();
  }, [tripId, selectedDay]);

  const handleBlockClick = (hour: string) => {
    setColor(events[hour]?.color || "blue");
    setSelectedHour(hour);
    setInput(events[hour]?.title || "");
  };

  const handleSave = async () => {
    if (!selectedHour) return;
    const updated = {
      ...events,
      [selectedHour]: { title: input, color },
    };
    setEvents(updated);
    setSelectedHour(null);
    setInput("");

    await fetch(`/api/trips/${tripId}/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        day: selectedDay,
        events: updated,
      }),
    });
  };

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
  };

  if (!trip) return <div className="p-6">Loading trip...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-1">Trip to {trip.location}</h1>
      <p className="text-gray-600 mb-4">Weather: {trip.weatherSummary}</p>

      {/* Day Switcher */}
      <div className="mb-6 flex items-center gap-4">
        <select
          value={selectedDay}
          onChange={(e) => handleDayChange(e.target.value)}
          className="p-2 rounded border"
        >
          {["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"].map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <span className="text-gray-500">Select day of itinerary</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hours.map((hour) => {
          const event = events[hour];
          const color = (event?.color as Color) || "gray";
          const colorClass = colorClassMap[color];

          return (
            <div
              key={hour}
              className={`border-l-4 p-4 rounded-lg bg-white shadow hover:bg-blue-50 cursor-pointer ${colorClass}`}
              onClick={() => handleBlockClick(hour)}
            >
              <div className="font-semibold text-gray-700">{hour}</div>
              <div className="text-gray-600 mt-2">{event?.title || "No event"}</div>
            </div>
          );
        })}
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

            <label className="block mb-1 text-sm font-medium">Category Color</label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="blue">Travel</option>
              <option value="green">Food</option>
              <option value="purple">Activity</option>
              <option value="red">Emergency</option>
              <option value="gray">Other</option>
            </select>

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
