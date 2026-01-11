import type { Tool, Context } from "fastmcp";

export const timezoneTool: Tool<any, any> = {
  name: "get_time",
  description: "Get the current local time for a specific timezone",
  parameters: {
    type: "object",
    properties: {
      timezone: {
        type: "string",
        description: "IANA timezone (e.g. Africa/Lagos, Europe/London)",
      },
    },
    required: ["timezone"],
  },

  async execute(args: unknown, _context: Context<any>): Promise<any> {
    const { timezone } = args as { timezone: string };

    if (!timezone) {
      return { success: false, error: "timezone is required" };
    }

    try {
      const currentTime = new Date().toLocaleString("en-US", {
        timeZone: timezone,
        dateStyle: "full",
        timeStyle: "long",
      });

      return {
        success: true,
        timezone,
        currentTime,
        message: `Current time in ${timezone}: ${currentTime}`,
      };
    } catch (err: any) {
      return {
        success: false,
        error: "Invalid or unsupported timezone",
        details: err.message,
      };
    }
  },
};
