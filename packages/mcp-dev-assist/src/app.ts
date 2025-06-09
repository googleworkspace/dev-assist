/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

import express, { type Request, type Response } from "express";
import { createServer } from "./lib/mcp.js";

const app = express();
const server = createServer();

app.use(express.json());

app.post("/mcp", async (req: Request, res: Response) => {
	try {
		const transport: StreamableHTTPServerTransport =
			new StreamableHTTPServerTransport({
				sessionIdGenerator: undefined,
			});

		await server.connect(transport);
		await transport.handleRequest(req, res, req.body);

		res.on("close", () => {
			transport.close();
			server.close();
		});

		res.on("error", (error) => {
			console.error(error);
		});
	} catch (error) {
		console.error(error);
		if (!res.headersSent) {
			res.status(500).json({
				jsonrpc: "2.0",
				error: {
					code: -32603,
					message: "Internal server error",
				},
				id: null,
			});
		}
	}
});

const METHOD_NOT_ALLOWED = {
	jsonrpc: "2.0",
	error: {
		code: -32000,
		message: "Method not allowed.",
	},
	id: null,
};

app.get("/mcp", async (req: Request, res: Response) => {
	res.writeHead(405).end(JSON.stringify(METHOD_NOT_ALLOWED));
});

app.delete("/mcp", async (req: Request, res: Response) => {
	res.writeHead(405).end(JSON.stringify(METHOD_NOT_ALLOWED));
});

// Store transports for legacy SSE endpoint
const transports = {
	sse: {} as Record<string, SSEServerTransport>,
};

// Legacy SSE endpoint for older clients
app.get("/sse", async (req, res) => {
	// Create SSE transport for legacy clients
	const transport = new SSEServerTransport("/messages", res);
	transports.sse[transport.sessionId] = transport;

	res.on("close", () => {
		delete transports.sse[transport.sessionId];
	});

	await server.connect(transport);
});

// Legacy message endpoint for older clients
app.post("/messages", async (req, res) => {
	const sessionId = req.query.sessionId as string;
	const transport = transports.sse[sessionId];
	if (transport) {
		await transport.handlePostMessage(req, res, req.body);
	} else {
		res.status(400).send("No transport found for sessionId");
	}
});

export { app };
