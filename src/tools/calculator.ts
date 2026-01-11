import type { Tool, Context } from "fastmcp";

export const calculatorTool: Tool<any, any> = {
  name: "calculator",
  description: "Perform basic arithmetic operations",
  parameters: {
    type: "object",
    properties: {
      a: { type: "number" },
      b: { type: "number" },
      operation: {
        type: "string",
        enum: ["add", "subtract", "multiply", "divide"],
      },
    },
    required: ["a", "b", "operation"],
  },

  async execute(args: unknown, _context: Context<any>): Promise<any> {
    const { a, b, operation } = args as {
      a: number;
      b: number;
      operation: "add" | "subtract" | "multiply" | "divide";
    };

    if (typeof a !== "number" || typeof b !== "number") {
      return { success: false, error: "a and b must be numbers" };
    }

    let result: number;

    switch (operation) {
      case "add":
        result = a + b;
        break;

      case "subtract":
        result = a - b;
        break;

      case "multiply":
        result = a * b;
        break;

      case "divide":
        if (b === 0) return { success: false, error: "Division by zero" };
        result = a / b;
        break;

      default:
        return { success: false, error: "Invalid operation" };
    }

    return {
      success: true,
      a,
      b,
      operation,
      result,
      message: `Result of ${operation} between ${a} and ${b} is ${result}`,
    };
  },
};
