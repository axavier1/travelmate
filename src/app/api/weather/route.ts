import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location");

  if (!location) {
    return NextResponse.json({ error: "Missing location" }, { status: 400 });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
    location
  )}&units=imperial&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== "200") {
      return NextResponse.json({ error: data.message }, { status: Number(data.cod) });
    }

    // Group forecast into days, and pick the midday forecast (around 12:00pm)
    const daily: Record<string, { temp: number; description: string }> = {};

    data.list.forEach((entry: any) => {
      const date = entry.dt_txt.split(" ")[0];
      const hour = entry.dt_txt.split(" ")[1];
      if (hour === "12:00:00" && !daily[date]) {
        daily[date] = {
          temp: entry.main.temp,
          icon: entry.weather[0].icon,
          description: entry.weather[0].description,
        };
      }
    });

    return NextResponse.json({ forecast: daily });
  } catch (err) {
    return NextResponse.json({ error: "Weather fetch failed" }, { status: 500 });
  }
}
