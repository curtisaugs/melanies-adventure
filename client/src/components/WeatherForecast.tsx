/**
 * WeatherForecast — Lake Arrowhead weekend forecast widget
 * Uses Open-Meteo free API (no key required)
 * Lat: 34.2439, Lon: -117.1897 (Lake Arrowhead, CA)
 */

import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Thermometer, CloudLightning, CloudDrizzle, Eye } from "lucide-react";

// WMO Weather Interpretation Codes → human-readable label + icon key
function wmoToCondition(code: number): { label: string; icon: string } {
  if (code === 0) return { label: "Clear Sky", icon: "sun" };
  if (code === 1) return { label: "Mainly Clear", icon: "sun" };
  if (code === 2) return { label: "Partly Cloudy", icon: "partly" };
  if (code === 3) return { label: "Overcast", icon: "cloud" };
  if (code >= 45 && code <= 48) return { label: "Foggy", icon: "cloud" };
  if (code >= 51 && code <= 55) return { label: "Drizzle", icon: "drizzle" };
  if (code >= 56 && code <= 57) return { label: "Freezing Drizzle", icon: "drizzle" };
  if (code >= 61 && code <= 65) return { label: "Rain", icon: "rain" };
  if (code >= 66 && code <= 67) return { label: "Freezing Rain", icon: "rain" };
  if (code >= 71 && code <= 77) return { label: "Snow", icon: "snow" };
  if (code >= 80 && code <= 82) return { label: "Rain Showers", icon: "rain" };
  if (code >= 85 && code <= 86) return { label: "Snow Showers", icon: "snow" };
  if (code >= 95 && code <= 99) return { label: "Thunderstorm", icon: "thunder" };
  return { label: "Mixed", icon: "cloud" };
}

function WeatherIcon({ icon, size = 24, className = "", color }: { icon: string; size?: number; className?: string; color?: string }) {
  const props = { size, className, style: color ? { color } : undefined };
  switch (icon) {
    case "sun": return <Sun {...props} />;
    case "partly": return <Cloud {...props} />;
    case "cloud": return <Cloud {...props} />;
    case "rain": return <CloudRain {...props} />;
    case "drizzle": return <CloudDrizzle {...props} />;
    case "snow": return <CloudSnow {...props} />;
    case "thunder": return <CloudLightning {...props} />;
    default: return <Cloud {...props} />;
  }
}

function iconColor(icon: string): string {
  switch (icon) {
    case "sun": return "oklch(0.82 0.15 85)";      // warm gold
    case "partly": return "oklch(0.75 0.06 220)";   // light blue-grey
    case "cloud": return "oklch(0.70 0.04 240)";    // muted blue-grey
    case "rain": return "oklch(0.65 0.12 230)";     // blue
    case "drizzle": return "oklch(0.68 0.10 230)";  // lighter blue
    case "snow": return "oklch(0.85 0.05 220)";     // icy white-blue
    case "thunder": return "oklch(0.72 0.14 75)";   // amber
    default: return "oklch(0.70 0.04 240)";
  }
}

interface DayForecast {
  date: string;
  dayLabel: string;
  shortDate: string;
  tempMax: number;
  tempMin: number;
  precipProb: number;
  windMax: number;
  condition: { label: string; icon: string };
  isWeekend: boolean;
}

// Lake Arrowhead coordinates
const LAT = 34.2439;
const LON = -117.1897;

// The trip dates we care about
const TRIP_DATES = ["2026-03-27", "2026-03-28", "2026-03-29", "2026-03-30"];
const DAY_LABELS: Record<string, string> = {
  "2026-03-27": "Friday",
  "2026-03-28": "Saturday",
  "2026-03-29": "Sunday",
  "2026-03-30": "Monday",
};
const SHORT_DATES: Record<string, string> = {
  "2026-03-27": "Mar 27",
  "2026-03-28": "Mar 28",
  "2026-03-29": "Mar 29",
  "2026-03-30": "Mar 30",
};

