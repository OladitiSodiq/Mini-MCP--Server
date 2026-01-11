import axios from "axios";
import type { Tool, Context } from "fastmcp";

interface ExchangeRateResponse {
  conversion_result?: number;
}

export const currencyTool: Tool<any, any> = {
  name: "convert_currency",
  description: "Convert money from one currency to another using live exchange rates",
  parameters: {
    type: "object",
    properties: {
      from: {
        type: "string",
        description: "Source currency code (e.g. USD, EUR, NGN)",
      },
      to: {
        type: "string",
        description: "Target currency code (e.g. EUR, GBP, NGN)",
      },
      amount: {
        type: "number",
        description: "Amount to convert",
      },
    },
    required: ["from", "to", "amount"],
  },

  async execute(args: unknown, _context: Context<any>): Promise<any> {
    const { from, to, amount } = args as {
      from: string;
      to: string;
      amount: number;
    };

    if (!from || !to || !Number.isFinite(amount)) {
      return { success: false, error: "from, to, and amount must be valid values" };
    }

    const apiKey = process.env.EXCHANGE_RATE_API_KEY;
    if (!apiKey) {
      return { success: false, error: "EXCHANGE_RATE_API_KEY is not set in .env" };
    }

    try {
      const response = await axios.get<ExchangeRateResponse>(
        `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`
      );

      const result = response.data.conversion_result;

      if (result === undefined) {
        return { success: false, error: "Exchange rate data not available" };
      }

      return {
        success: true,
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        amount,
        convertedAmount: result,
        message: `Converted ${amount} ${from.toUpperCase()} → ${result} ${to.toUpperCase()}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Failed to convert currency",
      };
    }
  },
};
