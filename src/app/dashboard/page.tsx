"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [forecast, setForecast] = useState<Record<string, { temp: number; icon: string }> | null>(null);

  const fetchWeather = async (loc: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/weather?location=${encodeURIComponent(loc)}`);
      const data = await res.json();
  
      if (data.error) throw new Error(data.error);
  
      setForecast(data.forecast);
  
      setWeather(`${(Object.values(data.forecast)[0] as { temp: number })?.temp}°F`);
    } catch (err) {
      setForecast(null);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripName: location,
          location,
          weatherSummary: weather,
        }),
      });
  
      const data = await res.json();
      if (data.id) {
        router.push(`/builder/${data.id}`);
      } else {
        alert("Failed to create itinerary.");
      }
    } catch (err) {
      console.error("Itinerary creation failed:", err);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Trips</h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow"
        >
          + Add Itinerary
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">New Itinerary</h2>
            <input
              type="text"
              placeholder="Enter location (e.g., Paris)"
              className="w-full border p-2 rounded mb-4"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              onClick={() => fetchWeather(location)}
              className="bg-travelmategreen text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={loading || !location}
            >
              {loading ? "Loading..." : "Get Weather"}
            </button>

            {forecast && (
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <strong>5-Day Forecast:</strong>
                {Object.entries(forecast).map(([date, info]) => (
                  <div key={date} className="flex items-center gap-2">
                    <span>{date}:</span>
                    <img
                      src={`https://openweathermap.org/img/wn/${info.icon}@2x.png`}
                      alt="weather icon"
                      className="w-8 h-8"
                    />
                    <span>{info.temp}°F</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end mt-6 gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setLocation("");
                  setWeather(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                disabled={!weather}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