export default function WeatherForecast() {
  const [forecasts, setForecasts] = useState<DayForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          latitude: String(LAT),
          longitude: String(LON),
          daily: [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "precipitation_probability_max",
            "wind_speed_10m_max",
          ].join(","),
          temperature_unit: "fahrenheit",
          wind_speed_unit: "mph",
          timezone: "America/Los_Angeles",
          forecast_days: "16",
        });

        const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
        if (!res.ok) throw new Error("Weather API error");
        const data = await res.json();

        const { daily } = data;
        const result: DayForecast[] = [];

        for (let i = 0; i < daily.time.length; i++) {
          const dateStr = daily.time[i];
          if (!TRIP_DATES.includes(dateStr)) continue;

          const condition = wmoToCondition(daily.weather_code[i]);
          result.push({
            date: dateStr,
            dayLabel: DAY_LABELS[dateStr] ?? dateStr,
            shortDate: SHORT_DATES[dateStr] ?? dateStr,
            tempMax: Math.round(daily.temperature_2m_max[i]),
            tempMin: Math.round(daily.temperature_2m_min[i]),
            precipProb: daily.precipitation_probability_max[i] ?? 0,
            windMax: Math.round(daily.wind_speed_10m_max[i]),
            condition,
            isWeekend: dateStr === "2026-03-28" || dateStr === "2026-03-29",
          });
        }

        setForecasts(result);
        setLastUpdated(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
      } catch (err) {
        setError("Forecast unavailable — check back closer to the trip");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <section className="py-8">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "oklch(0.65 0.12 230)" }} />
              <span className="font-accent text-xs tracking-[0.2em] uppercase" style={{ color: "oklch(0.65 0.12 230)" }}>
                Lake Arrowhead Weather
              </span>
              <span
                className="font-accent text-[0.6rem] tracking-widest uppercase px-2 py-0.5 rounded-full"
                style={{ background: "rgba(94,180,234,0.12)", border: "1px solid rgba(94,180,234,0.25)", color: "oklch(0.65 0.12 230)" }}
              >
                Mar 27–30
              </span>
            </div>
            {lastUpdated && (
              <span className="font-body text-[0.65rem] text-ivory/30">
                Updated {lastUpdated}
              </span>
            )}
          </div>

          {/* Forecast Card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {loading && (
              <div className="flex items-center justify-center gap-3 py-10">
                <div className="w-4 h-4 rounded-full border-2 border-blue-400/30 border-t-blue-400 animate-spin" />
                <span className="font-body text-sm text-ivory/40">Fetching forecast from Lake Arrowhead...</span>
              </div>
            )}

            {error && (
              <div className="flex items-center justify-center gap-3 py-10">
                <Eye size={16} className="text-ivory/30" />
                <span className="font-body text-sm text-ivory/40">{error}</span>
              </div>
            )}

            {!loading && !error && forecasts.length > 0 && (
              <>
                {/* Day cards grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-white/8">
                  {forecasts.map((day, i) => (
                    <div
                      key={day.date}
                      className="p-4 sm:p-5 relative"
                      style={
                        day.isWeekend
                          ? { background: "rgba(255,255,255,0.025)" }
                          : {}
                      }
                    >
                      {/* Weekend badge */}
                      {day.isWeekend && (
                        <div
                          className="absolute top-2 right-2 font-accent text-[0.5rem] tracking-widest uppercase px-1.5 py-0.5 rounded-full"
                          style={{ background: "rgba(201,168,76,0.15)", color: "oklch(0.82 0.15 85)" }}
                        >
                          Weekend
                        </div>
                      )}
                      {/* Check-in / Check-out badge */}
                      {day.date === "2026-03-27" && (
                        <div
                          className="absolute top-2 right-2 font-accent text-[0.5rem] tracking-widest uppercase px-1.5 py-0.5 rounded-full"
                          style={{ background: "rgba(52,211,153,0.12)", color: "oklch(0.72 0.14 145)" }}
                        >
                          Check-in
                        </div>
                      )}
                      {day.date === "2026-03-30" && (
                        <div
                          className="absolute top-2 right-2 font-accent text-[0.5rem] tracking-widest uppercase px-1.5 py-0.5 rounded-full"
                          style={{ background: "rgba(232,116,138,0.12)", color: "rgb(232,116,138)" }}
                        >
                          Check-out
                        </div>
                      )}

                      {/* Day label */}
                      <p className="font-accent text-[0.65rem] tracking-[0.15em] uppercase text-ivory/50 mb-0.5">
                        {day.dayLabel}
                      </p>
                      <p className="font-body text-[0.7rem] text-ivory/30 mb-3">{day.shortDate}</p>

                      {/* Weather icon */}
                      <div className="mb-3">
                        <WeatherIcon
                          icon={day.condition.icon}
                          size={32}
                          className="transition-transform duration-300 hover:scale-110"
                          color={iconColor(day.condition.icon)}
                        />
                      </div>

                      {/* Condition label */}
                      <p className="font-body text-xs text-ivory/70 mb-3 leading-tight">{day.condition.label}</p>

                      {/* Temp range */}
                      <div className="flex items-baseline gap-1.5 mb-3">
                        <span className="font-display text-xl font-light text-ivory">{day.tempMax}°</span>
                        <span className="font-body text-sm text-ivory/40">{day.tempMin}°</span>
                      </div>

                      {/* Stats row */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <Droplets size={10} style={{ color: "oklch(0.65 0.12 230)" }} />
                          <span className="font-body text-[0.65rem] text-ivory/45">{day.precipProb}% rain</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Wind size={10} className="text-ivory/30" />
                          <span className="font-body text-[0.65rem] text-ivory/45">{day.windMax} mph</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer note */}
                <div
                  className="px-5 py-3 flex items-center justify-between flex-wrap gap-2"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="font-body text-[0.65rem] text-ivory/30">
                    Forecast via Open-Meteo · Lake Arrowhead, CA (2,600 ft elevation) · Updates daily
                  </p>
                  <p className="font-body text-[0.65rem] text-ivory/25">
                    Late March: expect 45–65°F, possible showers. Pack layers.
                  </p>
                </div>
              </>
            )}

            {/* No data yet (too far out) */}
            {!loading && !error && forecasts.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-3 py-10 text-center px-6">
                <Cloud size={28} className="text-ivory/20" />
                <p className="font-body text-sm text-ivory/40">
                  Detailed forecast for March 27–30 will appear as the trip gets closer.
                </p>
                <p className="font-body text-xs text-ivory/25">
                  Open-Meteo provides up to 16-day forecasts — check back soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
