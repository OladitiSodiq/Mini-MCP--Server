import type { Tool, Context } from "fastmcp";

export const unitTool: Tool<any, any> = {
  name: "convert_units",
  description: "Convert between common measurement units",
  parameters: {
    type: "object",
    properties: {
      value: { type: "number" },
      from: {
        type: "string",
        description: "Source unit (e.g. km, m, kg, g, celsius, fahrenheit)",
      },
      to: {
        type: "string",
        description: "Target unit (e.g. m, km, g, kg, fahrenheit, celsius)",
      },
    },
    required: ["value", "from", "to"],
  },

  async execute(args: unknown, _context: Context<any>): Promise<any> {
    const { value, from, to } = args as {
      value: number;
      from: string;
      to: string;
    };

    if (typeof value !== "number" || !from || !to) {
      return { success: false, error: "value, from, and to are required" };
    }

    let result: number | null = null;

    // Distance
    if (from === "km" && to === "m") result = value * 1000;
    if (from === "m" && to === "km") result = value / 1000;

    // Weight
    if (from === "kg" && to === "g") result = value * 1000;
    if (from === "g" && to === "kg") result = value / 1000;

    // Temperature
    if (from === "celsius" && to === "fahrenheit") result = value * 1.8 + 32;
    if (from === "fahrenheit" && to === "celsius") result = (value - 32) / 1.8;

    if (result === null) {
      return { success: false, error: `Unsupported unit conversion: ${from} → ${to}` };
    }

    return {
      success: true,
      message: `Converted ${value} ${from} to ${result} ${to}`,
      result,
    };
  },
};
