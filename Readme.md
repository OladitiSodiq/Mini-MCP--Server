# Mini MCP Server

A lightweight **Model Context Protocol (MCP) server** built with **TypeScript** and the **MCP SDK**, providing common utility tools such as weather lookup, calculator, currency conversion, time zone handling, and unit conversion.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Available Tools](#available-tools)
- [MCP Protocol](#mcp-protocol)
- [Development](#development)
- [Troubleshooting](#troubleshooting)



## Features

- **Weather Lookup**: Get current weather information for any city
- **Calculator**: Perform mathematical calculations
- **Currency Converter**: Convert between different currencies
- **Timezone Converter**: Convert times between different timezones
- **Unit Converter**: Convert between different units of measurement
- **MCP Protocol Compliant**: Fully compatible with the Model Context Protocol specification
- **Inspector Compatible**: Works with the MCP Inspector for testing and debugging


##  Prerequisites

- **Node.js** v18 or higher
- **npm** v8 or higher
- **OpenWeather API Key** (for weather functionality)
` **EXCHANGE_RATE_API_KEY**


##  Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd mini-mcp-server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory:
   ```env
   OPENWEATHER_API_KEY=your_api_key_here
   EXCHANGE_RATE_API_KEY=your_api_key_here
   ```

4. **Build the project**:
   ```bash
   npm run build
   ```

---

##  Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
 OPENWEATHER_API_KEY=your_api_key_here
   EXCHANGE_RATE_API_KEY=your_api_key_here
```

### Getting an OpenWeather API Key

1. Visit [OpenWeather](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key from your account dashboard
4. Add it to your `.env` file

### Steps to Get Your EXCHANGE_RATE_API_KEY

Go to the Exchange Rate API website
Visit the official site (https://v6.exchangerate-api.com/).

Create an account
Click Sign Up and register using your email address.

Verify your email
Check your inbox and confirm your email to activate your account.

Log in to your dashboard
After verification, log in to access your API dashboard.

Copy your API key
Your API key will be displayed in the dashboard. Copy it.

Add the API key to your environment file
In your .env file, add:

---

##  Usage

### Running the Server

**For development with MCP Inspector**:
```bash
npm run dev
```

This will:
1. Build the TypeScript code
2. Start the MCP Inspector
3. Launch your server with the inspector interface

**For production**:
```bash
npm run build
node dist/index.js
```

### Using with MCP Inspector

1. Run `npm run dev`
2. The inspector will start at `http://localhost:6274`
3. Open the URL with the authentication token provided in the console
4. You can now test all tools interactively

### Integrating with Claude Desktop

Add to your Claude Desktop configuration file:

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mini-mcp-server": {
      "command": "node",
      "args": ["path/to/mini-mcp-server/dist/index.js"]
    }
  }
}
```

---

## 🛠️ Available Tools

### 1. Weather Tool (`get_weather`)

Get current weather information for any city.

**Request**:
```json
{
  "name": "get_weather",
  "arguments": {
    "location": "London"
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Weather in London: clear sky, 15°C"
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "City not found"
}
```

---

### 2. Calculator Tool (`calculate`)

Perform mathematical calculations.

**Request**:
```json
{
  "name": "calculate",
  "arguments": {
    "expression": "2 + 2 * 3"
  }
}
```

**Response**:
```json
{
  "success": true,
  "result": 8
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "Invalid expression"
}
```

---

### 3. Currency Converter Tool (`convert_currency`)

Convert amounts between different currencies.

**Request**:
```json
{
  "name": "convert_currency",
  "arguments": {
    "amount": 100,
    "from": "USD",
    "to": "EUR"
  }
}
```

**Response**:
```json
{
  "success": true,
  "amount": 100,
  "from": "USD",
  "to": "EUR",
  "result": 92.50,
  "rate": 0.925
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "Invalid currency code"
}
```

---

### 4. Timezone Converter Tool (`convert_timezone`)

Convert times between different timezones.

**Request**:
```json
{
  "name": "convert_timezone",
  "arguments": {
    "time": "14:30",
    "from_timezone": "America/New_York",
    "to_timezone": "Europe/London"
  }
}
```

**Response**:
```json
{
  "success": true,
  "original_time": "14:30",
  "from_timezone": "America/New_York",
  "converted_time": "19:30",
  "to_timezone": "Europe/London"
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "Invalid timezone"
}
```

---

### 5. Unit Converter Tool (`convert_unit`)

Convert between different units of measurement.

**Request**:
```json
{
  "name": "convert_unit",
  "arguments": {
    "value": 100,
    "from_unit": "meters",
    "to_unit": "feet"
  }
}
```

**Response**:
```json
{
  "success": true,
  "value": 100,
  "from_unit": "meters",
  "result": 328.08,
  "to_unit": "feet"
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "Incompatible units"
}
```

---

## 🔌 MCP Protocol

### Server Information

The server implements the Model Context Protocol and provides the following metadata:

```json
{
  "name": "Simple MCP Server",
  "version": "1.0.0",
  "vendor": {
    "name": "Mini MCP",
    "url": "https://example.com"
  }
}
```

### Protocol Flow

1. **Initialize**: Client sends initialization request
   ```json
   {
     "jsonrpc": "2.0",
     "id": 1,
     "method": "initialize",
     "params": {
       "protocolVersion": "2024-11-05",
       "capabilities": {},
       "clientInfo": {
         "name": "MCP Client",
         "version": "1.0.0"
       }
     }
   }
   ```

2. **List Tools**: Client requests available tools
   ```json
   {
     "jsonrpc": "2.0",
     "id": 2,
     "method": "tools/list"
   }
   ```

   **Response**:
   ```json
   {
     "jsonrpc": "2.0",
     "id": 2,
     "result": {
       "tools": [
         {
           "name": "get_weather",
           "description": "Get current weather by city or location",
           "inputSchema": {
             "type": "object",
             "properties": {
               "location": { "type": "string" }
             },
             "required": ["location"]
           }
         }
       ]
     }
   }
   ```

3. **Call Tool**: Client invokes a tool
   ```json
   {
     "jsonrpc": "2.0",
     "id": 3,
     "method": "tools/call",
     "params": {
       "name": "get_weather",
       "arguments": {
         "location": "London"
       }
     }
   }
   ```

   **Response**:
   ```json
   {
     "jsonrpc": "2.0",
     "id": 3,
     "result": {
       "content": [
         {
           "type": "text",
           "text": "{\"success\":true,\"message\":\"Weather in London: clear sky, 15°C\"}"
         }
       ]
     }
   }
   ```

### Transport

The server uses **stdio** (Standard Input/Output) transport for communication, which is the standard for MCP servers.

---

## 💻 Development

### Project Structure

```
mini-mcp-server/
├── src/
│   ├── index.ts              # Main server entry point
│   └── tools/
│       ├── weather.ts        # Weather tool implementation
│       ├── calculator.ts     # Calculator tool implementation
│       ├── currency.ts       # Currency converter implementation
│       ├── timezone.ts       # Timezone converter implementation
│       └── unit.ts           # Unit converter implementation
├── dist/                     # Compiled JavaScript (generated)
├── .env                      # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

### Adding a New Tool

1. Create a new file in `src/tools/`:
   ```typescript
   import type { Tool, Context } from "fastmcp";

   export const myTool: Tool<any, any> = {
     name: "my_tool",
     description: "Description of what the tool does",
     parameters: {
       type: "object",
       properties: {
         param1: { type: "string" }
       },
       required: ["param1"]
     },

     async execute(args: unknown, context: Context<any>): Promise<any> {
       const { param1 } = args as { param1: string };
       
       try {
         // Your tool logic here
         return { success: true, result: "output" };
       } catch (err: any) {
         return { success: false, error: err.message };
       }
     }
   };
   ```

2. Import and register in `src/index.ts`:
   ```typescript
   import { myTool } from "./tools/myTool.js";
   
   const tools = [..., myTool];
   ```

3. Rebuild:
   ```bash
   npm run build
   ```

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Build and run with MCP Inspector

---

## 🐛 Troubleshooting

### Common Issues

**1. "OPENWEATHER_API_KEY not set" error**
- Make sure you have created a `.env` file in the root directory
- Verify your API key is correct
- Restart the server after adding the environment variable

**2. "Cannot read properties of undefined (reading 'vendor')" error**
- Update the MCP SDK: `npm install @modelcontextprotocol/sdk@latest`
- Rebuild the project: `npm run build`
- This error occurs when using an older version of the MCP SDK

**3. Tools not showing in Claude Desktop**
- Check your `claude_desktop_config.json` path is correct
- Ensure the path to `dist/index.js` is absolute
- Restart Claude Desktop after configuration changes
- Check Claude Desktop logs for errors

**4. Build errors**
- Delete `node_modules` and `dist` folders
- Run `npm install` again
- Run `npm run build`

### Debug Mode

To see detailed logs, run the server directly:
```bash
node dist/index.js 2> debug.log
```

This will output error messages to `debug.log` for debugging.

---


---

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request let me learn from you.

---

##  Support

If you encounter any issues or have questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review the MCP Protocol documentation
3. Open an issue on GitHub
4. You can reach out to me on Linkedln https://www.linkedin.com/in/oladitisodiq/ , whatsapp: +2348102458866 , Gmail:Oladitisodiq@gmail.com
---

##  Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP SDK GitHub](https://github.com/modelcontextprotocol/sdk)
- [OpenWeather API Documentation](https://openweathermap.org/api)
- [Claude Desktop](https://claude.ai/)