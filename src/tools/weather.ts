import axios from "axios";
import type { Tool, Context } from "fastmcp";
import 'dotenv/config';

interface WeatherResponse {
  main?: { temp: number };
  weather?: { description: string }[];
}

export const weatherTool: Tool<any, any> = {
  name: "get_weather",
  description: "Get current weather by city or location",
  parameters: {
    type: "object",
    properties: { location: { type: "string" } },
    required: ["location"],
  },

  async execute(args: unknown, context: Context<any>): Promise<any> {
    const { location } = args as { location: string };
    if (!location) return { success: false, error: "Location is required" };

    try {
      const apiKey = process.env.OPENWEATHER_API_KEY;
      if (!apiKey) return { success: false, error: "OPENWEATHER_API_KEY not set" };

      const res = await axios.get<WeatherResponse>(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${apiKey}`
      );

      const temp = res.data.main?.temp;
      const desc = res.data.weather?.[0]?.description;

      if (temp === undefined || !desc) return { success: false, error: "Weather data not found" };

      return { success: true, message: `Weather in ${location}: ${desc}, ${temp}°C` };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.message || err.message || "Unknown error" };
    }
  },
};
