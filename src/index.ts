import "dotenv/config";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { weatherTool } from "./tools/weather.js";
import { timezoneTool } from "./tools/timezone.js";
import { unitTool } from "./tools/unit.js";
import { currencyTool } from "./tools/currency.js";
import { calculatorTool } from "./tools/calculator.js";

const tools = [weatherTool, calculatorTool, currencyTool, unitTool, timezoneTool];

// Create server - we'll patch vendor info after
const server = new Server(
  {
    name: "Simple MCP Server",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Patch the server info to include vendor
const serverAny = server as any;
if (serverAny.serverInfo) {
  serverAny.serverInfo = {
    ...serverAny.serverInfo,
    vendor: {
      name: "Mini MCP",
      url: "https://example.com"
    }
  };
}

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: tools.map(tool => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.parameters
    }))
  };
});

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;
  const tool = tools.find(t => t.name === toolName);
  
  if (!tool) {
    throw new Error(`Tool not found: ${toolName}`);
  }
  
  try {
    const result = await tool.execute(request.params.arguments || {}, {} as any);
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error: any) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ 
            success: false, 
            error: error.message || "Unknown error" 
          }, null, 2)
        }
      ],
      isError: true
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});